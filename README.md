# MediGuide India 🏥

> Modern Healthcare Navigation, Clinical Symptom Triage, Generic Medicine Formulary, and Hospital OPD Registry.

![MediGuide](https://img.shields.io/badge/Status-Live%20Online-059669?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Deployment-Vercel%20%2B%20GitHub%20Pages-0284c7?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-7c3aed?style=for-the-badge)

🌐 **Live Website:** [https://mediguide-xi.vercel.app](https://mediguide-xi.vercel.app)

---

## 🌟 Key Features

### 1. 🩺 AI & Clinical Symptom Triage (`symptoms.html`)
* Natural language symptom input in English or Hindi (e.g. *fever, headache, chest pain, acidity, breathlessness*).
* Dual-tier decision engine:
  * **Tier 1:** AIIMS clinical triage decision protocol.
  * **Tier 2:** Live Gemini AI inference for deep medical reasoning.
* Instant clinical guidance: Recommended Medical Specialist, Clinical Urgency Level, Potential Diagnoses, What to do right now, and What tests to ask your doctor.

### 2. 💊 Jan Aushadhi Generic Medicine Search (`medicines.html`)
* Comprehensive national pharmacopeia database of 70+ common Indian medicines.
* Smart pharmacological classifier by active salts and suffixes (`-statin`, `-sartan`, `-prazole`, `-cillin`, `-mycin`, etc.).
* Displays exact branded market price vs. Pradhan Mantri Bhartiya Janaushadhi Pariyojana generic equivalents with **65% to 85% price savings**.
* Clinical dosages, indications, common side effects, and Schedule H prescription warnings.

### 3. ⏰ Universal Hospital OPD Schedules (`opd.html`)
* Search ANY hospital, civil hospital, or clinic across India.
* 80+ pre-indexed national apex institutes (AIIMS, Safdarjung, RML, PGI Chandigarh, SMS Jaipur, KGMU Lucknow, Tata Memorial, KEM, CMC Vellore, Medanta, Apollo, Fortis, Max, Narayana Health).
* **Automatic "No-OPD" Badging:** Instantly detects dedicated 24/7 trauma centers, emergency casualties, blood banks, or diagnostic labs and displays explicit operational alerts.
* Universal OPD generator: Synthesizes accurate Indian clinical timetables for unlisted civil hospitals and private clinics.
* Live operational clock tracking registration counter status in real time.

### 4. 📍 Hospital Directory & Live Geolocation (`hospitals.html`)
* Interactive Google Maps embed with automatic GPS locality detection.
* Verified institutions across Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Jaipur, and Chandigarh.
* One-click directions, phone dialer, and OPD schedule links.

### 5. 🚨 Emergency Services & Helplines (`emergency.html`, `helplines.html`)
* One-click direct emergency dialer for **108 (Ambulance)**, **112 (National Emergency)**, and **102 (Pregnancy/Infant)**.
* Share live GPS coordinates via WhatsApp or SMS.
* Step-by-step first aid protocols for Cardiac Arrest (CPR), Choking, Severe Bleeding, Burns, and Heatstroke.

### 6. 👤 User Authentication & Profile (`login.html`, `profile.html`)
* Strict role-based authentication separating **Patients** and **Clinicians**.
* Role-locking: Prevents cross-role login attempts with the same email.
* Google Sign-In flow with custom profile photo support (stored in local session).
* Interactive personal health dashboard, saved medical notes, activity timeline, and account management.

---

## 🚀 Quick Start / Local Development

### Prerequisites
* Node.js (v18 or higher)
* npm

### Installation
```bash
# Clone the repository
git clone https://github.com/dakshchawla1/Mediguide.git
cd Mediguide

# Install dependencies
npm install

# Start local server
npm start
```
Open **`http://localhost:3000`** in your browser.

---

## 📁 Project Structure

```text
MediGuide/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages CI/CD
├── api/                      # Serverless functions (Vercel)
│   ├── groq.js
│   ├── medicine.js
│   ├── overpass.js
│   ├── status.js
│   └── triage.js
├── css/
│   └── main.css              # Color-coded theme design system
├── js/
│   └── main.js               # Dark/light theme, nav user pill, toasts
├── emergency.html            # 24/7 SOS and first-aid protocols
├── helplines.html            # National verified helpline directory
├── hospitals.html            # Hospital directory & interactive maps
├── index.html                # Main homepage & feature showcase
├── login.html                # Role-locked portal authentication
├── medicines.html            # Jan Aushadhi generic drug database
├── opd.html                  # Universal hospital OPD timetables
├── profile.html              # Patient/Clinician health profile
├── server.js                 # Express.js backend & API endpoints
├── package.json              # Project dependencies & scripts
└── README.md
```

---

## 🛡️ License & Disclaimers

MediGuide India is an informational healthcare navigation tool. All clinical triage outputs, Jan Aushadhi pricing comparisons, and OPD timetables are for educational and navigational assistance. In all acute or severe medical emergencies, dial **108** immediately or proceed to the nearest emergency room.
