# 🎥 YouTube Video Qo'llanma

## ✅ Nima qo'shildi?

Har bir mavzu uchun **YouTube video dars** funksiyasi qo'shildi!

## 📍 Video qayerda ko'rinadi?

Video **"Qiziqarli faktlar"** bo'limidan keyin, **Faoliyat tugmalari** (Test, Moslashtir, To'g'ri/Yo'q, So'z qo'sh) dan oldin joylashgan.

## 🔗 Video URL qanday qo'shiladi?

### 1. Mavzu ma'lumotlarida videoUrl maydonini to'ldiring

`src/App.tsx` faylida har bir mavzu uchun `videoUrl` maydoni bor:

```typescript
{
  id: 1,
  title: "Men haqimda",
  subtitle: "O'zimni o'rganaman",
  description: "...",
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_SHUNGA", // ← Shu yerga
  facts: [...],
  // ...
}
```

### 2. Qo'llab-quvvatlanadigan YouTube URL formatlari

Funksiya quyidagi barcha formatlarni qabul qiladi:

✅ `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
✅ `https://youtu.be/dQw4w9WgXcQ`
✅ `https://www.youtube.com/embed/dQw4w9WgXcQ`
✅ `https://www.youtube.com/v/dQw4w9WgXcQ`
✅ `dQw4w9WgXcQ` (faqat video ID)

### 3. Misol

```typescript
// Mavzu 1
videoUrl: "https://www.youtube.com/watch?v=abc123xyz"

// Mavzu 2
videoUrl: "https://youtu.be/def456uvw"

// Mavzu 3
videoUrl: "ghi789rst" // Faqat ID ham ishleydi
```

## 🎯 Xususiyatlari

- ✅ **Avtomatik ID ajratish** - Har qanday YouTube formatini qabul qiladi
- ✅ **Responsive dizayn** - Mobil va desktop qurilmalarda mukammal ko'rinadi
- ✅ **16:9 aspect ratio** - Professional video o'lcham
- ✅ **Clean embed** - Keraksiz reklamalar va tavsiyalar yo'q
- ✅ **Fullscreen support** - To'liq ekranda ko'rish imkoniyati

## 🚀 Qanday ishlatish?

1. **YouTube dan video tanlang**
2. **Video URL ni nusxalang** (Address bar dan yoki "Share" tugmasi orqali)
3. **App.tsx da tegishli mavzuga qo'shing**
4. **Saqlang va sahifani yangilang** - Video avtomatik ko'rinadi!

## 📝 Eslatma

Agar `videoUrl` bo'sh bo'lsa yoki noto'g'ri format bo'lsa, video bo'limi ko'rinmaydi.

## 🎨 Dizayn

Video quti:
- Oq fonli yumaloq konteyner
- Shadow effekt
- Hover animatsiyasi
- "🎥 Video Dars" sarlavhasi

## 🔧 Texnik Ma'lumotlar

**Funksiya:** `getYouTubeVideoId(url: string): string | null`

Bu funksiya:
- YouTube URL dan video ID ni ajratib oladi
- 11 belgili video ID ni qaytaradi
- Agar URL noto'g'ri bo'lsa, `null` qaytaradi

**Embed URL formati:**
```
https://www.youtube.com/embed/VIDEO_ID?rel=0&modestbranding=1
```

- `rel=0` - oxirida boshqa videolar ko'rsatilmaydi
- `modestbranding=1` - YouTube logosi minimallashtirish

---

**Omad tilaymiz! 🚀📚**
