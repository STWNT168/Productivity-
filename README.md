# ⚔️ Warrior Scheduler AI

A black/gold/dark-red, samurai–viking–spartan themed daily mission planner: schedule manager, Pomodoro/custom/stopwatch timer, daily tracking, gamified XP/ranks, warrior quotes, nightly journal review, and offline-first data storage. Built as a Progressive Web App that can be wrapped into an installable Android APK with Capacitor.

## Files (all flat, no subfolders)

- `index.html` — full app: HTML + CSS + JS, no external dependencies
- `manifest.json` — PWA install manifest (name, icons, theme colors)
- `service-worker.js` — offline caching so the app works with no internet
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon-32.png` — app icons
- `capacitor.config.json` — Android app config (package id, splash, notifications)
- `package.json` — build scripts for the APK
- `README.md` — this file

**Important:** keep all of these files together in the same folder — `index.html` loads `manifest.json`, `service-worker.js`, and the icon files by filename from wherever it lives.

All app data (missions, XP, streaks, tracking, journal) is stored in the browser's `localStorage` on-device — nothing is sent to a server, and everything works with no internet connection.

## Option A — Just use it as a website / installable PWA (easiest)

1. Put all the files above in one folder, then open `index.html` directly in any modern mobile browser (Chrome, Safari, Edge).
2. On Android Chrome: tap the **⋮ menu → "Add to Home screen"**. On iOS Safari: tap **Share → "Add to Home Screen"**.
3. It now behaves like an app icon on the home screen, opens full-screen, and works offline (after the first load, thanks to `service-worker.js`).

If you want to host it (so "Add to Home Screen" and the service worker work reliably), upload all the files to any static host — GitHub Pages, Netlify, Vercel, Firebase Hosting — and open the hosted URL once with internet on to let it cache itself.

## Setting up for Option B (Capacitor)

Capacitor expects the web app in a `www/` folder. Before running the commands below, create that folder and move `index.html`, `manifest.json`, `service-worker.js`, and the icon files into it (keep `capacitor.config.json` and `package.json` at the top level, next to `www/`).

## Option B — Build a real installable Android APK with Capacitor

Requires [Node.js](https://nodejs.org) and [Android Studio](https://developer.android.com/studio) (for the Android SDK) installed on your computer.

```bash
# 1. Install dependencies
cd warrior-scheduler
npm install

# 2. Add the Android platform (creates an /android folder)
npm run add:android

# 3. Copy the web app into the native project
npm run sync

# 4. Open in Android Studio to build/sign/run on a device or emulator
npm run open:android
```

From Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**. The debug APK will appear under `android/app/build/outputs/apk/debug/app-debug.apk` — install it on any Android device.

Or build from the command line once the `android/` folder exists:

```bash
npm run build:apk
```

### Changing the app icon or name
- App name / package ID: edit `capacitor.config.json` (`appName`, `appId`) before running `add:android`.
- Icons: replace the PNGs in `www/icons/`, then regenerate Android launcher icons using Android Studio's **Image Asset Studio** (right-click `res` folder → New → Image Asset) for crisp multi-density icons.

## Notes & honest limitations

- **Notifications & alarms**: the app schedules in-app notifications and a fullscreen alarm while it's open. For alarms/notifications that fire reliably when the app is closed or the phone is locked, you'll want to add the `@capacitor/local-notifications` plugin's native scheduling (already listed in `package.json`) and wire it up in place of the browser `Notification` calls in `index.html` — that requires the native Android build (Option B), since browsers can't guarantee background alarms.
- **Biometric lock / fingerprint**: not included yet. Add `@capacitor/local-authentication` or `capacitor-native-biometric` if you want a PIN/fingerprint gate.
- **Cloud backup**: not included. Use the built-in **Export Backup / Import Backup** buttons (JSON file) for manual backup, or wire up Google Drive via a Capacitor plugin later.
- Everything else in the original feature brief (schedule CRUD, import parser, timers, tracking, analytics chart, gamification, journal, offline support) is implemented and working in `www/index.html`.
