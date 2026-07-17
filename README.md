# Akarçay Patisserie & Bistro — Web Sitesi

Tam ekran, 6 sahnelik dikey "sahne destesi" arayüzü. Build gerektirmez;
saf HTML + CSS + JS. Tüm illüstrasyonlar ve kod bu projeye özel çizildi/yazıldı.

## Çalıştırma

- **En basit:** `index.html` dosyasına çift tıkla.
- **Yerel sunucuyla:** proje klasöründe `python -m http.server 8137`
  → tarayıcıda `http://127.0.0.1:8137`
- **Yayın (VPS):** klasörü olduğu gibi nginx/apache köküne kopyalamak yeterli.

## Kullanım

- Fare tekerleği / dokunmatik kaydırma / ok tuşları / soldaki noktalar → sahneler arası geçiş.
- Fareyi gezdir → katmanlar derinlik katsayısına göre paralaks yapar.
- `Esc` → mobil menüyü kapatır. Klavye: `Home`/`End` ilk/son sahne.

## Dosya Yapısı

```
index.html          6 sahne + SVG illüstrasyonlar + ortak semboller
css/tokens.css      Renk paleti, tipografi, hareket token'ları
css/base.css        Reset, tipografi kalıpları, buton/damga
css/layout.css      Header, noktalar, sayaç, deste mekaniği, perde, overlay
css/scenes.css      Sahne kompozisyonları (konum/ölçü/efekt)
css/responsive.css  Tablet/mobil + prefers-reduced-motion
js/utils.js         Yardımcılar (lerp, clamp, qs...)
js/parallax.js      Fare paralaksı (rAF + lerp yumuşatma)
js/deck.js          SceneDeck durum makinesi (tekerlek/dokunma/klavye/hash)
js/main.js          Açılış: perde, overlay menü, "yakında" damgaları
docs/               (yalnızca yerel — repoya dahil değil) analiz + QA görüntüleri
```

## İçerik Yerleştirme Noktaları (sonraki faz)

- `data-slot="adres" / "saatler" / "telefon"` → gerçek iletişim bilgileri.
- Sahne SVG'leri → gerçek ürün fotoğraflarıyla (dekupe PNG/WebP) değiştirilebilir;
  katman yapısı (`.layer > .anim > .float`) aynen korunur.
- `.socials` içindeki `#` linkleri → gerçek Instagram/Facebook adresleri.
- "Menüyü Keşfet" butonu → QR menü sayfası hazır olunca `data-soon` kaldırılıp
  `href` verilecek.

## Yol Haritası

1. ✅ Arayüz (bu teslim)
2. ⏳ Gerçek içerik: menü listesi, fotoğraflar, videolar, adres/telefon
3. ⏳ Dinamik QR menü + admin paneli (Next.js'e taşıma, VPS'te yayın)
