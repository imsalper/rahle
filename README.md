# Rahle (رَحْلَة) — Hatim, Zikirmatik, Namaz Hocası & 4 Mezhepli AI Fetva

<div align="center">
  <img src="icon.jpg" width="160" height="160" style="border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" alt="Rahle Logo" />
  <br/>
  <h3>Kur'an-ı Kerim Hatim Takibi, Akıllı Tesbihat, Rekat Rehberi ve 4 Mezhep Karşılaştırmalı Fıkıh Asistanı</h3>
  <p>Huzur verici yeşil ve toprak tonları, göz yormayan gece modu ve mobil öncelikli PWA mimarisi.</p>
  <p>
    🌐 <strong>Canlı Web Uygulaması:</strong> <a href="https://imsalper.github.io/rahle/" target="_blank">https://imsalper.github.io/rahle/</a>
  </p>
</div>

---

## 🌟 Öne Çıkan Modüller

### 1. 📖 30 Günlük Hatim Takibi & Senkronize Sesli Okuma (Karaoke)
- **30 Günlük Akıllı Plan**: Başlangıç tarihine göre otomatik günlük hedef (604 sayfa ÷ 30 gün ≈ günde 20 sayfa / 1 cüz).
- **Karaoke Ayet Vurgulama**: EveryAyah CDN üzerinden ses çalarken ekranda okunan ayet altın ışıma (`active-verse-highlight`) ile eş zamanlı vurgulanır.
- **Kari Seçimi**: Mişarî Raşid el-Afâsî, Abdulbâsit Abdussamed (Murattal) ve Mahmud Halil el-Husarî.
- **30 Cüz Etkileşimli Matrisi**: Tek dokunuşla durum güncelleme (*Okunmadı* ➔ *Okunuyor* ➔ *Tamamlandı*).
- **Hatim Duası**: Arapça metin ve Türkçe derin meal içeren özel dua penceresi.

### 2. 📿 Haptik Zikirmatik (Akıllı Tesbih)
- **Büyük Dokunmatik Kadran**: Web Audio API ile sentezlenen yumuşak ahşap tesbih tık sesi ve haptik titreşim (`navigator.vibrate`) geri bildirimi.
- **33'lük Namaz Tesbihatı Modu**: Sübhanallah (33) ➔ Elhamdülillah (33) ➔ Allahu Ekber (34) ➔ Lâ ilâhe illallah sıralı otomatik geçiş döngüsü.
- **Zikir Kütüphanesi**: İstiğfar, Salavat, Kelime-i Tevhid, Hasbünallah ve özel hedef belirleme.
- **SVG İlerleme Halkası** ve LocalStorage kalıcı sayaçlar.

### 3. 🕌 Namaz Hocası (Rekat Rekat Anlatım & Dualar)
- **5 Vakit Namaz + Vitir Vacip**: Sünnet, farz ve son sünnet dökümü.
- **Erkek / Kadın Duruş Filtresi**: Kıyamda el bağlama, rüku eğilme açısı, secde dirsek duruşu ve oturuş (teverrük / iftiraş) farklarının detaylı izahı.
- **Rekat Rekat Adım Kartları**: Kıyam, Kıraat, Rüku, Kavme, Secde, Ka'de adımları ve okunacaklar.
- **Namaz Sûre ve Duaları**: Sübhaneke, Fatiha, İhlas, Felak, Nas, Ettehiyyatü, Salli-Barik, Rabbena ve Kunut duaları.

### 4. ⚖️ 4 Mezhepli AI Destekli Fıkıh & Fetva
- **Serbest Soru Sorma**: Serbest metin ile arama ve dinamik fıkıh usûlü sentezi.
- **4 Mezhep Mukayeseli Panel**:
  - 🟢 **Hanefî Mezhebi**: Net hüküm rozeti + Kaynaklar (*el-Hidâye, İbn Âbidîn*) + Hadis & Sıhhat derecesi (Sahih vb.)
  - 🔵 **Şâfiî Mezhebi**: Net hüküm + Kaynak (*el-Mecmû'*)
  - 🟡 **Mâlikî Mezhebi**: Net hüküm + Kaynak (*el-Müdevvene*)
  - 🟣 **Hanbelî Mezhebi**: Net hüküm + Kaynak (*el-Muğnî*)
- **Resmi Doğrulama Kanalları**:
  - 🌐 Diyanet Fetva Portalı (`fetva.diyanet.gov.tr`)
  - 📱 e-Devlet Dini Soru Sorma
  - 📞 ALO 190 Fetva Hattı (`tel:190`)
- **Geri Bildirim**: "Yanlış / Yanıltıcı Bildir" butonu.

### 5. 🌙 Tasarım & Profil
- **Gece Zümrüdü & Medine Altını** (Koyu Mod) ve **Adaçayı & Sıcak Keten** (Açık Mod) seçenekleri.
- Günlük zikir ve tamamlanan cüz istatistikleri.
- Günün Âyet / Hadis-i Şerif köşesi.

---

## 🛠️ Teknoloji Yığını
- **Frontend**: Vanilla HTML5, Vanilla CSS3 (Modern Glassmorphism & Islamic Palette Tokens), Modern ES6+ JavaScript.
- **Audio & Haptics**: Web Audio API (Sentetik Ahşap Tesbih Sesi), HTML5 Audio + EveryAyah CDN, Web Vibration API.
- **Depolama**: LocalStorage (Offline / Çevrimdışı hazır).
- **PWA**: `manifest.json`, mobil uyumlu standalone mod.

---

## 💻 Yerel Çalıştırma

Herhangi bir sunucu ile doğrudan çalıştırılabilir:

```bash
# Python ile:
python3 -m http.server 8088

# Veya Node ile:
npx serve .
```

Tarayıcınızda `http://localhost:8088` adresine gidin.

---

## 📄 Lisans
Bu proje açık kaynaklıdır.
