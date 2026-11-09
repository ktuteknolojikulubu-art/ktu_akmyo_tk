// kulup bilgilerini, etkinlikleri, calisma alanlarini, ekip uyelerini tanimlar

//const SITE : sitenin genel bilgilerini ve gorunumde kullanilacak temel icerikleri tek bir nesne icerisinde tutar
const SITE = {
  name: "Abdullah Kanca MYO Teknoloji Kulübü",
  university: "Karadeniz Teknik Üniversitesi",
  logo: "img/ktu_akmyotk_logo.jpg",
  tagline: "Birlikte öğren, üret ve paylaş.",
  description:
    "Yazılıma ilgi duyan öğrencileri bir araya getiriyoruz. Atölyeler, konuşmalar, hackathonlar ve proje geliştirme buluşmalarıyla hem öğreniyor hem de gerçek projeler üretiyoruz.",
  about: [
    "Kulübümüz, her seviyeden öğrencinin yazılım dünyasında kendine yer bulabilmesi için kuruldu. Yeni başlayanlardan deneyimli geliştiricilere kadar herkesin katkı sunabildiği açık bir ortam sunuyoruz.",
    "Uygulamalı atölyeler yapıyor ve ekip halinde proje geliştiriyoruz."
  ],

  //buradaki "" larin ici bos kalirsa sitede gozukmez
  email: "",
  social: {
    instagram: "https://www.instagram.com/ktuteknolojikulubu/",
    github: "",
    linkedin: "",
    discord: "",
    youtube: ""
  },

  //kulubun calisma yaptigi alanlar ekle/cikar yapilabilir
  //icon: calisma alanini temsil eden emoji, title: calisma alaninin basligi, text: calisma alaninin kisa aciklamasi
  focus: [
    { icon: "🌐", title: "Web Geliştirme", text: "Modern arayüzlerden sunucu tarafına, uçtan uca web uygulamaları." },
    { icon: "🤖", title: "Yapay Zekâ", text: "Makine öğrenmesi, veri bilimi ve üretken yapay zekâ çalışmaları." },
    { icon: "📱", title: "Mobil Uygulama", text: "Android, iOS ve çapraz platform uygulama geliştirme." },
    { icon: "🔐", title: "Siber Güvenlik", text: "Güvenli kod yazımı, CTF yarışmaları ve temel güvenlik pratikleri." }
  ]
};

/* Etkinlik ekleme:
   - date: YYYY-AA-GG biciminde, tarihi gecen etkinlikler otomatik "Geçmiş" sekmesine duser
   - category: etkinligin turunu belirtir, ornek:workshop | talk | hackathon | social | training
   - description: kartta ve pencerenin basinda gorunen kisa ozet
   - report: istege bagli, "Etkinlikte neler yaptık?" anlatimi, her paragraf ayri bir metin olarak yazilir
   - image: istege bagli kapak gorseli (ornek: "img/git-atolyesi.jpg"), bossa galerinin ilk fotografi,
     o da yoksa renkli kapak kullanilir
   - gallery: istege bagli fotograf listesi. Pencerede kucuk gorsel olarak gorunur, tiklayinca buyur
   - link: istege bagli kayit / bilgi naglantisi (https ile baslamali)
*/
// const EVENTS: kulupte duzenlenen veya duzenlenecek etkinliklerin bilgilerini tutan dizi
const EVENTS = [
  /*
  {
    title: "Git ve GitHub'a Giriş Atölyesi",
    date: "2026-11-04",
    time: "17:30 - 19:30",
    location: "Bilgisayar Laboratuvarı",
    category: "workshop",
    speaker: "Topluluk Ekibi",
    description:
      "Sürüm kontrolü nedir, neden kullanılır? Depo oluşturma, commit, branch ve pull request adımlarını uygulamalı olarak öğreniyoruz. Hiç Git kullanmamış olanlar da katılabilir.",
    report: [
      "Önce Git'in mantığını ve kurulumunu birlikte yapacağız, ardından herkes kendi GitHub hesabında bir depo oluşturacak.",
      "İkinci bölümde gruplar halinde çalışıp branch açacak, değişiklik yapıp pull request göndereceğiz. Atölye sonunda sık yapılan hataları ve çözümlerini konuşacağız."
    ],
    image: "",
    gallery: [],
    link: ""
  },
  {
    title: "Yazılımcı Kariyeri Sohbeti: Staj, Portfolyo ve İlk İş",
    date: "2026-11-18",
    time: "18:00 - 19:30",
    location: "Konferans Salonu",
    category: "talk",
    speaker: "Konuk konuşmacı (duyurulacak)",
    description:
      "Sektörde çalışan bir konuğumuzla staj başvurusu, GitHub portfolyosu hazırlama ve ilk iş görüşmesi süreçlerini konuşuyoruz. Soru-cevap bölümüyle sorularınızı doğrudan sorabilirsiniz.",
    report: [
      "Konuşmacımız kendi kariyer yolunu anlatacak, ardından staj ve ilk iş için nelere dikkat edilmesi gerektiğini paylaşacak.",
      "Son yarım saat soru-cevaba ayrılacak. Önceden sormak istediğiniz soruları topluluk üyelerine iletebilirsiniz."
    ],
    image: "",
    gallery: [],
    link: ""
  },
  {
    title: "Dönem Başı Tanışma ve Yol Haritası Buluşması",
    date: "2026-10-07",
    time: "16:30 - 18:00",
    location: "Konferans Salonu",
    category: "social",
    speaker: "",
    description:
      "Yeni dönemin ilk buluşmasında yeni üyelerle tanıştık, topluluğun neler yaptığını anlattık ve dönem boyunca yapılacak etkinlikleri birlikte planladık.",
    report: [
      "Ekip üyeleri kendilerini tanıttı, geçen dönem yapılan çalışmalardan örnekler paylaşıldı.",
      "Katılımcılardan hangi konularda atölye ve konuşma görmek istediklerini aldık. Bu geri bildirimlere göre dönem programını şekillendiriyoruz."
    ],
    image: "",
    gallery: [],
    link: ""
  }
    */
];

//const TEAM: kulup yonetim ekibindeki kisilerin bilgilerini tutar
// name: ad soyad, role: kulupteki gorevi, link: kisinin linkedin / instagram vb. hesabinin linki
const TEAM = [
  /*
  { name: "Ad Soyad", role: "Topluluk Başkanı", link: "" },
  { name: "Ad Soyad", role: "Başkan Yardımcısı", link: "" },
  { name: "Ad Soyad", role: "Teknik Ekip Lideri", link: "" },
  { name: "Ad Soyad", role: "Etkinlik Koordinatörü", link: "" },
  { name: "Ad Soyad", role: "Sosyal Medya & Tasarım", link: "" },
  { name: "Danışman Öğr. Gör. Ad Soyad", role: "Akademik Danışman", link: "" }
   */
];
