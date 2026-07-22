/* ═══════════════════════════════════════════════════════════
   Akarçay — Site içeriği (tek kaynak)

   Sitedeki tüm metin, ürün ve menü verisi burada durur. Sayfalar bu
   veriden render edilir; ileride admin paneli aynı yapıyı düzenleyip
   (localStorage / API) buraya yazacak — işaretleme değişmeyecek.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const AKAR_CONTENT = {
    marka: {
      ad: "Akarçay",
      alt: "Patisserie",
      slogan: "Pastry · Dessert · Coffee",
    },

    iletisim: {
      adres: "Adres bilgisi çok yakında",
      saatler: "Her gün 08.00 — 23.00",
      telefon: "Telefon çok yakında",
      instagram: "#",
      facebook: "#",
      haritaUrl: "",
    },

    /* Ana sayfa sahneleri — her sahne bir ürün kategorisi, sıra buradaki sıradır.
       Görseli gelmemiş kategoriler marka mührü taşıyan tabakla gösterilir. */
    sahneler: [
      {
        id: "anasayfa",
        tone: "light",
        kicker: "Yaş Pastalar",
        baslik: ["Tatlı Bir", "Başlangıç"],
        metin:
          "Her kat elde hazırlanır: taze krema, gerçek tereyağı ve mevsim meyveleri. " +
          "Doğum günü, kutlama ya da sadece canınız çektiği için.",
        cta: { yazi: "Ürünlerimize Bakın", href: "pastalar.html" },
        vitrin: "pasta-4503",
        uydular: ["pasta-4504", "pasta-4231", "pasta-4501", "pasta-4232"],
      },
      {
        id: "kahvaltilik",
        tone: "cream",
        kicker: "Kahvaltılıklar",
        baslik: ["Güne", "Sıcacık"],
        metin:
          "Fırından yeni çıkmış poğaça ve kruvasanlar, serpme kahvaltı tabakları ve " +
          "günün ilk çayı — sabahlar burada başlar.",
        gorselBekliyor: true,
      },
      {
        id: "tatlilar",
        tone: "dark",
        kicker: "Tatlılar",
        baslik: ["Kaşık", "Kaşık"],
        metin:
          "Sütlü tatlılardan şerbetlilere, profiterolden cheesecake'e — günün her " +
          "saatine bir tatlı bahane.",
        seritYazi: "el yapımı · günlük taze · mevsim meyveleri · gerçek tereyağı",
        gorselBekliyor: true,
      },
      {
        id: "icecekler",
        tone: "light",
        kicker: "İçecekler & Kahve",
        baslik: ["Fincanın", "Sıcak Tarafı"],
        metin:
          "Özenle kavrulmuş çekirdekler, ince demlenmiş çaylar, ev yapımı limonata " +
          "ve taze sıkma meyve suları.",
        cta: { yazi: "Menüyü Aç", href: "menu.html" },
        gorselBekliyor: true,
      },
      {
        id: "iletisim",
        tone: "cream",
        kicker: "Bize Uğrayın",
        baslik: ["Çayınız", "Demlendi"],
        metin: "Kapımız her gün açık; en tatlı sohbetler bizde başlar.",
      },
    ],

    /* Ürün galerisi — admin panelinden eklenip çıkarılacak */
    urunler: [
      {
        slug: "pasta-4503",
        ad: "Orman Meyveli",
        grup: "Meyveli",
        not: "Frambuaz, böğürtlen ve çilekle taçlanan hafif krema",
      },
      {
        slug: "pasta-4504",
        ad: "Çilek Rüyası",
        grup: "Meyveli",
        not: "Taze çilek, beyaz çikolata ve fındık kırığı",
      },
      {
        slug: "pasta-4231",
        ad: "Çilekli Krema",
        grup: "Meyveli",
        not: "Krema rozetleri ve çilek dolgusu",
      },
      {
        slug: "pasta-4232",
        ad: "Çikolata Damlası",
        grup: "Çikolatalı",
        not: "Beyaz damla kaplama, çikolata yaprakları ve orman meyveleri",
      },
      {
        slug: "pasta-4233",
        ad: "Akarçay İmza",
        grup: "İmza",
        not: "Frambuaz kurusu, çilek ve amblemli madalyon",
      },
      {
        slug: "pasta-4234",
        ad: "Üç Katlı Çikolata",
        grup: "Çikolatalı",
        not: "Sütlü, bitter ve kakaolu kat kat mus",
      },
      {
        slug: "pasta-4500",
        ad: "Fındıklı Trüf",
        grup: "Çikolatalı",
        not: "Kavrulmuş fındık kırığı ve beyaz çikolata gülü",
      },
      {
        slug: "pasta-4501",
        ad: "Limonlu Fıstık",
        grup: "Klasik",
        not: "Limon kreması, antep fıstığı tuile ve badem",
      },
      {
        slug: "pasta-4502",
        ad: "Karamel Bisküvi",
        grup: "Klasik",
        not: "Karamel glaze, tarçınlı bisküvi ve çilek",
      },
    ],

    /* Menü kitabı — her nesne bir sayfa; panelden eklenip silinebilir */
    menu: {
      kapak: {
        tip: "kapak",
        ustBaslik: "Akarçay Patisserie",
        baslik: "Menü",
        altBaslik: "Pastry · Dessert · Coffee",
      },
      sayfalar: [
        {
          tip: "liste",
          baslik: "Pastalar",
          altBaslik: "Vitrinden dilim ya da bütün",
          kalemler: [
            { ad: "Orman Meyveli", not: "frambuaz · böğürtlen · çilek" },
            { ad: "Çilek Rüyası", not: "taze çilek · beyaz çikolata" },
            { ad: "Akarçay İmza", not: "frambuaz kurusu · madalyon" },
            { ad: "Üç Katlı Çikolata", not: "sütlü · bitter · kakao" },
            { ad: "Fındıklı Trüf", not: "kavrulmuş fındık · trüf krema" },
            { ad: "Limonlu Fıstık", not: "limon kreması · antep fıstığı" },
          ],
        },
        {
          tip: "liste",
          baslik: "Fırından",
          altBaslik: "Her sabah taze",
          kalemler: [
            { ad: "Tereyağlı Kruvasan", not: "sade · çikolatalı · bademli" },
            { ad: "San Sebastian", not: "dilim" },
            { ad: "Profiterol", not: "sıcak çikolata sos" },
            { ad: "Cheesecake", not: "frambuaz · limon · klasik" },
            { ad: "Ekler", not: "vanilya · çikolata · karamel" },
            { ad: "Magnolia", not: "muzlu · çilekli" },
          ],
        },
        {
          tip: "liste",
          baslik: "Kahveler",
          altBaslik: "Özenle kavrulmuş çekirdek",
          kalemler: [
            { ad: "Espresso", not: "tek · duble" },
            { ad: "Filtre Kahve", not: "günün demlemesi" },
            { ad: "Latte", not: "sıcak · soğuk" },
            { ad: "Cappuccino", not: "" },
            { ad: "Türk Kahvesi", not: "sade · orta · şekerli" },
            { ad: "Sıcak Çikolata", not: "beyaz · bitter" },
          ],
        },
        {
          tip: "liste",
          baslik: "İçecekler",
          altBaslik: "Serinleten ve ısıtan",
          kalemler: [
            { ad: "Çay", not: "demlik · bardak" },
            { ad: "Bitki Çayları", not: "ıhlamur · nane-limon · adaçayı" },
            { ad: "Limonata", not: "ev yapımı" },
            { ad: "Taze Sıkma Portakal", not: "" },
            { ad: "Milkshake", not: "çilek · çikolata · muz" },
            { ad: "Ayran & Su", not: "" },
          ],
        },
      ],
      arkaKapak: {
        tip: "kapak",
        ustBaslik: "Afiyet olsun",
        baslik: "Akarçay",
        altBaslik: "Pastry · Dessert · Coffee",
      },
    },
  };

  window.AKAR_CONTENT = AKAR_CONTENT;
})();
