/* ═══════════════════════════════════════════════════════════
   Akarçay Patisserie — Cloudflare Worker
   Statik siteyi (ASSETS) sunar + admin API'sini çalıştırır.

   API uçları:
     POST /api/giris            { sifre }           → oturum çerezi
     POST /api/cikis                                → çerezi siler
     GET  /api/durum                                → giriş yapılmış mı
     GET  /api/menu | /api/icerik                   → JSON veri (herkese açık)
     PUT  /api/menu | /api/icerik   (JSON gövde)    → günceller (yetki ister)
     POST /api/gorsel           (form-data: dosya)  → R2'ye yükler, URL döndürür
     GET  /gorsel/<anahtar>                         → R2'den görsel sunar
   ═══════════════════════════════════════════════════════════ */

const enc = new TextEncoder();

async function sha256(metin) {
  const veri = await crypto.subtle.digest("SHA-256", enc.encode(metin));
  return [...new Uint8Array(veri)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function json(veri, durum = 200, ekBaslik = {}) {
  return new Response(JSON.stringify(veri), {
    status: durum,
    headers: { "Content-Type": "application/json; charset=utf-8", ...ekBaslik },
  });
}

/** Geçerli oturum çerezi var mı? */
async function girisVar(request, env) {
  if (!env.ADMIN_SIFRE) return false;
  const cerez = request.headers.get("Cookie") || "";
  const eslesme = cerez.match(/akarcay_oturum=([a-f0-9]{64})/);
  if (!eslesme) return false;
  const beklenen = await sha256("akarcay-oturum:" + env.ADMIN_SIFRE);
  return eslesme[1] === beklenen;
}

/** İzin verilen ayar anahtarları */
const AYARLAR = new Set(["menu", "icerik"]);

async function apiIsle(request, env, path) {
  const method = request.method;

  // ── Giriş ──
  if (path === "/api/giris" && method === "POST") {
    const { sifre } = await request.json().catch(() => ({}));
    if (!env.ADMIN_SIFRE) return json({ hata: "Sunucuda şifre tanımlı değil." }, 500);
    if (sifre !== env.ADMIN_SIFRE) return json({ hata: "Şifre hatalı." }, 401);
    const jeton = await sha256("akarcay-oturum:" + env.ADMIN_SIFRE);
    return json(
      { ok: true },
      200,
      {
        "Set-Cookie": `akarcay_oturum=${jeton}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=43200`,
      }
    );
  }

  // ── Çıkış ──
  if (path === "/api/cikis" && method === "POST") {
    return json({ ok: true }, 200, {
      "Set-Cookie": "akarcay_oturum=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0",
    });
  }

  // ── Durum ──
  if (path === "/api/durum" && method === "GET") {
    return json({ girisVar: await girisVar(request, env) });
  }

  // ── Ayar oku (menu / icerik) ──
  const okuEsl = path.match(/^\/api\/(menu|icerik)$/);
  if (okuEsl && method === "GET") {
    const row = await env.DB.prepare("SELECT deger FROM ayarlar WHERE anahtar = ?")
      .bind(okuEsl[1])
      .first();
    return new Response(row ? row.deger : "{}", {
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  // ── Ayar yaz (yetki ister) ──
  if (okuEsl && method === "PUT") {
    if (!(await girisVar(request, env))) return json({ hata: "Yetkisiz." }, 401);
    const govde = await request.text();
    try {
      JSON.parse(govde);
    } catch {
      return json({ hata: "Geçersiz JSON." }, 400);
    }
    await env.DB.prepare(
      "INSERT OR REPLACE INTO ayarlar (anahtar, deger, guncelleme) VALUES (?, ?, datetime('now'))"
    )
      .bind(okuEsl[1], govde)
      .run();
    return json({ ok: true });
  }

  // ── Görsel yükle (yetki ister) ──
  if (path === "/api/gorsel" && method === "POST") {
    if (!(await girisVar(request, env))) return json({ hata: "Yetkisiz." }, 401);
    const form = await request.formData();
    const dosya = form.get("dosya");
    if (!dosya || typeof dosya === "string") return json({ hata: "Dosya yok." }, 400);
    const temiz = (dosya.name || "gorsel")
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .slice(-40);
    const anahtar = `y-${Date.now()}-${temiz}`;
    await env.GORSEL.put(anahtar, dosya.stream(), {
      httpMetadata: { contentType: dosya.type || "image/jpeg" },
    });
    return json({ url: "/gorsel/" + anahtar });
  }

  return json({ hata: "Bulunamadı." }, 404);
}

async function gorselSun(request, env, path) {
  const anahtar = decodeURIComponent(path.slice("/gorsel/".length));
  const obj = await env.GORSEL.get(anahtar);
  if (!obj) return new Response("Görsel yok", { status: 404 });
  return new Response(obj.body, {
    headers: {
      "Content-Type": obj.httpMetadata?.contentType || "image/webp",
      "Cache-Control": "public, max-age=31536000",
      ETag: obj.httpEtag,
    },
  });
}

// Hiçbir koşulda sunulmayacak yollar (hassas/özel dosyalar)
const YASAK = /(\.pdf$|\.txt$|\.log$|\.md$|proton|cloudflare|recovery|hesab|wrangler\.jsonc|package\.json|package-lock|\.assetsignore|\.dev\.vars|\.gitignore|^\/db\/|^\/worker\/|^\/\.wrangler|^\/\.git)/i;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Güvenlik kilidi: özel/hassas dosyalar her zaman engellenir
    if (YASAK.test(path)) {
      return new Response("Bulunamadı", { status: 404 });
    }

    if (path.startsWith("/api/")) return apiIsle(request, env, path);
    if (path.startsWith("/gorsel/")) return gorselSun(request, env, path);

    // Diğer her şey statik site
    return env.ASSETS.fetch(request);
  },
};
