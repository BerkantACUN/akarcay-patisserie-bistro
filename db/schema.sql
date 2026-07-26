-- Akarçay Patisserie — veritabanı şeması (Cloudflare D1)
-- Menü ve içerik esnek JSON olarak "ayarlar" tablosunda saklanır.

CREATE TABLE IF NOT EXISTS ayarlar (
  anahtar     TEXT PRIMARY KEY,       -- "menu", "icerik" vb.
  deger       TEXT NOT NULL,          -- JSON metni
  guncelleme  TEXT DEFAULT (datetime('now'))
);

-- Panel giriş bilgisi (şifre SHA-256 hash olarak tutulur)
CREATE TABLE IF NOT EXISTS yoneticiler (
  kullanici   TEXT PRIMARY KEY,
  sifre_hash  TEXT NOT NULL
);

-- Oturum jetonları (panel girişleri)
CREATE TABLE IF NOT EXISTS oturumlar (
  jeton       TEXT PRIMARY KEY,
  kullanici   TEXT NOT NULL,
  bitis       INTEGER NOT NULL        -- unix zaman (ms)
);
