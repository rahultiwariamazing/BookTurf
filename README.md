# 🏏 BookTurf

BookTurf is a React Native (Expo) mobile application designed for cricket enthusiasts to discover turfs, book playing slots, manage bookings, organize matches, and perform live ball-by-ball scoring from a single platform.

The project currently represents an MVP (Minimum Viable Product) focused on delivering a complete user journey from authentication to turf booking and live match scoring.

---

## 🚀 Overview

BookTurf simplifies local cricket management by combining:

- Turf discovery
- Slot booking
- Dynamic pricing calculations
- Booking management
- Match setup
- Live cricket scoring

The application follows a modern Expo Router architecture with Zustand-based state management and TypeScript support.

---

## ✨ Key Features

### 🔐 Authentication & Onboarding
- Phone number login flow
- OTP verification (mock implementation)
- Profile setup onboarding
- User profile creation

### 🏟️ Turf Discovery
- Browse available cricket turfs
- View turf details
- Explore amenities and pricing
- Dynamic turf routing

### 📅 Slot Booking System
- Multi-slot booking
- Date selection
- Time-slot selection
- Availability handling
- Booking flow navigation

### 💰 Dynamic Pricing Engine
- Per-slot pricing
- Per-player pricing
- Scoreboard add-ons
- Recording add-ons
- Automatic price calculation

### 📋 Booking Management
- Booking history
- Booking details
- Booking management dashboard
- Match setup integration

### 🏏 Match Management
- Match setup workflow
- Toss selection
- Over configuration
- Match initialization

### 📊 Live Cricket Scoring
- Ball-by-ball scoring
- Runs and extras
- Wicket tracking
- Strike rotation
- Over management
- New batsman selection

### 📖 Rules & Policies
- Static rules section
- User guidance
- Application policies

### 🏆 Tournament Module
- Tournament tab structure
- Placeholder for future implementation

---

## 📱 User Journey

```text
Launch
↓
Login
↓
OTP Verification
↓
Profile Setup
↓
Home
↓
Turf Details
↓
Slot Selection
↓
Booking Setup
↓
Booking Success
↓
My Bookings
↓
Manage Booking
↓
Match Setup
↓
Live Scoring
```

---

## 🏗️ Architecture

### Current Architecture

```text
UI Screens
↓
Expo Router
↓
Zustand Stores
↓
Domain Models
↓
Mock Data Layer
```

### State Management

```text
Screens
↓
Zustand Stores
├── userStore
├── turfStore
└── matchStore
```

### Routing

```text
Expo Router
├── Authentication
├── Tabs
│   ├── Home
│   ├── Bookings
│   ├── Tournaments
│   └── Profile
├── Turf Details
├── Booking Flow
└── Scoring Flow
```

---

## 📂 Project Structure

```text
app/
├── (tabs)/
│   ├── home.tsx
│   ├── bookings.tsx
│   ├── tournaments.tsx
│   └── profile.tsx
│
├── auth/
│   └── setup.tsx
│
├── booking/
│   ├── slots.tsx
│   ├── setup.tsx
│   ├── success.tsx
│   └── [id]/manage.tsx
│
├── scoring/
│   ├── setup.tsx
│   └── live.tsx
│
├── turf/
│   └── [id].tsx
│
└── content/
    └── rules.tsx

components/
└── ui/
    ├── Button.tsx
    └── Input.tsx

store/
├── userStore.ts
├── turfStore.ts
└── matchStore.ts

types/
└── schema.ts

docs/
└── PROJECT_DETAILS.md
```

---

## 🧩 Core Modules

### User Management
Handles:

- Login
- OTP verification
- Profile onboarding
- User session state

### Turf Management
Handles:

- Turf listings
- Turf details
- Amenities
- Pricing configuration

### Booking System
Handles:

- Date selection
- Time slot selection
- Pricing calculations
- Booking workflow

### Match Management
Handles:

- Match creation
- Toss logic
- Overs configuration
- Match state

### Live Scoring
Handles:

- Run tracking
- Extras
- Wickets
- Over progression
- Strike rotation

---

## 📊 State Management

The application uses **Zustand** for state management.

### userStore

Responsible for:

- User information
- Login actions
- Profile updates
- Logout actions

### turfStore

Responsible for:

- Turf catalog
- Turf details
- Turf settings
- Turf lookup operations

### matchStore

Responsible for:

- Match lifecycle
- Live scoring
- Strike handling
- Wicket management
- Over progression

---

## 🎨 UI & Design

### Design System

Built with:

- NativeWind
- Tailwind CSS
- Expo Router
- React Native

### Theme Colors

```text
Turf Green      #006400
Light Green     #2E7D32
Dark Green      #003300

Cricket Red     #D32F2F
Ball Red        #B71C1C
```

### Shared Components

#### Button
Reusable button system supporting:

- Primary
- Secondary
- Outline
- Danger

#### Input
Reusable form input supporting:

- Labels
- Errors
- Icons
- Validation UI

---

## 🛠️ Technology Stack

### Mobile Framework

- React Native
- Expo SDK
- Expo Router

### Programming Language

- TypeScript

### State Management

- Zustand

### Styling

- NativeWind
- Tailwind CSS

### Navigation

- Expo Router

### Icons

- Lucide React Native

---

## 📌 Current MVP Status

### ✅ Completed

- Authentication Flow (Mock)
- Profile Setup
- Turf Discovery
- Turf Details
- Slot Selection
- Booking Setup
- Dynamic Pricing
- Booking Success Flow
- Booking Management UI
- Match Setup
- Live Cricket Scoring
- Profile Module
- Rules & Policy Screen
- Zustand Architecture
- Expo Router Navigation

### ⚠️ Partially Implemented

- Booking Lifecycle Persistence
- Match Lifecycle Management
- Scoring Engine Enhancements

### ❌ Not Implemented Yet

- Real Backend APIs
- Real OTP Authentication
- Secure Session Management
- Online Payments
- Booking Database
- Tournament Management
- Notifications
- Analytics
- Push Notifications
- Admin Panel

---

## 🔮 Future Roadmap

### High Priority

- Real Authentication
- Booking Backend
- Payment Integration
- Route Protection
- Scoring Engine Completion

### Medium Priority

- Tournament Management
- API Layer Abstraction
- Test Coverage
- Player Management

### Low Priority

- Notifications
- Analytics
- Offline Support
- Performance Monitoring

---

## 📖 Documentation

Detailed technical documentation is available in:

```text
docs/PROJECT_DETAILS.md
```

This document includes:

- Architecture
- Routing
- Components
- Stores
- Models
- Business Logic
- Dependencies
- Future Roadmap

---

## 👨‍💻 Developer

**Rahul Tiwari**

**Mobile Architect | Cloud & AI Enthusiast**

.NET • MAUI • React Native • Flutter • Azure • Firebase • AI

---

## 📄 License

Copyright © 2026 Rahul Tiwari

All Rights Reserved.

Unauthorized use, modification, distribution, reproduction, or commercial use of this software is prohibited without prior written permission from the copyright holder.