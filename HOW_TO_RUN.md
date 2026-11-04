# MediGuide — Setup Guide

## Quick Start (3 minutes)

### Step 1 — Get Free Gemini API Key
1. Go to **https://aistudio.google.com/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"** → select any project → copy the key
4. It's completely **free** — no credit card needed

### Step 2 — Add Your Key
Open the `.env` file in this folder and replace the placeholder:
```
GEMINI_API_KEY=AIzaSy...your_actual_key_here
```

### Step 3 — Start the Server
```bash
npm start
```

### Step 4 — Open
Go to **http://localhost:3000** in your browser.

---

## All Pages

| Page | What it does |
|------|-------------|
| **Home** | Landing page with all features |
| **Symptom Checker** | Describe symptoms → get specialist recommendation |
| **Find Hospitals** | Search any city to find hospitals on Google Maps |
| **OPD Timings** | Department-wise OPD timings + live map |
| **Emergency** | SOS button, ambulance numbers, first aid |
| **Medicines** | Look up any medicine — price, dosage, generics |
| **Helplines** | All Indian health helplines in one place |
| **Login** | Authentication page |

## What Needs an API Key

| Feature | Works Offline / Without Key? | Optional Gemini Live Mode? |
|---------|:----------------------------:|:--------------------------:|
| **Symptom Triage Desk** | ✅ Yes (Dual-Tier Clinical Rule Engine) | ✅ Supported |
| **Jan Aushadhi Medicines** | ✅ Yes (Built-in National Pharmacopeia) | ✅ Supported |
| **Hospital & Clinic Finder** | ✅ Yes (Interactive Directory + GPS) | Not needed |
| **OPD Timetable Matrices** | ✅ Yes (Real-time Live Clock) | Not needed |
| **Emergency SOS & First Aid** | ✅ Yes (1-Click Call, GPS, WhatsApp) | Not needed |
| **National Helplines** | ✅ Yes (Interactive Directory + Copy) | Not needed |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "API key not set" | Check `.env` file has your Gemini key |
| Port 3000 in use | Change `PORT=3001` in `.env` |
| Map not loading | Check internet connection |
| npm start fails | Run `npm install` first |
