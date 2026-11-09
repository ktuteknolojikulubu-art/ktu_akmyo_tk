# Abdullah Kanca MYO Teknoloji Kulübü Web Sitesi


## Dosyalar
| Dosya | Ne işe yarar? |
| `data.js` | **Tek düzenleyeceğiniz dosya.** Topluluk adı, etkinlikler, ekip ve sosyal medya bağlantıları burada. |
| `index.html` | Sayfa iskeleti |
| `style.css` | Tasarım |
| `script.js` | Etkinlik listesi, filtreleme, detay penceresi, tema |
| `img/` | Logo ve etkinlik fotoğraflarının konulacağı klasör |


## Yeni etkinlik eklemek
`data.js` içindeki `EVENTS` listesine şu bloğu ekleyin:

```js
{
  title: "Etkinlik Adı",
  date: "2026-12-20",          // YYYY-AA-GG
  time: "18:00 - 20:00",
  location: "Konferans Salonu",
  category: "workshop",        // workshop | talk | hackathon | training | social
  speaker: "Konuşmacı Adı",    // konuşmacı yoksa "" şeklinde bırakabilirsiniz
  description: "Kısa açıklama",
  image: "img/etkinlik.jpg",   // gorsel yoksa "" şeklinde bırakabilirsiniz
  gallery: ["img/1.jpg", "img/2.jpg"],  // yoksa [] şeklinde bırakabilirsiniz
  link: "https://forms.gle/..."          // kayıt formu, yoksa "" şeklinde bırakabilirsiniz
},
```

Tarihi geçen etkinlikler **otomatik olarak "Geçmiş" sekmesine** taşınır, elle bir şey yapmanız gerekmez.


## Etkinlikte yapılanları ve fotoğrafları paylaşmak
Etkinlik bittikten sonra `data.js` içinde o etkinliğe iki alan ekleyin:

```js
report: [
  "Etkinliğe 45 öğrenci katıldı. İlk bölümde ... konuştuk.",
  "İkinci bölümde gruplara ayrılıp ... yaptık."
],
gallery: ["img/git-1.jpg", "img/git-2.jpg", "img/git-3.jpg"],
```

- `report`: Her paragraf ayrı bir metindir. Etkinlik penceresinde "Etkinlikte neler yaptık?" başlığıyla görünür.
- `gallery`: Fotoğraflar pencerede küçük görsel olarak sıralanır, tıklayınca büyür, ok tuşlarıyla gezilir.
- `image` boş bırakılırsa galerinin ilk fotoğrafı kart kapağı olur.
- Fotoğrafları `img` klasörüne yüklemeyi unutmayın. 


## Önizleme
Bilgisayarınızda `index.html` dosyasına çift tıklamanız yeterli. Kurulum gerekmez.


## Notlar
- Fotoğrafları yüklemeden önce küçültün (genişlik ~1200 px, 300 KB altı); site hızlı açılır.
- Yazı tipleri Google Fonts'tan gelir. İnternet yoksa sistem yazı tipine düşer, site yine çalışır.
- Üye verisi toplanmadığı için KVKK açısından ek bir çerez/izin bildirimi gerekmez. İleride form veya analitik eklerseniz buna dikkat edin.
