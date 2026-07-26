/* ═══════════════════════════════════════════════════════════
   Akarçay Patisserie — MENÜ VERİSİ (tek kaynak)

   Tüm menü buradan render edilir. Admin paneli ileride bu yapıyı
   düzenleyip (localStorage / API) buraya yazacak — işaretleme sabit.

   Kategori:
     { slug, ad, grup, tanit?, notlar?,
       paketler?: [{ ad, birim?, aciklama, fiyat, kalori? }],
       urunler:   [{ ad, aciklama?, fiyat, kalori?, adet?, rozet? }],
       altGruplar?: [{ baslik, urunler:[...] }] }

   grup → ızgara sayfasındaki bölüm başlığı.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const MENU = {
    // Menü kapağı ve genel notlar
    meta: {
      baslik: "Menü",
      ustBaslik: "Akarçay Patisserie",
      slogan: "Lezzet · Kahve · Tatlı · Keyif",
      altSlogan: "Günün her anında sizinle.",
      dipNot: "Fiyatlarımıza KDV dahildir. 25/07/2026 tarihinden itibaren geçerli fiyatlardır. Görseller sunum önerisidir.",
    },

    // İçindekiler / karşılama sayfası (admin panelinden düzenlenebilir)
    icindekiler: {
      hosgeldiniz: ["Akarçay'a", "Hoş Geldiniz"],
      paragraflar: [
        "Her gün taze hazırlanan kahvaltılar, özenle sunulan ana yemekler, tatlı dokunuşlar ve kahve keyfi Akarçay Patisserie'de bir araya geliyor.",
        "Günün her saatine uygun menümüz; kahvaltıdan atıştırmalıklara, pizzalardan makarnalara, tavuk ve et yemeklerinden tatlılara kadar uzanan zengin bir lezzet seçkisi sunar.",
        "Şık sunum, sıcak atmosfer ve profesyonel servis anlayışıyla Akarçay'da her buluşmayı keyifli bir deneyime dönüştürüyoruz.",
      ],
      altYazi: ["Lezzet", "Keyif", "Anları"],
    },

    // Izgara sayfasındaki bölüm sırası
    gruplar: [
      "Kahvaltı",
      "Ana Yemekler",
      "Atıştırmalık & Sandviç",
      "Tatlılar",
      "Sıcak İçecekler",
      "Soğuk İçecekler",
    ],

    kategoriler: [
      /* ─────────── KAHVALTI ─────────── */
      {
        slug: "gune-baslarken",
        ad: "Güne Başlarken",
        grup: "Kahvaltı",
        tanit: "Lezzetli bir başlangıç, güzel bir günün ilk adımı.",
        paketler: [
          {
            ad: "Serpme Kahvaltı",
            birim: "2 kişi ve üzeri · kişi başı",
            aciklama:
              "Bal kaymak, reçel çeşitleri, tereyağı, zeytin çeşitleri, acuka, granola, peynir çeşitleri, patates kızartması, pişi, haşhaşlı lokum, gözleme, sosis, salatalık, domates ve sucuklu yumurta. (Termos çay)",
            fiyat: "700 TL",
            kalori: 670,
          },
          {
            ad: "Anadolu Plus Kahvaltı",
            birim: "2 kişi ve üzeri · kişi başı",
            aciklama:
              "Bal kaymak, reçel çeşitleri, tereyağı, zeytin çeşitleri, acuka, tahin pekmez, hurma, kayısı, granola, peynir çeşitleri, patates kızartması, pişi, haşhaşlı lokum, gözleme, sosis, karışık kızartma, salatalık, domates, biber çeşitleri. (Termos çay)",
            fiyat: "900 TL",
            kalori: 720,
          },
          {
            ad: "Klasik Kahvaltı",
            aciklama:
              "Bal, zeytin çeşitleri, reçel, acuka, tereyağı, salam, haşlanmış yumurta, peynir çeşitleri, salatalık ve domates. (İki bardak çay)",
            fiyat: "450 TL",
            kalori: 560,
          },
        ],
        urunler: [
          { ad: "Sucuk Tava", fiyat: "350 TL", kalori: 600 },
          { ad: "Bal Kaymak", fiyat: "250 TL", kalori: 380 },
          { ad: "Mıhlama", fiyat: "350 TL", kalori: 670 },
          { ad: "Çakallı Menemen", fiyat: "300 TL", kalori: 480 },
          { ad: "Köy Usülü Menemen", fiyat: "360 TL", kalori: 520 },
          { ad: "Klasik Menemen", fiyat: "280 TL", kalori: 420 },
          { ad: "Kavurmalı Yumurta", fiyat: "360 TL", kalori: 560 },
          { ad: "Sucuklu Yumurta", fiyat: "370 TL", kalori: 550 },
          { ad: "Pankek Bowl", fiyat: "300 TL", kalori: 520 },
          { ad: "Soğuş Tabağı", fiyat: "190 TL", kalori: 220 },
          { ad: "Peynir Tabağı", fiyat: "220 TL", kalori: 260 },
        ],
      },
      {
        slug: "omlet",
        ad: "Omlet Çeşitleri",
        grup: "Kahvaltı",
        urunler: [
          {
            ad: "Kaşık Omlet",
            aciklama:
              "Sucuk, salam, dilim zeytinler, mantar ve biberler ile iki yumurta çırpılıp dökülür; kaşar peyniri, mevsim yeşillikleri ve patates cipsi ile servis edilir.",
            fiyat: "250 TL",
            kalori: 630,
          },
          {
            ad: "Kaşarlı Omlet",
            aciklama: "Mevsim yeşillikleri ve patates cipsi eşliğinde servis edilir.",
            fiyat: "230 TL",
            kalori: 560,
          },
          {
            ad: "Mantarlı Omlet",
            aciklama:
              "Mantar ve biberler sotelenip iki yumurta çırpılıp dökülür; kaşar peyniri, mevsim yeşillikleri ve patates cipsi eşliğinde servis edilir.",
            fiyat: "250 TL",
            kalori: 590,
          },
          {
            ad: "Sucuklu Omlet",
            aciklama:
              "Sucuklu yumurta çırpılıp kaşar peyniri, mevsim yeşillikleri ve patates cipsi eşliğinde servis edilir.",
            fiyat: "280 TL",
            kalori: 650,
          },
          {
            ad: "Ispanyol Roll Omlet",
            aciklama:
              "Beyaz peynir, rende kaşar ve domates sosu yapıldıktan sonra rulo şeklinde sarılıp mevsim yeşillikleri ve patates cipsi eşliğinde servis edilir.",
            fiyat: "280 TL",
            kalori: 670,
          },
        ],
      },

      /* ─────────── ANA YEMEKLER ─────────── */
      {
        slug: "pizzalar",
        ad: "Pizzalar",
        grup: "Ana Yemekler",
        tanit: "Taze malzemeler, ince hamur, bol lezzet.",
        urunler: [
          {
            ad: "Karışık Pizza",
            aciklama:
              "Mozzarella peyniri, zeytin çeşitleri, renkli biberler, mantar ve mısır ile servis edilir.",
            fiyat: "450 TL",
            kalori: 980,
          },
          {
            ad: "Sucuklu Pizza",
            aciklama:
              "Mozzarella peyniri, sucuk, siyah zeytin ve renkli biberler ile servis edilir.",
            fiyat: "430 TL",
            kalori: 1020,
          },
          {
            ad: "Ton Balıklı Pizza",
            aciklama:
              "Mozzarella peyniri, ton balığı, domates, renkli biberler ve soğan ile servis edilir.",
            fiyat: "460 TL",
            kalori: 950,
          },
          {
            ad: "Akarçay Pizza",
            aciklama:
              "Mozzarella peyniri, sucuk, pastırma ve domates ile servis edilir.",
            fiyat: "500 TL",
            kalori: 1050,
          },
          {
            ad: "Kavurmalı Pizza",
            aciklama:
              "Mozzarella peyniri, kavurma, mantar, yeşil zeytin, siyah zeytin dilimleri, renkli biberler ve mısır ile servis edilir.",
            fiyat: "550 TL",
            kalori: 1080,
          },
          {
            ad: "Margarita Pizza",
            aciklama: "Pesto sos, domates, mantar ve biber ile servis edilir.",
            fiyat: "400 TL",
            kalori: 860,
          },
        ],
      },
      {
        slug: "noodle",
        ad: "Noodle",
        grup: "Ana Yemekler",
        urunler: [
          {
            ad: "Etli Noodle",
            aciklama:
              "Dana eti, havuç, kırmızı biber, brokoli, soya filizi, taze soğan, teriyaki sos, susam eşliğinde servis edilir.",
            fiyat: "520 TL",
            kalori: 780,
          },
          {
            ad: "Sebzeli Noodle",
            aciklama:
              "Mantar, brokoli, havuç, kırmızı biber, kabak, soya filizi, taze soğan, teriyaki sos, susam eşliğinde servis edilir.",
            fiyat: "450 TL",
            kalori: 620,
          },
          {
            ad: "Tavuklu Noodle",
            aciklama:
              "Tavuk göğsü, havuç, kırmızı biber, brokoli, soya filizi, taze soğan, teriyaki sos, susam eşliğinde servis edilir.",
            fiyat: "480 TL",
            kalori: 720,
          },
          {
            ad: "Asya Soslu Tavuk",
            rozet: "Yeni",
            aciklama:
              "Çıtır tavuk parçaları, özel asya sosu eşliğinde servis edilir. Yanında pirinç pilavı ve haşlanmış sebzeler ile sunulur.",
            fiyat: "480 TL",
            kalori: 760,
          },
        ],
      },
      {
        slug: "tavuk-yemekleri",
        ad: "Tavuk Yemekleri",
        grup: "Ana Yemekler",
        urunler: [
          {
            ad: "Köri Soslu Tavuk",
            aciklama:
              "Küp küp doğranmış tavuk parçaları, mantar, biber, köri baharatı, krema, pirinç pilavı ve elma dilim patates ile servis edilir.",
            fiyat: "420 TL",
            kalori: 670,
          },
          {
            ad: "Fesleğen Soslu Tavuk",
            aciklama:
              "Küp küp doğranmış tavuk parçaları, mantar, biber, pesto sos, krema, pirinç pilavı ve elma dilim patates ile servis edilir.",
            fiyat: "480 TL",
            kalori: 690,
          },
          {
            ad: "Mantar Soslu Tavuk",
            aciklama:
              "Tavuk lav taşında pişirilip garnitür, elma dilim patates ve mantar sosu ile servis edilir.",
            fiyat: "500 TL",
            kalori: 680,
          },
          {
            ad: "Tavuk Fajita",
            aciklama:
              "Lav taşında pişirilen tavuk göğsü, fajita sebzesi, rendelenmiş kaşar, jalapeno biber, acılı ezme ve tortilla ekmeğiyle servis edilir.",
            fiyat: "600 TL",
            kalori: 720,
          },
          {
            ad: "Tavuk Çökertme",
            aciklama:
              "Jülyen doğranmış tavuk parçaları pişirilip özel sosu, kibrit patates ve naneli yoğurt eşliğinde servis edilir.",
            fiyat: "530 TL",
            kalori: 750,
          },
          {
            ad: "Tavuk Külbastı",
            aciklama:
              "Pirinç pilavı, garnitür, elma dilim patates, ızgara domates ve biber eşliğinde servis edilir.",
            fiyat: "480 TL",
            kalori: 650,
          },
          {
            ad: "Tavuk Şinitzel",
            aciklama:
              "Panelenmiş tavuk, Akdeniz yeşillikleri, patates cipsi ve dip sos eşliğinde servis edilir.",
            fiyat: "430 TL",
            kalori: 680,
          },
          {
            ad: "Ekşi Tatlı Soslu Tavuk",
            aciklama:
              "Küp küp doğranmış tavuk parçaları, mantar, biber, kuru soğan, böğrürtlen ve nar ekşisi ile pişirilir, pirinç pilavı ve elma dilim patates ile sunulur.",
            fiyat: "430 TL",
            kalori: 700,
          },
          {
            ad: "Chili Soslu Tavuk",
            aciklama:
              "Küp küp doğranmış tavuk parçaları, mantar, biber, soğan ve garnitür eşliğinde servis edilir.",
            fiyat: "420 TL",
            kalori: 720,
          },
          {
            ad: "Barbekü Soslu Tavuk",
            aciklama:
              "Tavuk parçaları, barbekü sos ile ızgarada pişirilir. Domates, biber ve soğan ile servis edilir.",
            fiyat: "480 TL",
            kalori: 620,
          },
          {
            ad: "Ispanak Eşliğinde Tavuk Bonfile",
            aciklama:
              "Tavuk göğsü ızgarada pişirilir, ıspanak ile birlikte kremsi sos ve güneşte kurutulmuş domates ile servis edilir.",
            fiyat: "550 TL",
            kalori: 690,
          },
          {
            ad: "Tavuk Saç Kavurma",
            aciklama:
              "Tavuk parçaları, soğan, renkli biberler, domates ve özel baharat ile saç üzerinde pişirilir.",
            fiyat: "530 TL",
            kalori: 760,
          },
          {
            ad: "Meksika Soslu Piliç",
            aciklama:
              "Meksika fasulyesi ve patates püresi ile servis edilir. Tavuk parçaları baharatlı Meksika sosuyla buluşur.",
            fiyat: "540 TL",
            kalori: 680,
          },
        ],
      },

      /* ─────────── ATIŞTIRMALIK & SANDVİÇ ─────────── */
      {
        slug: "tostlar",
        ad: "Tostlar",
        grup: "Atıştırmalık & Sandviç",
        urunler: [
          {
            ad: "Kaşarlı Tost",
            aciklama: "Tereyağında kızartılmış ekmek, kaşar peyniri.",
            fiyat: "210 TL",
            kalori: 520,
          },
          {
            ad: "Sucuklu Kaşarlı Tost",
            aciklama: "Tereyağında kızartılmış ekmek, sucuk ve kaşar peyniri.",
            fiyat: "240 TL",
            kalori: 620,
          },
          {
            ad: "Karışık Tost",
            aciklama: "Sucuk, salam, kaşar peyniri, turşu ve özel sos.",
            fiyat: "250 TL",
            kalori: 630,
          },
          {
            ad: "Ayvalık Tost",
            aciklama:
              "Özel Ayvalık tostu, sucuk, kaşar peyniri, zeytin ezmesi, salata ve özel sos.",
            fiyat: "300 TL",
            kalori: 720,
          },
          {
            ad: "Kavurmalı Tost",
            aciklama: "Özel kavurma, kaşar peyniri, karamelize soğan.",
            fiyat: "320 TL",
            kalori: 710,
          },
          {
            ad: "Bazlama Ekmeğinde Tavuklu Tost",
            aciklama:
              "Izgara tavuk, kaşar peyniri, turşu, özel sos ile bazlama ekmeğinde.",
            fiyat: "350 TL",
            kalori: 760,
          },
          {
            ad: "Special Bazlama",
            aciklama:
              "Sucuk, kavurma, kaşar peyniri, turşu, özel sos ile bazlama ekmeğinde.",
            fiyat: "350 TL",
            kalori: 820,
          },
        ],
      },
      {
        slug: "aperatifler",
        ad: "Aperatifler",
        grup: "Atıştırmalık & Sandviç",
        tanit: "Paylaşmanın en lezzetli hali.",
        urunler: [
          {
            ad: "Karışık Sepet",
            aciklama:
              "Paçanga böreği, soğan halkası, sosis, kaşar pane, panelenmiş tavuk, sigara böreği, patates cipsi ve özel soslarla servis edilir.",
            fiyat: "420 TL",
            kalori: 1280,
          },
          {
            ad: "Sosis Sepeti",
            adet: "10 adet",
            aciklama:
              "Patates cipsi, sosis, dip sos ve acılı ezme eşliğinde servis edilir.",
            fiyat: "320 TL",
            kalori: 780,
          },
          {
            ad: "Soğan Halkası",
            adet: "10 adet",
            aciklama:
              "Patates cipsi, soğan halkası ve özel sos ile servis edilir.",
            fiyat: "220 TL",
            kalori: 520,
          },
          {
            ad: "Kaşar Pane",
            aciklama:
              "Panelenmiş kaşar, patates cipsi ve özel sos ile servis edilir.",
            fiyat: "290 TL",
            kalori: 760,
          },
          {
            ad: "Kalem Böreği",
            adet: "7 adet",
            aciklama:
              "Patates cipsi, kalem böreği ve özel sos ile servis edilir.",
            fiyat: "280 TL",
            kalori: 540,
          },
          {
            ad: "Paçanga Böreği",
            adet: "3 adet",
            aciklama:
              "Patates cipsi, dip sos ve acılı ezme eşliğinde servis edilir.",
            fiyat: "430 TL",
            kalori: 890,
          },
          {
            ad: "Çıtır Tavuk",
            adet: "8 adet",
            aciklama:
              "Patates cipsi, panelenmiş tavuk, dip sos ve acılı ezme ile servis edilir.",
            fiyat: "400 TL",
            kalori: 820,
          },
          {
            ad: "Bonfilet Patates",
            aciklama: "Dip sos ve acılı ezme ile servis edilir.",
            fiyat: "220 TL",
            kalori: 490,
          },
          {
            ad: "Elma Dilim Patates",
            aciklama: "Dip sos ve acılı ezme ile servis edilir.",
            fiyat: "250 TL",
            kalori: 560,
          },
        ],
      },
      {
        slug: "soguk-sandvicler",
        ad: "Soğuk Sandviçler",
        grup: "Atıştırmalık & Sandviç",
        urunler: [
          {
            ad: "Beyaz Peynirli Sandviç",
            aciklama:
              "Sandviç ekmeği içerisine marul, salatalık, domates, maydanoz, beyaz peynir, mevsim yeşillikleri, patates cipsi ve dip sos ile servis edilir.",
            fiyat: "230 TL",
            kalori: 420,
          },
          {
            ad: "Kaşar Peynirli Sandviç",
            aciklama:
              "Sandviç ekmeğinin arasına marul, domates, salatalık, kaşar peyniri, mevsim yeşillikleri, patates cipsi ve dip sos ile servis edilir.",
            fiyat: "250 TL",
            kalori: 460,
          },
          {
            ad: "Ton Balıklı Sandviç",
            aciklama:
              "Sandviç ekmeğinin içerisine marul, domates, kornişon turşu, ton balığı, siyah zeytin, dereotu, mevsim yeşillikleri ve patates cipsi eşliğinde servis edilir.",
            fiyat: "300 TL",
            kalori: 520,
          },
          {
            ad: "Sucuk Ekmek",
            aciklama:
              "Lav taşında pişirilmiş sucuklarımız; domates, biber, patates cipsi, dip sos ve mevsim yeşillikleri eşliğinde servis edilir.",
            fiyat: "350 TL",
            kalori: 560,
          },
        ],
      },
      {
        slug: "gozlemeler",
        ad: "Gözlemeler & Wrap",
        grup: "Atıştırmalık & Sandviç",
        urunler: [
          {
            ad: "Kaşarlı Gözleme",
            aciklama:
              "Mevsim yeşillikleri, patates cipsi, roka ve dip sos ile servis edilir.",
            fiyat: "250 TL",
            kalori: 640,
          },
          {
            ad: "Ispanaklı Gözleme",
            aciklama:
              "Mozzarella peyniri, ıspanak, mevsim yeşillikleri, patates cipsi ve dip sos eşliğinde servis edilir.",
            fiyat: "230 TL",
            kalori: 580,
          },
          {
            ad: "Patatesli Gözleme",
            aciklama:
              "Mevsim yeşillikleri, patates cipsi ve dip sos ile servis edilir.",
            fiyat: "225 TL",
            kalori: 610,
          },
          {
            ad: "Beyaz Peynirli Gözleme",
            aciklama:
              "Mevsim yeşillikleri, patates cipsi ve dip sos ile servis edilir.",
            fiyat: "220 TL",
            kalori: 570,
          },
          {
            ad: "Etli Quesadilla",
            aciklama:
              "Renkli biberler, özel etimiz, mevsim yeşillikleri ve dip sos ile servis edilir.",
            fiyat: "400 TL",
            kalori: 950,
          },
          {
            ad: "Tavuklu Quesadilla",
            aciklama:
              "Renkli biberler, özel tavuğumuz, mevsim yeşillikleri ve dip sos ile servis edilir.",
            fiyat: "360 TL",
            kalori: 820,
          },
          {
            ad: "Sebzeli Quesadilla",
            aciklama:
              "Garnitür, kabak, havuç, brokoli, karnabahar ve mevsim yeşillikleri eşliğinde servis edilir.",
            fiyat: "340 TL",
            kalori: 720,
          },
          {
            ad: "Tavuklu Wrap",
            aciklama:
              "Jülyen doğranmış tavuk, mantar, renkli biberler, demi-glace sos, kaşar peyniri, mevsim yeşillikleri, patates cipsi ve acılı ezme eşliğinde servis edilir.",
            fiyat: "400 TL",
            kalori: 860,
          },
          {
            ad: "Etli Wrap",
            aciklama:
              "Jülyen doğranmış bonfile parçaları, mantar, biber, demi-glace sos, kaşar peyniri, mevsim yeşillikleri, patates cipsi ve acılı ezme eşliğinde servis edilir.",
            fiyat: "460 TL",
            kalori: 990,
          },
        ],
      },
      {
        slug: "salatalar",
        ad: "Salatalar",
        grup: "Atıştırmalık & Sandviç",
        urunler: [
          {
            ad: "Akdeniz Salata",
            aciklama:
              "Mevsim yeşillikleri, kurutulmuş domates parçaları, ceviz, roka, maydanoz, beyaz peynir, zeytin, mısır ve özel sos ile servis edilir.",
            fiyat: "330 TL",
            kalori: 420,
          },
          {
            ad: "Çoban Salatası",
            aciklama: "Domates, salatalık, yeşil biber ve soğan eşliğinde servis edilir.",
            fiyat: "300 TL",
            kalori: 210,
          },
          {
            ad: "Çıtır Tavuk Salatası",
            aciklama:
              "Mevsim yeşillikleri, mısır, mozzarella peyniri ve tavuk parçaları eşliğinde servis edilir.",
            fiyat: "350 TL",
            kalori: 480,
          },
          {
            ad: "Barbekü Soslu Tavuk Salata",
            aciklama:
              "Mevsim yeşillikleri, Meksika fasulyesi, mısır, cheddar peyniri ve ızgarada pişirilmiş tavuk ile servis edilir.",
            fiyat: "400 TL",
            kalori: 530,
          },
          {
            ad: "Keçi Peynirli Salata",
            aciklama:
              "Mevsim yeşillikleri, mısır, ceviz, çilek, portakal ve panelenmiş keçi peyniri ile servis edilir.",
            fiyat: "420 TL",
            kalori: 460,
          },
          {
            ad: "Sezar Salata",
            aciklama:
              "Göbek marul, havuç, mısır, kıtır ekmek, Sezar sosu ve tavuk parçaları ile servis edilir.",
            fiyat: "300 TL",
            kalori: 440,
          },
          {
            ad: "Akarçay Beef Salata",
            aciklama:
              "Mevsim yeşillikleri, jülyen doğranmış bonfile parçaları, mısır, havuç, kabak, mantar ve biberler eşliğinde servis edilir.",
            fiyat: "480 TL",
            kalori: 590,
          },
          {
            ad: "Köfteli Yeşil Salata",
            aciklama:
              "Mevsim yeşillikleri, zeytin parçacıkları, kornişon turşu, kurutulmuş domates ve ızgarada pişirilmiş köftelerle servis edilir.",
            fiyat: "460 TL",
            kalori: 560,
          },
          {
            ad: "Ton Balıklı Salata",
            aciklama:
              "Mevsim yeşillikleri, mısır, yeşil zeytin, siyah zeytin, kornişon turşu ve ton balığı eşliğinde servis edilir.",
            fiyat: "470 TL",
            kalori: 500,
          },
          {
            ad: "Tavuk Bademli Ilık Salata",
            aciklama:
              "Mevsim yeşillikleri, Meksika fasulyesi, mısır, beyaz peynir, tavuk parçaları ve badem eşliğinde servis edilir.",
            fiyat: "420 TL",
            kalori: 520,
          },
        ],
      },
      {
        slug: "makarnalar",
        ad: "Makarnalar",
        grup: "Ana Yemekler",
        urunler: [
          {
            ad: "Fettuccini Alfredo",
            aciklama:
              "Küp küp doğranmış tavuk göğsü, mantar, renkli biberler, krema ve pesto sos eşliğinde servis edilir.",
            fiyat: "450 TL",
            kalori: 890,
          },
          {
            ad: "Penne Arabiata",
            aciklama:
              "Özel domates sosu, siyah zeytin ve jalapeno biberi ile servis edilir.",
            fiyat: "320 TL",
            kalori: 620,
          },
          {
            ad: "Spagetti Napolitan",
            aciklama: "Özel domates sosu ile servis edilir.",
            fiyat: "300 TL",
            kalori: 560,
          },
          {
            ad: "Körili Alfredo",
            aciklama:
              "Küp küp doğranmış tavuk parçaları, mantar ve biberler eşliğinde servis edilir.",
            fiyat: "450 TL",
            kalori: 870,
          },
          {
            ad: "Zerde Tavuk Penne",
            aciklama:
              "Tavuk parçaları, mantar, krema ve zerdeçal eşliğinde servis edilir.",
            fiyat: "420 TL",
            kalori: 880,
          },
          { ad: "Mantı", fiyat: "380 TL", kalori: 710 },
        ],
      },
      {
        slug: "et-yemekleri",
        ad: "Et Yemekleri",
        grup: "Ana Yemekler",
        urunler: [
          {
            ad: "Izgara Köfte",
            aciklama:
              "Pirinç pilavı, elma dilim patates, ızgara domates, biber ve tırnak pide eşliğinde servis edilir.",
            fiyat: "750 TL",
            kalori: 750,
          },
          {
            ad: "Yaz Köftesi",
            aciklama:
              "Yoğurt, ızgara biber, domates, elma dilim patates ve acı sos eşliğinde servis edilir.",
            fiyat: "850 TL",
            kalori: 810,
          },
          {
            ad: "Akarçay Güneşi",
            aciklama:
              "Jülyen doğranmış bonfile parçaları, mantar, renkli biberler, özel sosu, kibrit patates, ızgara domates ve biber eşliğinde servis edilir.",
            fiyat: "900 TL",
            kalori: 890,
          },
          {
            ad: "Tereyağında Lokum",
            aciklama:
              "Dana bonfile marine edilmiş olup lav taşında pişirilip kızartılmış ekmekle servis edilir.",
            fiyat: "1200 TL",
            kalori: 950,
          },
          {
            ad: "Et Çökertme",
            aciklama:
              "Jülyen doğranmış etlerimiz tavada pişirilip özel sosuyla tatlandırılarak kibrit patates, nane, yoğurt, domates ve biber eşliğinde servis edilir.",
            fiyat: "800 TL",
            kalori: 920,
          },
          {
            ad: "Mantar Soslu Dana Bonfile",
            aciklama:
              "Marine edilmiş etlerimiz ızgarada pişirilip krema, mantar sos, kaşar peyniri, elma dilim patates ve garnitür eşliğinde servis edilir.",
            fiyat: "880 TL",
            kalori: 890,
          },
          {
            ad: "Dana Fajita",
            aciklama:
              "Marine edilmiş bonfile etimiz ızgarada pişirilip kapya biber, köy biberi, kuru soğan ve lavaş eşliğinde özel soslarıyla servis edilir.",
            fiyat: "950 TL",
            kalori: 860,
          },
          {
            ad: "Şaşlık Tava",
            aciklama:
              "Bonfile parçaları, biberler, soğan, krema ve soya sosu yapıldıktan sonra garnitür ile servis edilir.",
            fiyat: "1000 TL",
            kalori: 950,
          },
          {
            ad: "Saç Kavurma",
            aciklama:
              "Küp küp doğranmış bonfile etleri, soğan, biber, domates ve özel baharatlarımız ile servis edilir.",
            fiyat: "940 TL",
            kalori: 900,
          },
          {
            ad: "Tava Ciğer",
            aciklama:
              "Ciğer pişirilip pidemiz harmanlandıktan sonra baharatlanıp jalapeno biberi, sumaklı soğan, roka ve domates eşliğinde servis edilir.",
            fiyat: "650 TL",
            kalori: 860,
          },
          {
            ad: "Karışık Izgara",
            aciklama:
              "Tavuk ızgara, köfte, sucuk, bonfile, bazlama ekmeği, ızgara domates ve biber eşliğinde servis edilir.",
            fiyat: "1150 TL",
            kalori: 980,
          },
          {
            ad: "Newyork Steak",
            aciklama:
              "Marine edilmiş bonfile etlerimiz ızgarada pişirilip kabak, havuç, kapya biber, köy biberi ve haşlanmış patates eşliğinde servis edilir.",
            fiyat: "950 TL",
            kalori: 1000,
          },
        ],
      },
      {
        slug: "hamburgerler",
        ad: "Hamburgerler",
        grup: "Atıştırmalık & Sandviç",
        urunler: [
          {
            ad: "Klasik Hamburger",
            aciklama:
              "Özel hazırladığımız hamburger etlerimiz lav taşında pişirilip marul, domates, kornişon turşu, Rus salatası ve patates cipsi ile servis edilir.",
            fiyat: "450 TL",
            kalori: 620,
          },
          {
            ad: "Cheeseburger",
            aciklama:
              "Izgarada pişirilmiş hamburger etlerimiz; cheddar peyniri, marul, domates, kornişon turşu, patates cipsi ve Rus salatası ile servis edilir.",
            fiyat: "470 TL",
            kalori: 640,
          },
          {
            ad: "Big Burger",
            aciklama:
              "Özel hazırladığımız hamburger etlerimiz lav taşında pişirilip marul, domates, kornişon turşu, Rus salatası ve patates cipsi ile servis edilir.",
            fiyat: "500 TL",
            kalori: 700,
          },
          {
            ad: "Şefin Özel Hamburgeri",
            aciklama:
              "Lav taşında pişirilmiş karamelize soğan, mantar, biberler, cheddar peyniri, Rus salatası ve patates cipsi eşliğinde servis edilir.",
            fiyat: "500 TL",
            kalori: 720,
          },
          {
            ad: "Çıtır Tavuk Burger",
            aciklama:
              "Çıtır tavuk göğsü, marul, domates, kornişon turşu, özel sos ve patates cipsi ile servis edilir.",
            fiyat: "420 TL",
            kalori: 580,
          },
          {
            ad: "4'lü Mini Burger",
            aciklama:
              "Marul, domates, kornişon turşu, cheddar peyniri, patates cipsi, yoğurtlu sos ve acılı ezme eşliğinde servis edilir.",
            fiyat: "550 TL",
            kalori: 640,
          },
          {
            ad: "6'lı Mini Burger",
            aciklama:
              "Marul, domates, kornişon turşu, cheddar peyniri, patates cipsi, yoğurtlu sos ve acılı ezme eşliğinde servis edilir.",
            fiyat: "700 TL",
            kalori: 860,
          },
        ],
      },
      {
        slug: "krepler",
        ad: "Krepler",
        grup: "Atıştırmalık & Sandviç",
        urunler: [
          {
            ad: "Tavuklu Krep",
            aciklama:
              "Tavuk parçaları, mantar, biber, Provencal sos üzerinde beşamel sos, kaşar peyniri, mevsim yeşillikleri, patates cipsi ve acı sos ile servis edilir.",
            fiyat: "380 TL",
            kalori: 760,
          },
          {
            ad: "Etli Krep",
            aciklama:
              "Bonfile parçaları, mantar, biber, Provencal sos üzerinde beşamel sos, kaşar peyniri, mevsim yeşillikleri, patates cipsi ve acı sos ile servis edilir.",
            fiyat: "430 TL",
            kalori: 880,
          },
          {
            ad: "Bazlamada Tavuk",
            aciklama:
              "Tavuk parçaları, mantar, biber, Provencal sos üzerinde beşamel sos, kaşar peyniri, mevsim yeşillikleri ve patates cipsi ile servis edilir.",
            fiyat: "400 TL",
            kalori: 820,
          },
          {
            ad: "Bazlamada Et",
            aciklama:
              "Bonfile parçaları, mantar, biber, Provencal sos, kaşar peyniri, mevsim yeşillikleri ve patates cipsi ile servis edilir.",
            fiyat: "480 TL",
            kalori: 980,
          },
        ],
      },
      {
        slug: "cheesecake-pastalar",
        ad: "Cheesecake & Pastalar",
        grup: "Tatlılar",
        altGruplar: [
          {
            baslik: "Cheesecake Çeşitleri",
            urunler: [
              {
                ad: "Sebastian",
                aciklama: "Belçika çikolatası ile servis edilir.",
                fiyat: "320 TL",
              },
              { ad: "Lotus Cheesecake", fiyat: "320 TL" },
              { ad: "Frambuazlı Cheesecake", fiyat: "310 TL" },
              { ad: "Çikolatalı Burrle Cheesecake", fiyat: "310 TL" },
            ],
          },
          {
            baslik: "Adet Pastalar",
            urunler: [
              { ad: "Fıstıklı Klasik", fiyat: "260 TL" },
              { ad: "Çikolatalı Klasik", fiyat: "260 TL" },
              { ad: "Muzlu Babaroski", fiyat: "280 TL" },
              { ad: "Çilekli Babaroski", fiyat: "280 TL" },
              { ad: "Çilek Fıstık", fiyat: "310 TL" },
              { ad: "Sneakers", fiyat: "280 TL" },
              { ad: "Çiçek Saçak", fiyat: "290 TL" },
              { ad: "Latte Nescafeli", fiyat: "310 TL" },
              { ad: "Malaga", fiyat: "290 TL" },
              { ad: "Modevik", fiyat: "320 TL" },
              { ad: "Pavlova", fiyat: "320 TL" },
              { ad: "Çikolatalı Frambuazlı Adet", fiyat: "290 TL" },
            ],
          },
        ],
      },
      {
        slug: "waffle-tatli",
        ad: "Waffle & Tatlı",
        grup: "Tatlılar",
        urunler: [
          {
            ad: "Waffle",
            aciklama: "Çikolata, muz ve çilek eşliğinde servis edilir.",
            fiyat: "400 TL",
            kalori: 650,
          },
          {
            ad: "Kızarmış Dondurma",
            aciklama: "Pişmaniye ve meyve eşliğinde servis edilir.",
            fiyat: "350 TL",
            kalori: 620,
          },
          {
            ad: "Çilekli Kruvasan",
            aciklama: "Krema, çilek parçaları ve sütlü çikolata ile servis edilir.",
            fiyat: "360 TL",
            kalori: 580,
          },
          {
            ad: "Lotuslu Kruvasan",
            aciklama:
              "Lotus kreması, bisküvi parçaları ve sütlü çikolata ile servis edilir.",
            fiyat: "390 TL",
            kalori: 620,
          },
          {
            ad: "Meyve Tabağı",
            aciklama: "Mevsimine göre değişkenlik gösterir.",
            fiyat: "600 TL",
            kalori: 250,
          },
          {
            ad: "Karayıp Katları",
            aciklama:
              "İki kek katı arasında sade dondurma, üstüne Belçika çikolatası ve kırık fındıklarla servis edilir.",
            fiyat: "400 TL",
            kalori: 680,
          },
        ],
      },
      {
        slug: "caylar",
        ad: "Çaylar",
        grup: "Sıcak İçecekler",
        altGruplar: [
          {
            baslik: "Çaylar",
            urunler: [
              { ad: "Çay", fiyat: "40 TL" },
              { ad: "Fincan Çay", fiyat: "70 TL" },
              { ad: "İngiliz Çayı", fiyat: "100 TL" },
            ],
          },
          {
            baslik: "Bitki ve Meyve Çayları",
            urunler: [
              { ad: "Kış Çayı", fiyat: "180 TL" },
              { ad: "Yeşil Çay", fiyat: "180 TL" },
              { ad: "Ihlamur", fiyat: "180 TL" },
              { ad: "Papatya", fiyat: "180 TL" },
              { ad: "Ada Çayı", fiyat: "180 TL" },
              { ad: "Hibiscus Çayı", fiyat: "180 TL" },
              { ad: "Nane Limon", fiyat: "180 TL" },
              { ad: "Orman Meyveli Çay", fiyat: "180 TL" },
              { ad: "Elma Tarçın", fiyat: "180 TL" },
            ],
          },
        ],
      },
      {
        slug: "turk-kahveleri",
        ad: "Türk Kahveleri",
        grup: "Sıcak İçecekler",
        altGruplar: [
          {
            baslik: "Türk Kahveleri",
            urunler: [
              { ad: "Türk Kahvesi", fiyat: "110 TL" },
              { ad: "Double Türk Kahvesi", fiyat: "160 TL" },
              { ad: "Dibek", fiyat: "130 TL" },
              { ad: "Menengiç", fiyat: "130 TL" },
              { ad: "Damla Sakızlı", fiyat: "130 TL" },
            ],
          },
          {
            baslik: "Sıcak Çikolata & Salep",
            urunler: [
              {
                ad: "Sıcak Çikolata",
                aciklama: "Çilek, karamel, muz, frambuaz, fındık, coconut, nane.",
                fiyat: "160 TL",
              },
              {
                ad: "Sıcak Beyaz Çikolata",
                aciklama: "Balkabağı, fındık, antep, coconut.",
                fiyat: "160 TL",
              },
              { ad: "Salep", fiyat: "160 TL" },
              { ad: "Damla Sakızlı Salep", fiyat: "160 TL" },
              { ad: "Chai Tea Latte", fiyat: "160 TL" },
            ],
          },
        ],
      },
      {
        slug: "coffee-bar",
        ad: "Coffee Bar",
        grup: "Sıcak İçecekler",
        urunler: [
          { ad: "Espresso", fiyat: "130 TL" },
          { ad: "Espresso Double", fiyat: "150 TL" },
          { ad: "Americano", fiyat: "180 TL" },
          { ad: "Latte", fiyat: "180 TL" },
          { ad: "Flat White", fiyat: "180 TL" },
          { ad: "Cappuccino", fiyat: "180 TL" },
          { ad: "Filtre Kahve", fiyat: "170 TL" },
          { ad: "Mocha", fiyat: "190 TL" },
          { ad: "White Mocha", fiyat: "190 TL" },
          { ad: "Caramel Macchiato", fiyat: "190 TL" },
          { ad: "Pumpkin Spice Latte", fiyat: "190 TL" },
          { ad: "Toffee Nut Latte", fiyat: "190 TL" },
          { ad: "Pistachio", fiyat: "230 TL" },
        ],
      },
      {
        slug: "matcha-bar",
        ad: "Matcha Bar",
        grup: "Sıcak İçecekler",
        urunler: [
          {
            ad: "Matcha Shot",
            aciklama: "Yoğunlaştırılmış saf matcha.",
            fiyat: "160 TL",
          },
          {
            ad: "Ice Matcha Tea",
            aciklama: "Buzlu, ferahlatıcı matcha çayı.",
            fiyat: "170 TL",
          },
          {
            ad: "Ice Matcha Latte",
            aciklama: "Süt ile yumuşatılmış klasik matcha.",
            fiyat: "180 TL",
          },
          {
            ad: "Ice Strawberry Matcha Latte",
            aciklama: "Çilek püresi ile tatlandırılmış matcha latte.",
            fiyat: "200 TL",
          },
          {
            ad: "Ice Mango Matcha Latte",
            aciklama: "Mango püresi ile tropikal matcha latte.",
            fiyat: "200 TL",
          },
          {
            ad: "Ice Vanilla Matcha Latte",
            aciklama: "Vanilya aromalı kremsi matcha latte.",
            fiyat: "200 TL",
          },
        ],
      },
      {
        slug: "milkshake-smoothie",
        ad: "Milkshake & Smoothie",
        grup: "Soğuk İçecekler",
        altGruplar: [
          {
            baslik: "Milkshake",
            urunler: [
              { ad: "Çikolata", fiyat: "200 TL" },
              { ad: "Çilek", fiyat: "200 TL" },
              { ad: "Muz", fiyat: "200 TL" },
              { ad: "Vanilla", fiyat: "200 TL" },
              { ad: "Antep Fıstığı", fiyat: "200 TL" },
              { ad: "Karamel", fiyat: "200 TL" },
              { ad: "Orman Meyveleri", fiyat: "200 TL" },
              { ad: "Oreo", fiyat: "200 TL" },
            ],
          },
          {
            baslik: "Smoothie-Frozen",
            urunler: [
              { ad: "Çilek", fiyat: "190 TL" },
              { ad: "Muz", fiyat: "190 TL" },
              { ad: "Orman Meyvesi", fiyat: "190 TL" },
              { ad: "Karadut", fiyat: "190 TL" },
              { ad: "Böğürtlen", fiyat: "190 TL" },
              { ad: "Frambuaz", fiyat: "190 TL" },
              { ad: "Yeşil Elma", fiyat: "190 TL" },
              { ad: "Ananas", fiyat: "190 TL" },
              { ad: "Mango", fiyat: "190 TL" },
              { ad: "Mandalina", fiyat: "190 TL" },
              { ad: "Karpuz", fiyat: "190 TL" },
              { ad: "Kavun", fiyat: "190 TL" },
            ],
          },
        ],
      },
      {
        slug: "frappe",
        ad: "Frappe & Bubble Tea",
        grup: "Soğuk İçecekler",
        altGruplar: [
          {
            baslik: "Frappe",
            urunler: [
              { ad: "Klasik Frappe", fiyat: "180 TL" },
              { ad: "Mocha Frappe", fiyat: "190 TL" },
              { ad: "White Mocha Frappe", fiyat: "190 TL" },
              { ad: "Lotus Frappe", fiyat: "190 TL" },
              { ad: "Pistachio Frappe", fiyat: "190 TL" },
              { ad: "Vanilya Frappe", fiyat: "190 TL" },
            ],
          },
          {
            baslik: "Bubble Tea Signature",
            urunler: [
              { ad: "Yaban Mersini", fiyat: "200 TL" },
              { ad: "Çilek", fiyat: "200 TL" },
              { ad: "Mango", fiyat: "200 TL" },
              { ad: "Yeşil Elma", fiyat: "200 TL" },
            ],
          },
        ],
      },
      {
        slug: "ice-coffee-bar",
        ad: "Ice Coffee Bar",
        grup: "Soğuk İçecekler",
        urunler: [
          { ad: "Ice Americano", fiyat: "180 TL" },
          { ad: "Ice Filtre Kahve", fiyat: "180 TL" },
          { ad: "Ice Latte", fiyat: "180 TL" },
          { ad: "Ice Flat White", fiyat: "180 TL" },
          { ad: "Ice Mocha", fiyat: "190 TL" },
          { ad: "Ice White Mocha", fiyat: "190 TL" },
          { ad: "Ice Caramel Macchiato", fiyat: "190 TL" },
          { ad: "Ice Pistachio", fiyat: "230 TL" },
        ],
      },
      {
        slug: "vitamin-bar",
        ad: "Vitamin Bar",
        grup: "Soğuk İçecekler",
        altGruplar: [
          {
            baslik: "Vitamin Bar",
            urunler: [
              {
                ad: "Limonata",
                aciklama:
                  "Çilek, karpuz, yeşil elma, nane, orman meyveleri, frambuaz, şeftali, mango.",
                fiyat: "140 TL",
              },
              { ad: "Sıkma Portakal Suyu", fiyat: "160 TL" },
            ],
          },
          {
            baslik: "Soğuk İçecekler",
            urunler: [
              { ad: "Küçük Su", fiyat: "25 TL" },
              { ad: "Kola", fiyat: "90 TL" },
              { ad: "Fanta", fiyat: "90 TL" },
              { ad: "Sprite", fiyat: "90 TL" },
              { ad: "Fuse Tea", fiyat: "90 TL" },
              { ad: "Soda", fiyat: "50 TL" },
              { ad: "Meyveli Soda", fiyat: "60 TL" },
              { ad: "Cappy", fiyat: "90 TL" },
              { ad: "Enerji İçeceği", fiyat: "120 TL" },
              { ad: "Schweppes", fiyat: "90 TL" },
            ],
          },
        ],
      },
      {
        slug: "mocktail",
        ad: "Mocktail",
        grup: "Soğuk İçecekler",
        tanit: "Alkolsüz.",
        urunler: [
          {
            ad: "Barbie",
            aciklama:
              "Nar, orman meyveleri, ejder meyvesi, çilek, soğuk içecek, krem şanti ve kuru meyvelerle servis edilir.",
            fiyat: "220 TL",
          },
          {
            ad: "Summer Pinito",
            aciklama: "Hindistan cevizi ve ananas karışımı, krem şanti ile servis edilir.",
            fiyat: "220 TL",
          },
          {
            ad: "Lime Glow",
            aciklama:
              "Misket limon, limon ve yeşil elma karışımı, ferahlatıcı krem şanti ile servis edilir.",
            fiyat: "220 TL",
          },
          {
            ad: "Berry Spark",
            aciklama:
              "Çilek, böğürtlen, frambuaz, limon ve soda karışımı taze nane ile servis edilir.",
            fiyat: "220 TL",
          },
          {
            ad: "Tropic Sunrise",
            aciklama:
              "Mango, portakal, ananas ve limon karışımı, soda ile ferahlatıcı bir lezzet.",
            fiyat: "220 TL",
          },
          {
            ad: "Passion Mojito",
            aciklama:
              "Çarkıfelek meyvesi, limon, nane ve soda karışımı buzla servis edilir.",
            fiyat: "220 TL",
          },
          {
            ad: "Blue Ocean",
            aciklama:
              "Mavi curacao, limon, ananas suyu ve soda karışımı, ferahlatıcı bir yaz içeceği.",
            fiyat: "220 TL",
          },
          {
            ad: "Caramel Fizz",
            aciklama:
              "Karamel, kahve, süt ve soda karışımı, krem şanti ve karamel sos ile servis edilir.",
            fiyat: "220 TL",
          },
          {
            ad: "Kuzu Kulağı",
            rozet: "Yeni",
            aciklama:
              "Kavun, misket limon, nane ve soda karışımı, ferahlatıcı ve doğal bir lezzet.",
            fiyat: "250 TL",
          },
        ],
      },
    ],
  };

  window.AKAR_MENU = MENU;
})();
