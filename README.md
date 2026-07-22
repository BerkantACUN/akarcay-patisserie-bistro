# Akarçay Patisserie — Web Sitesi

Kurumsal kimliğe (terracotta `#923E25` / oyster `#E3D9C6`) oturan, beyaz zeminli,
animasyon ağırlıklı tanıtım sitesi. Build adımı yok — saf HTML + CSS + JS.

**Canlı:** https://berkantacun.github.io/akarcay-patisserie-bistro/

## Sayfalar

| Dosya | İçerik |
|---|---|
| `index.html` | 6 sahnelik tam ekran deste; her sahne bir ürün kategorisi |
| `pastalar.html` | Ürün galerisi — süzgeç + ışık kutusu |
| `menu.html` | Sayfa çevirmeli menü kitabı (ses efektli) |

Ana sayfa sahneleri sırayla: **Tatlı Bir Başlangıç → Pastalar → Kahvaltılıklar →
Tatlılar → İçecekler & Kahve → Bize Uğrayın**

## Öne çıkan özellikler

- **Sinematik açılış:** header'daki gerçek logo düğümü ekran ortasına büyütülür,
  petaller köşelerden dönerek gelir, kare açılır, "akarçay" harfleri sağdan
  sırayla oturur, altın parıltı süpürür, sonra logo kendi köşesine uçar (FLIP).
- **Sayfa geçiş perdesi:** sayfalar arasında iki katmanlı perde + dönen amblem.
- **Fare paralaksı:** her katman `data-derinlik` katsayısıyla imleci izler;
  vitrin ürünü 3B eğilir.
- **Şeker serpintisi:** canvas üzerinde süzülen pudra taneleri.
- **Menü kitabı:** StPageFlip ile gerçekçi sayfa çevirme; çevirme sesi Web Audio
  ile sentezlenir (ses dosyası indirilmez), ses açma/kapama düğmesi kalıcıdır.
- Tamamen duyarlı; `prefers-reduced-motion` desteklenir.

## Çalıştırma

```bash
python -m http.server 8137      # → http://127.0.0.1:8137
```
Ya da `index.html` dosyasına çift tıklayın.

## Dosya yapısı

```
index.html · pastalar.html · menu.html
css/
  tokens.css      Kurumsal palet, tipografi, hareket değişkenleri
  base.css        Sıfırlama, tipografi kalıpları, butonlar
  chrome.css      Sabit logo, gezinme, imleç, mobil menü
  intro.css       Açılış koreografisi + geçiş perdesi
  deck.css        Sahne destesi mekaniği
  scenes.css      Sahne kompozisyonları
  gallery.css     Pastalar sayfası
  menubook.css    Menü kitabı
  responsive.css  Duyarlı ince ayarlar
js/
  utils.js        Yardımcılar
  content.js      ► TÜM İÇERİK BURADA (admin paneli buradan besleyecek)
  logo.js         Kurumsal logonun SVG enjeksiyonu (PDF'ten üretildi)
  intro.js        Açılış + sayfa geçişleri
  chrome.js       İmleç, hale, mobil menü, içerik yerleştirme
  parallax.js     Fare paralaksı ve eğim
  serpinti.js     Şeker tanesi canvas'ı
  deck.js         Sahne destesi durum makinesi
  gallery.js      Galeri render + süzgeç + ışık kutusu
  menubook.js     Menü kitabı
  sfx.js          Web Audio sayfa çevirme sesi
vendor/
  page-flip.browser.js   StPageFlip (MIT), kendi sunucumuzda
assets/
  logo/*.svg      Kurumsal PDF'ten üretilen vektörler
  urun/*.webp     Arka planı kaldırılmış ürün görselleri
```

## İçerik güncelleme

Tüm metin, ürün ve menü verisi `js/content.js` içindedir:

- `urunler[]` → galeri kartları (`slug` = `assets/urun/<slug>.webp`)
- `menu.sayfalar[]` → menü kitabı sayfaları; dizi elemanı ekleyip silmek yeter
- `menu.sayfalar[].kalemler[].fiyat` → fiyat alanı boşken "—" görünür
- `iletisim` → adres, saat, telefon, sosyal medya

Fotoğrafı gelmemiş kategoriler `index.html` içinde `<div class="tabak">` ile
marka mührü gösterir; görsel gelince yerine `<img class="urun-gorsel">` konur.

## Varlık üretimi (tek seferlik)

`.tmp-logo/build_logo.py` kurumsal PDF'ten `assets/logo/*.svg` ve `js/logo.js`
üretir. `.tmp-logo/cutout.py` ürün fotoğraflarının arka planını kaldırıp
`assets/urun/*.webp` yazar (rembg · isnet-general-use).

## Yol haritası

1. ✅ Arayüz, kurumsal kimlik, galeri, menü kitabı
2. ⏳ Gerçek içerik: kahvaltı/tatlı/içecek fotoğrafları, fiyatlar, adres
3. ⏳ Admin paneli: görsel yükleme, menü sayfası ekle/sil/düzenle, fiyat yönetimi
