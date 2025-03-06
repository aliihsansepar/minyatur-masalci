# 📚 Çocuk Hikaye Uygulaması

Çocuklar için kişiselleştirilmiş, değerler odaklı hikayeler oluşturan interaktif bir mobil uygulama.

![Uygulama Logo](assets/app-logo.png)

## 📱 Proje Özeti

Bu uygulama, çocuklar ve ebeveynleri için özel hikayeler oluşturmayı kolaylaştıran bir platformdur. Kullanıcılar karakterleri, temaları, ahlaki değerleri ve diğer hikaye öğelerini seçerek kendilerine özgü hikayeler oluşturabilirler.

## ✨ Özellikler

- **Kişiselleştirilmiş Karakterler**: Çocuklar ana karakteri kendileri seçebilir veya kendi isimlerini ekleyebilirler
- **Tema Seçimi**: Farklı hikaye ortamları (orman, uzay, deniz altı, vb.)
- **Ahlaki Değerler**: Dürüstlük, paylaşma, arkadaşlık gibi öğretici değerler
- **Hikaye Uzunluğu**: Kısa, orta veya uzun hikaye seçenekleri
- **Yardımcı Karakterler**: Aile üyeleri, arkadaşlar veya hayali karakterlerasdasd
- **Özel Öğeler**: Hikayeye eklenecek özel eşyalar ve nesneler
- **Ses Efektleri**: Çocuklar için eğlenceli ses efektleri
- **Sesli Okuma**: Otomatik hikaye okuma özelliği

## 🛠️ Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- React Native CLI
- Android Studio / Xcode (platformunuza göre)

### Adımlar

1. Projeyi klonlayın

   ```bash
   git clone https://github.com/kullanici/story-app.git
   cd story-app
   ```

2. Bağımlılıkları yükleyin

   ```bash
   npm install
   # veya
   yarn install
   ```

3. Uygulamayı başlatın

   ```bash
   # iOS için
   npx react-native run-ios

   # Android için
   npx react-native run-android
   ```

## 🚀 Kullanım

1. **Ana Ekran**

   - Uygulamayı başlatın ve "Yeni Hikaye" düğmesine tıklayın

2. **Karakter Seçimi**

   - Hikayenin ana karakterini seçin veya yeni bir karakter oluşturun

3. **Tema Seçimi**

   - Hikayenin geçeceği ortamı belirleyin

4. **Ahlaki Değer Seçimi**

   - Hikayede vurgulanacak değerleri belirleyin (arkadaşlık, dürüstlük, vb.)

5. **Hikaye Seçenekleri**

   - Hikaye uzunluğu, yardımcı karakterler ve özel öğeler ekleyin

6. **Önizleme**

   - Hikayenizi gözden geçirin ve tamamlayın

7. **Hikayeyi Okuyun**
   - Oluşturulan hikayeyi okuyun veya dinleyin

## 💻 Teknolojiler

- **React Native**: Çapraz platform mobil uygulama geliştirme
- **TypeScript**: Tip güvenliği
- **React Navigation**: Ekranlar arası gezinme
- **Styled Components**: Stil yönetimi
- **React Native Reanimated**: Animasyonlar
- **React Native Sound**: Ses efektleri

## 🎨 Ekran Görüntüleri

| Ana Ekran                                 | Karakter Seçimi                                      | Tema Seçimi                                  | Ahlaki Değer Seçimi                                  |
| ----------------------------------------- | ---------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| ![Ana Ekran](assets/screenshots/home.png) | ![Karakter Seçimi](assets/screenshots/character.png) | ![Tema Seçimi](assets/screenshots/theme.png) | ![Ahlaki Değer Seçimi](assets/screenshots/moral.png) |

| Hikaye Seçenekleri                                    | Hikaye Önizleme                                    | Hikaye Okuma                                    |
| ----------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| ![Hikaye Seçenekleri](assets/screenshots/options.png) | ![Hikaye Önizleme](assets/screenshots/preview.png) | ![Hikaye Okuma](assets/screenshots/reading.png) |

## 👥 Katkıda Bulunma

1. Projeyi fork edin
2. Özellik dalı oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik: Açıklama'`)
4. Dalınıza push edin (`git push origin yeni-ozellik`)
5. Pull Request oluşturun

## 📘 Mimari

Uygulama aşağıdaki klasör yapısına sahiptir:

```
StoryApp/
├── src/
│   ├── components/     # Yeniden kullanılabilir UI bileşenleri
│   ├── screens/        # Uygulama ekranları
│   │   ├── home/       # Ana ekran
│   │   └── story-steps/# Hikaye oluşturma adımları
│   ├── constants/      # Sabit değerler ve tipler
│   ├── navigation/     # Gezinme ayarları
│   ├── utils/          # Yardımcı fonksiyonlar
│   └── hooks/          # Özel React Hooks
├── assets/            # Resimler, fontlar ve diğer statik dosyalar
└── ...
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

Herhangi bir soru veya geri bildirim için lütfen [email@example.com](mailto:email@example.com) adresine e-posta gönderin.

---

Çocukların hayal gücünü geliştirmek ve değerleri öğretmek için tasarlanmıştır. ❤️
