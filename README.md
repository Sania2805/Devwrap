# 🏥 VitalCheck – Safe Dose Guard

A smart **AI-inspired safety interface** designed to prevent critical medication dosage errors in high-pressure medical environments.

---

## 🚨 Problem

Medical professionals often work under extreme fatigue, increasing the risk of **dangerous dosage mistakes** (e.g., 10× overdose due to decimal errors).

Such small input errors can lead to **life-threatening consequences**, especially in pediatric care.

---

## 💡 Solution

**VitalCheck – Safe Dose Guard** acts as an intelligent safety layer between the nurse and the patient.

Instead of passively accepting inputs, the system:
- Actively **blocks unsafe dosage**
- Monitors **patient vitals in real-time**
- Enforces **verification protocols**
- Provides **dynamic visual risk feedback**

---

## ✨ Key Features

### 🧠 Active Guardrail Engine
- Automatically calculates **safe dosage limits** based on patient weight
- Prevents overdose by:
  - Clamping values
  - Blocking unsafe inputs

---

### ❤️ Vital Sign Interlock
- Continuously monitors heart rate
- If heart rate drops below threshold:
  - 🔒 Entire system locks instantly
  - All actions are disabled

---

### 👩‍⚕️ Two-Nurse Verification Protocol
- High-risk medications require:
  - **Shift + Click** confirmation
- Prevents accidental administration

---

### 🎨 Progressive Risk UI
Dynamic interface feedback based on dosage:

| State | Behavior |
|------|--------|
| Safe | Green glow |
| Warning | Yellow pulse |
| Danger | Red flashing |
| Locked | Greyed-out system |

---

### 🚑 Emergency Override Mode
- One-tap life-saving dose delivery
- Bypasses all restrictions in critical scenarios
- Logs override actions for accountability

---

### 📊 Activity Log
- Tracks:
  - Successful doses
  - Blocked attempts
  - Emergency overrides
- Includes timestamps for each action

---

## 🧩 Tech Stack

- ⚛️ React.js (Vite)
- 🎨 Plain CSS (No frameworks)
- 🧠 Derived state logic (no manual flags)
- 🚫 No external UI libraries

---

## ⚙️ Core Logic

- `safeLimit = weight × 2`
- Risk levels:
  - ✅ Safe: < 70%
  - ⚠️ Warning: 70–100%
  - ❌ Danger: > 100%
- `isLocked = heartRate < 50`
- `requiresVerification = high-risk drug`

All UI behavior is **derived automatically** from these values.

---

## 🔒 Safety Constraints

- ❌ No overdose possible
- 🔒 Instant lock on unstable vitals
- 👥 Mandatory verification for risky drugs
- ⚡ Real-time UI feedback

---

## 🎨 UI / UX Highlights

- Dark futuristic medical dashboard
- Neon glow effects & smooth animations
- Risk-based color transitions
- High-contrast emergency visuals

