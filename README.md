# 🎬 CinemaHub - Movie Ticketing App

Complete Cinema booking application with Football App architecture and Cinema features.

## 📱 Features

✅ **Start/SignIn/SignUp** - Authentication screens
✅ **Home Screen** - Movies with time, language, price, and add to cart
✅ **Favorites** - Save favorite movies
✅ **Notifications** - Movie updates and booking confirmations
✅ **Profile** - User profile and statistics
✅ **Shopping Cart** - Add movies to cart with badge counter
✅ **Dark Theme** - Optimized for dark mode

## 🎨 Design

- **Colors**: #E8254F (Primary), #8B7FE8 (Secondary), #0F172A (Background)
- **Navigation**: Bottom tab navigation
- **Architecture**: Football App's structure with Cinema features

## 🚀 Quick Start

```bash
npm install
npm start

# Choose platform
# 'a' for Android
# 'i' for iOS
# 'w' for Web
```

## 📂 Project Structure

```
src/
├── app/
│   ├── SignIn/          (Login)
│   ├── SignUp/          (Registration)
│   ├── cinema-navbar/   (Main navigation)
│   │   ├── home.tsx     (Movies with cart)
│   │   ├── favorites.tsx
│   │   ├── notifications.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx      (Root)
│   └── index.tsx        (Entry)
├── context/             (Theme)
├── hooks/               (Custom hooks)
├── types/               (TypeScript)
├── constants/           (Colors)
└── components/          (Reusable)
```

## 🎯 Screens

### 1. SignIn
- Email & password login
- Navigation to SignUp

### 2. SignUp
- Full registration form
- Form validation

### 3. Home (MAIN)
Each movie shows:
- Title & genre
- ⭐ Star rating
- ⏰ Show time
- 🌐 Language
- 💰 Price
- 🛒 Add to Cart button

### 4. Favorites
- Saved movies collection
- Heart icon indicator

### 5. Notifications
- Movie updates
- Booking confirmations

### 6. Profile
- User avatar and info
- Settings & Logout
- Statistics

## 🛒 Shopping Cart

- Red badge shows item count
- Located in header
- Increments real-time
- Updates when clicking "Add to Cart"

## 💻 Tech Stack

- Framework: React Native
- Platform: Expo
- Router: Expo Router
- Language: TypeScript
- Styling: StyleSheet + Linear Gradient
- Icons: Expo Vector Icons

## 📋 Installation

```bash
npm install
npm start
```

## 🎯 Key Features

- **Form Separation**: SignIn/SignUp forms in components/screen/Auth/
- **Screen Separation**: Each screen is in app/ directory
- **Reusable Forms**: Forms can be used in different contexts
- **Clean Architecture**: Football App's proven structure
- **Dark Theme**: Beautiful dark mode design
- **TypeScript**: Fully typed application

## ✅ Ready to Use!

- All screens implemented
- All features working
- Beautiful dark theme
- Easy to customize
- Ready to deploy

---

**CinemaHub - Complete and Ready!** 🎬✨
