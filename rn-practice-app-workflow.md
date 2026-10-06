# React Native Practice App — Step-by-Step Workflow

A learn-by-building plan. Each step adds one new concept (auth, navigation, device data, camera, location, real-time). Do them in order — don't skip ahead.

**Suggested names to consider** (verify availability yourself on Play Store / App Store / domain checker before committing):
Guardio Lens · Nestwatch RN · KinOrbit · Hearthview · PairSentry · Homeflicker

---

## Step 0 — Environment Setup
- [ ] Install Node, Watchman, Android Studio (+ emulator) and/or Xcode
- [ ] `npx react-native init YourAppName` (or Expo if you want a gentler start: `npx create-expo-app`)
- [ ] Run the app on emulator/simulator to confirm the base setup works
- [ ] Set up a GitHub repo, commit the empty scaffold

**UI screen:** none yet — this is just the blank starter app running.

---

## Step 1 — Navigation Skeleton
- [ ] Install `@react-navigation/native` + stack navigator
- [ ] Create a basic stack: `Splash → Login → SignUp → Home`
- [ ] Each screen can just be a placeholder with a title for now

**UI screens:**
- Splash Screen (logo + loading spinner)
- Login Screen (email, password, "Sign In" button, "Go to Sign Up" link)
- Sign Up Screen (name, email, password, "Create Account" button)
- Home Screen (blank placeholder, "Logout" button)

---

## Step 2 — Backend: Auth API
- [ ] Set up a small backend: Node + Express + MongoDB (or use Firebase Auth if you want to skip backend-building for now)
- [ ] Endpoints: `POST /signup`, `POST /login`, `GET /me`
- [ ] Password hashing with bcrypt, JWT issued on login
- [ ] Test endpoints with Postman/Insomnia before touching the app

**No new UI** — this step is pure backend.

---

## Step 3 — Connect Login/Signup to Backend
- [ ] Add `axios` or `fetch` calls from Sign Up/Login screens to your API
- [ ] Store JWT in `AsyncStorage` (or `react-native-keychain` for more security)
- [ ] On app launch, check for stored token → skip Login if already signed in
- [ ] Add loading and error states to both forms

**UI states to add:**
- Login/Sign Up: loading spinner on submit, inline error message (wrong password, email taken, etc.), disabled button while submitting
- Splash: "checking session" state before deciding to show Login or Home

---

## Step 4 — Home Screen & Basic Profile
- [ ] Home screen fetches `/me` and displays the user's name/email
- [ ] Add a simple Profile screen (view info, logout button)
- [ ] Add pull-to-refresh or a loading skeleton while data loads

**UI screens:**
- Home Screen (welcome message, nav to Profile)
- Profile Screen (user info, Logout button)
- Empty/Loading/Error states for data fetching

---

## Step 5 — Device Info (practice with native modules)
- [ ] Install `react-native-device-info`
- [ ] Display battery level, device model, OS version on a new screen
- [ ] This is a good low-risk way to practice calling native APIs from JS

**UI screen:**
- Device Info Screen (simple list: battery %, model, OS version)

---

## Step 6 — Camera Basics
- [ ] Install `react-native-vision-camera`
- [ ] Request camera permission (handle granted/denied states properly)
- [ ] Build a screen that opens the camera and lets you take a photo
- [ ] Display the captured photo after taking it

**UI screens:**
- Camera Screen (live preview, capture button, front/back toggle)
- Permission Denied state (explain why it's needed, button to open Settings)
- Photo Preview Screen (captured image, Retake / Save buttons)

---

## Step 7 — Location Basics
- [ ] Install `react-native-geolocation-service` (or `expo-location`)
- [ ] Request location permission, fetch current position
- [ ] Show it on a simple map (`react-native-maps`)

**UI screens:**
- Location Screen (map with current-location marker)
- Permission Denied state (same pattern as camera)

---

## Step 8 — Save Photos & Location to Backend
- [ ] Add backend endpoints to upload a photo (multipart/form-data → cloud storage or local disk for practice) and save a location ping
- [ ] Connect the Camera and Location screens to these endpoints
- [ ] Add an upload progress indicator

**UI states to add:**
- Upload progress bar/spinner on Camera and Location screens
- Success/failure toast after upload

---

## Step 9 — List & History Screens
- [ ] Backend endpoint: `GET /photos`, `GET /locations`
- [ ] Build a simple gallery grid for saved photos
- [ ] Build a simple list/timeline for location history

**UI screens:**
- Gallery Screen (grid of thumbnails, tap to view full size)
- Location History Screen (list of past pings with timestamp)
- Empty state for both ("Nothing here yet")

---

## Step 10 — Real-Time Practice (optional, more advanced)
- [ ] Add Socket.io to backend and app
- [ ] Practice a simple real-time feature: e.g., a live "online now" badge on the Profile screen that updates without refreshing
- [ ] This is good prep if you later want to build live streaming features

**UI addition:**
- Online/Offline badge component, reused across screens

---

## Step 11 — Polish
- [ ] Add a proper theme (colors, spacing, fonts) instead of default styles
- [ ] Add global error boundary / fallback screen
- [ ] Add app icon and splash screen branding
- [ ] Test on both Android and iOS if possible

---

### How to use this
Work through Step 0 → Step 11 in order. Each step should be small enough to finish and test in one sitting before moving to the next — that's the point of a practice project. Don't start Step 6 (camera) until Steps 1–4 (navigation + auth) work end-to-end; the native-module steps are much easier to debug once you already trust your basic app shell.
