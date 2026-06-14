# ClickInt (Turf Booking + Live Scoring)

ClickInt is an Expo + React Native app for discovering cricket turfs, booking time slots, and running live match scoring.

## Tech Stack

- Expo Router (file-based navigation)
- React Native + TypeScript
- NativeWind (Tailwind-style utility classes)
- Zustand (lightweight client state stores)
- Lucide React Native (icons)

## Features Implemented

- Phone/OTP-style authentication flow (mocked)
- Profile setup onboarding
- Turf discovery and turf details view
- Slot selection and booking price calculation
- Booking confirmation and booking management flow
- Match setup and live scoring interface
- Rules and policy content screens

## Project Structure

```text
app/                Route-driven screens (Expo Router)
components/ui/      Shared UI primitives (Button, Input)
store/              Zustand stores (user, turf, match)
types/              Centralized domain schema and interfaces
```

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the Expo development server

```bash
npm run start
```

3. Run on a target platform

```bash
npm run ios
npm run android
npm run web
```

## Development Scripts

- `npm run start` - Start Expo dev server
- `npm run ios` - Open iOS simulator build
- `npm run android` - Open Android emulator/device build
- `npm run web` - Run web target
- `npm run lint` - Run project lint checks

## Notes on Data

- Current booking, user, turf, and scoring data is mock-backed in local stores.
- Store APIs are intentionally organized so they can be migrated to backend services with minimal screen-level changes.

## Code Quality Conventions

- Keep domain models centralized in `types/schema.ts`.
- Keep UI primitives reusable and stateless where possible.
- Prefer store actions for business logic over embedding logic inside screens.
- Use clear file-level comments for maintainability and team onboarding.

## Next Recommended Steps

- Add backend integration for auth, bookings, and scoring events.
- Add unit tests for pricing and scoring logic.
- Add E2E coverage for booking and live scoring flows.
