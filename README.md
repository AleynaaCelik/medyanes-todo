# 📝 Medyanes Todo App

**Full Stack Todo Uygulaması** - Next.js 15, MongoDB Atlas, Prisma ve Zustand ile geliştirilmiş modern web uygulaması.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Prisma](https://img.shields.io/badge/Prisma-6.11.1-blue?style=for-the-badge&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## 🎯 Proje Hakkında

Bu proje, Medyanes firması için geliştirilmiş full stack bir todo uygulamasıdır. Modern web teknolojileri kullanılarak, kullanıcıların görevlerini yönetebileceği, CRUD operasyonlarının gerçekleştirilebildiği responsive bir uygulama geliştirilmiştir.

## ✨ Özellikler

### 🔥 Temel Özellikler
- ✅ **Todo Ekleme**: Yeni görev oluşturma
- ✅ **Todo Listeleme**: Tüm görevleri görüntüleme
- ✅ **Todo Güncelleme**: Görev durumunu değiştirme (tamamlandı/tamamlanmadı)
- ✅ **Todo Silme**: Gereksiz görevleri kaldırma
- ✅ **Real-time Sync**: Frontend ve database arasında anlık senkronizasyon
- ✅ **Responsive Design**: Mobil ve desktop uyumlu tasarım

### 🛠️ Teknik Özellikler
- **Clean Architecture**: Component bazlı modüler yapı
- **TypeScript**: Tip güvenliği ve kod kalitesi
- **Server-Side API**: Next.js API routes ile backend işlemleri
- **Modern State Management**: Zustand ile global state yönetimi
- **Database Integration**: MongoDB Atlas ile cloud database
- **ORM**: Prisma ile type-safe database işlemleri

## 🏗️ Teknoloji Stack

### Frontend
- **Next.js 15**: React framework (App Router)
- **TypeScript**: Statik tip kontrolü
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management

### Backend
- **Next.js API Routes**: Server-side endpoints
- **Prisma**: Database ORM ve type generation

### Database
- **MongoDB Atlas**: Cloud database servisi
- **Prisma Client**: Type-safe database client

### Geliştirme Araçları
- **ESLint**: Kod kalitesi kontrolü
- **VS Code**: IDE ve eklentiler

## 🚀 Kurulum ve Çalıştırma

### Ön Koşullar
- Node.js (v18+)
- npm veya yarn
- MongoDB Atlas hesabı

### 1. Projeyi Klonlayın
```bash
git clone [REPO_URL]
cd medyanes-todo
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Environment Variables
`.env` dosyası oluşturun:
```env
DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/medyanes-todo?retryWrites=true&w=majority"
```

### 4. Database Schema
```bash
npx prisma generate
npx prisma db push
```

### 5. Development Server
```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## 📁 Proje Yapısı

```
medyanes-todo/
├── src/
│   └── app/
│       ├── api/
│       │   └── todos/
│       │       ├── route.ts              # CRUD API endpoints
│       │       └── [id]/
│       │           └── route.ts          # Single todo operations
│       ├── components/
│       │   ├── TodoList.tsx              # Todo listesi komponenti
│       │   └── AddTodoForm.tsx           # Todo ekleme formu
│       ├── lib/
│       │   └── prisma.ts                 # Database bağlantısı
│       ├── store/
│       │   └── todoStore.ts              # Zustand state management
│       ├── types/
│       │   └── todo.ts                   # TypeScript tip tanımları
│       ├── layout.tsx                    # Ana layout
│       ├── page.tsx                      # Ana sayfa
│       └── globals.css                   # Global stiller
├── prisma/
│   └── schema.prisma                     # Database schema
├── .env                                  # Environment variables
└── package.json                          # Proje konfigürasyonu
```

## 🔄 API Endpoints

### Todos Collection
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| `GET` | `/api/todos` | Tüm todo'ları listele |
| `POST` | `/api/todos` | Yeni todo oluştur |
| `GET` | `/api/todos/[id]` | Tek todo getir |
| `PUT` | `/api/todos/[id]` | Todo güncelle |
| `DELETE` | `/api/todos/[id]` | Todo sil |

### Örnek Request/Response

**POST /api/todos**
```json
{
  "title": "Yeni görev"
}
```

**Response**
```json
{
  "id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "title": "Yeni görev",
  "completed": false,
  "createdAt": "2025-07-05T18:05:04.347Z",
  "updatedAt": "2025-07-05T18:05:04.347Z"
}
```

## 🧪 Geliştirme Süreci ve Öğrenmeler

### 🎯 Başlangıç Durumu
Bu projeye Next.js konusunda sınırlı deneyimle başladım. React bilgim vardı ancak Next.js 15'in App Router yapısı, server components ve API routes konularında araştırma yaparak öğrendim.

### 🔍 Araştırma ve Öğrenme Süreci

#### 1. Next.js 15 App Router
- **Zorluk**: Klasik pages router'dan farklı olan yeni App Router yapısını anlama
- **Çözüm**: Next.js resmi dokümantasyonunu inceleyerek, file-system based routing mantığını kavradım
- **Öğrenim**: `page.tsx`, `layout.tsx`, `route.ts` dosyalarının rollerini öğrendim

#### 2. TypeScript Integration
- **Zorluk**: Props tiplerini, interface'leri ve generic type'ları doğru kullanma
- **Çözüm**: TypeScript dokümantasyonu ve Next.js TypeScript rehberini takip ettim
- **Öğrenim**: Type safety'nin debugging sürecinde ne kadar değerli olduğunu anladım

#### 3. State Management ile Zustand
- **Zorluk**: Redux'a alternatif olarak Zustand'ı ilk kez kullanma
- **Çözüm**: Zustand'ın minimalist API'sini öğrenerek, store pattern'ini uyguladım
- **Öğrenim**: Zustand'ın Redux'a göre ne kadar basit ve etkili olduğunu keşfettim

### 🐛 Karşılaştığım Başlıca Sorunlar ve Çözümler

#### 1. Module Not Found: Zustand
**Sorun**: `Cannot resolve 'zustand'` hatası
```bash
Module not found: Can't resolve 'zustand'
```
**Çözüm**: Paket eksikliğini fark ederek kurulum yaptım
```bash
npm install zustand
```
**Öğrenim**: Development sürecinde dependency management'ın önemini anladım

#### 2. MongoDB Bağlantı Sorunu
**Sorun**: Local MongoDB ile replica set hatası
```
Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set
```
**Çözüm**: Local MongoDB yerine MongoDB Atlas (cloud) kullanmaya karar verdim
**Öğrenim**: Production ortamı için cloud database çözümlerinin avantajlarını keşfettim

#### 3. Prisma Configuration
**Sorun**: MongoDB Atlas connection string konfigürasyonu
**Çözüm**: 
- Atlas üzerinden doğru connection string formatını öğrendim
- Environment variables kullanarak güvenli konfigürasyon yaptım
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"
```
**Öğrenim**: Database security best practices'lerini uyguladım

#### 4. API Routes Debugging
**Sorun**: 500 Internal Server Error'ları
**Çözüm**: Console.log ekleyerek debug süreci oluşturdum
```typescript
try {
  console.log('POST başladı')
  const body = await request.json()
  console.log('Body:', body)
  // ... rest of code
} catch (error) {
  console.error('POST Error:', error)
}
```
**Öğrenim**: Systematic debugging yaklaşımının önemini anladım

### 💡 Öne Çıkan Öğrenimler

1. **Next.js App Router**: File-system based routing'in gücünü keşfettim
2. **Server Components vs Client Components**: "use client" direktifinin ne zaman kullanılacağını öğrendim
3. **API Route Patterns**: RESTful API design patterns'ini Next.js ile uyguladım
4. **TypeScript Integration**: Type safety'nin development experience'i nasıl iyileştirdiğini deneyimledim
5. **Cloud Database**: MongoDB Atlas'ın development sürecini nasıl hızlandırdığını gördüm

### 🔧 Development Workflow

1. **Research First**: Her yeni teknoloji için önce resmi dokümantasyonu okudum
2. **Incremental Development**: Küçük parçalar halinde geliştirerek test ettim
3. **Error-Driven Learning**: Hatalardan yola çıkarak çözüm araştırdım
4. **Real-time Testing**: Her özelliği geliştirdikten sonra browser'da test ettim

## 🎨 UI/UX Kararları

- **Minimalist Design**: Odaklanmayı artırmak için sade tasarım
- **Tailwind CSS**: Rapid prototyping için utility-first approach
- **Responsive Layout**: Mobile-first design principles
- **User Feedback**: Loading states ve user actions için immediate feedback

## 🔧 Kullanılan Development Tools

- **VS Code**: Ana IDE
- **MongoDB Compass**: Local database management
- **MongoDB Atlas**: Cloud database ve monitoring
- **Browser DevTools**: Frontend debugging
- **Git**: Version control

## 🚀 Deployment Hazırlığı

Proje Vercel'e deploy edilmeye hazır durumda:
- Environment variables konfigürasyonu tamamlandı
- Build optimizasyonları yapıldı
- Database connection production-ready

## 📚 Kaynaklar ve Referanslar

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Prisma MongoDB Guide](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

## 👨‍💻 Geliştirici Notları

Bu proje, modern web development stack'ini öğrenme ve uygulama konusunda değerli bir deneyim oldu. Next.js 15'in App Router yapısı, TypeScript integration ve MongoDB Atlas ile cloud database kullanımı gibi konularda pratik deneyim kazandım.

---

**Geliştirme Tarihi**: Temmuz 2025  
**Teknoloji Stack**: Next.js 15, TypeScript, MongoDB Atlas, Prisma, Zustand  
**Durum**: Production Ready ✅
#   F o r c e   d e p l o y   0 7 / 0 7 / 2 0 2 5   2 0 : 5 6 : 5 4  
 