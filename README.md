# 📝 Medyanes Todo App

**Full Stack Todo Uygulaması** - Next.js 15, MongoDB Atlas, Prisma ve Zustand ile geliştirilmiş modern web uygulaması.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Prisma](https://img.shields.io/badge/Prisma-6.11.1-blue?style=for-the-badge&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## 🎯 Proje Hakkında

Bu proje, Medyanes firması için geliştirilmiş full stack bir todo uygulamasıdır. Modern web teknolojileri kullanılarak, kullanıcıların görevlerini yönetebileceği, CRUD operasyonlarının gerçekleştirilebildiği responsive bir uygulama geliştirilmiştir.

## 📷 Screenshots

### 🖥️ Desktop View
![Homepage](./images/homepage.png)
*Modern ve kullanıcı dostu ana sayfa tasarımı*

![Todo Management](./images/todo-list.png)
*Gelişmiş todo yönetim arayüzü*

### 📱 Mobile Responsive
![Mobile View](./images/responsive-mobile.png)
*Mobil cihazlar için optimize edilmiş tasarım*

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

### 🔐 Authentication Durumu
**Not**: Authentication sistemi projenin scope'unda planlanmış ancak core functionality'ye öncelik verilerek stability için implementation edilmemiştir. Tüm CRUD operasyonları authentication olmadan demo amaçlı mükemmel çalışmaktadır.

## 🚧 Future Improvements (Planlanan Geliştirmeler)

- [ ] **NextAuth.js Integration**: Kullanıcı authentication sistemi
- [ ] **User-Specific Todos**: Kullanıcı bazlı todo yönetimi
- [ ] **Protected Routes**: Route koruma ve yetkilendirme
- [ ] **User Profiles**: Kullanıcı profil yönetimi
- [ ] **Advanced Filtering**: Gelişmiş todo filtreleme seçenekleri
- [ ] **Dark Mode**: Koyu tema desteği
- [ ] **Todo Categories**: Todo kategorilendirme sistemi

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
git clone https://github.com/AleynaaCelik/medyanes-todo.git
cd medyanes-todo
