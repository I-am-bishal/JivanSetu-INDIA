<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<h1 align="center">❤️ JivanSetu — जीवनसेतु</h1>

<p align="center">
  <strong>India's Bridge to Life — A comprehensive organ & blood donation platform</strong>
</p>

<p align="center">
  <em>NOTTO Affiliated · THOTA 1994 Compliant · PDPA 2023 Secure · 312+ Cities</em>
</p>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Pages & Routes](#-pages--routes)
- [Internationalization (i18n)](#-internationalization-i18n)
- [Design System](#-design-system)
- [AI Assistant — Seva AI](#-ai-assistant--seva-ai)
- [Legal Compliance](#-legal-compliance)
- [Contributing](#-contributing)
- [License](#-license)
- [Attributions](#-attributions)

---

## 🌟 About

**JivanSetu** (जीवनसेतु — *Bridge of Life*) is a next-generation web platform designed to bridge the gap between organ & blood donors and those in critical need across India. Built with a mission to save lives, JivanSetu provides a seamless, legally compliant, and AI-powered experience for donors, recipients, medical professionals, and hospitals.

> *"Your decision today saves a life tomorrow."*

### Key Highlights

- 🏥 **1,28,471+** Registered Donors
- ❤️ **32,918+** Lives Saved
- 🏨 **847** Partner Hospitals
- 🌆 **312** Cities Covered

---

## ✨ Features

### 🏠 Landing Page
A stunning, dark-themed hero section with animated image carousel, live statistics, persona-based registration cards (Organ Donor, Organ Receiver, Blood Donor, Blood Receiver), urgency feed preview, testimonials, and a compliance trust section.

### 🚨 Live SOS / Urgency Dashboard
Real-time emergency requests from patients needing urgent blood or organ donations. View and respond to critical cases with urgency indicators, patient details, and hospital locations.

### 🗺️ Live Emergency Heatmap
Interactive, real-time heatmap visualizing donation urgency across India. Identify hotspots and high-demand areas at a glance.

### 📍 Proximity-Based Donor Alerts
Location-aware alert system that notifies registered donors when a matching request is raised nearby. Connect with those in need within minutes.

### 🤖 AI Medical Report Scanner
Upload medical reports and let the AI extract key information automatically. Streamlines the registration and verification process for both donors and recipients.

### 👨‍⚕️ Doctor's Validation Portal
A dedicated portal for verified medical professionals to review, validate, and approve donation requests. Ensures every match is medically sound.

### 🏛️ NOTTO Integration Guide
Step-by-step guide to registering with India's National Organ and Tissue Transplant Organization. Ensures compliance with India's organ transplant regulatory body.

### 🏆 Digital Donor Pledge Wall
A public wall celebrating donors who have pledged to save lives. Take the pledge and receive a digital certificate of commitment.

### ⚖️ Legal FAQ
Comprehensive, easy-to-understand legal information about organ and blood donation in India. Covers THOTA 1994, NOTTO regulations, and patient rights.

### 🤖 Seva AI Assistant
A 24/7 AI-powered chatbot available on every page. Answers questions about registration, organ donation, legal procedures, finding blood banks, required documents, and more.

### 📋 Multi-Step Registration Flow
A streamlined, persona-based registration system supporting four journeys:
- Organ Donor Registration
- Organ Receiver Registration
- Blood Donor Registration
- Blood Receiver Emergency Request

### 🪪 Digital Donor Card
Generate and view your personalized digital donor card after registration.

### 🔐 Login System
Secure login page for returning users.

### ℹ️ About Page
Information about the JivanSetu mission, team, and impact.

### 📢 SOS Ticker
A persistent, real-time scrolling ticker displaying the latest emergency requests.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18.3 with TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | TailwindCSS 4 + Custom CSS Themes |
| **Routing** | React Router 7 |
| **Animations** | Motion (Framer Motion) |
| **UI Components** | Radix UI Primitives + shadcn/ui |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **AI Widget** | Custom RAG-based chatbot (Seva AI) |
| **i18n** | i18next + react-i18next |
| **Forms** | React Hook Form |
| **Theming** | next-themes (light/dark mode) |
| **Carousel** | Embla Carousel |
| **Toast Notifications** | Sonner |
| **Drag & Drop** | React DnD |

---

## 📁 Project Structure

```
JivanSetu/
├── index.html                    # Entry HTML file
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite configuration
├── postcss.config.mjs            # PostCSS configuration
├── ATTRIBUTIONS.md               # Open-source attributions
├── README.md                     # This file
│
├── src/
│   ├── main.tsx                  # React entry point
│   │
│   ├── app/
│   │   ├── App.tsx               # Root app component with splash screen
│   │   ├── routes.tsx            # All application routes
│   │   │
│   │   ├── pages/
│   │   │   ├── Landing.tsx       # Home page with hero, stats, urgency feed
│   │   │   ├── Login.tsx         # User login page
│   │   │   ├── RegistrationFlow.tsx  # Multi-step donor/receiver registration
│   │   │   ├── UrgencyDashboard.tsx  # Live SOS emergency dashboard
│   │   │   ├── DonorCard.tsx     # Digital donor card
│   │   │   ├── About.tsx         # About JivanSetu
│   │   │   ├── SevaAIPage.tsx    # Full-page Seva AI interface
│   │   │   ├── LiveHeatmap.tsx   # Real-time emergency heatmap
│   │   │   ├── ProximityAlerts.tsx # Location-based donor alerts
│   │   │   ├── ReportScanner.tsx # AI medical report scanner
│   │   │   ├── DoctorPortal.tsx  # Doctor verification portal
│   │   │   ├── NOTTOGuide.tsx    # NOTTO registration guide
│   │   │   ├── PledgeWall.tsx    # Donor pledge wall & certificates
│   │   │   └── LegalFAQ.tsx     # Legal information & FAQ
│   │   │
│   │   ├── components/
│   │   │   ├── Layout.tsx        # Page layout wrapper
│   │   │   ├── Navbar.tsx        # Navigation bar with dropdown
│   │   │   ├── SevaAIWidget.tsx  # Floating AI chatbot widget
│   │   │   ├── SOSTicker.tsx     # Emergency scrolling ticker
│   │   │   ├── LanguageSelector.tsx # Multi-language selector
│   │   │   ├── figma/            # Figma-exported components
│   │   │   └── ui/              # shadcn/ui base components
│   │   │
│   │   └── i18n/
│   │       ├── config.ts         # i18n configuration
│   │       └── locales/          # Translation files (12 languages)
│   │
│   └── styles/
│       ├── index.css             # Global styles
│       ├── tailwind.css          # Tailwind imports
│       ├── theme.css             # Design tokens & CSS variables
│       └── fonts.css             # Font configurations
│
└── guidelines/                   # Development guidelines
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/I-am-bishal/JivanSetu-INDIA.git
cd JivanSetu-INDIA

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server (default: `http://localhost:5173`) |
| `npm run build` | Build for production |

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Home page with hero, stats & urgency feed |
| `/login` | Login | User authentication |
| `/register` | Registration Flow | Multi-step donor/receiver registration |
| `/urgency` | Urgency Dashboard | Live SOS emergency cases |
| `/seva-ai` | Seva AI | Full-page AI assistant interface |
| `/donor-card` | Donor Card | View digital donor card |
| `/about` | About | About JivanSetu |
| `/heatmap` | Live Heatmap | Real-time emergency heatmap |
| `/alerts` | Proximity Alerts | Location-based donor alerts |
| `/report-scanner` | Report Scanner | AI-powered medical report reader |
| `/doctor-portal` | Doctor's Portal | Medical professional verification |
| `/notto-guide` | NOTTO Guide | NOTTO registration walkthrough |
| `/pledge-wall` | Pledge Wall | Donor pledge wall & certificates |
| `/legal-faq` | Legal FAQ | Legal information (THOTA/NOTTO) |

---

## 🌐 Internationalization (i18n)

JivanSetu supports **12 Indian languages** to make organ & blood donation accessible to all:

| Language | Code | Script |
|---|---|---|
| English | `en` | Latin |
| हिन्दी (Hindi) | `hi` | Devanagari |
| বাংলা (Bengali) | `bn` | Bengali |
| தமிழ் (Tamil) | `ta` | Tamil |
| తెలుగు (Telugu) | `te` | Telugu |
| ಕನ್ನಡ (Kannada) | `kn` | Kannada |
| മലയാളം (Malayalam) | `ml` | Malayalam |
| ગુજરાતી (Gujarati) | `gu` | Gujarati |
| मराठी (Marathi) | `mr` | Devanagari |
| ਪੰਜਾਬੀ (Punjabi) | `pa` | Gurmukhi |
| ଓଡ଼ିଆ (Odia) | `od` | Odia |
| اُردُو (Urdu) | `ur` | Nastaliq |

Language can be switched from the **Language Selector** in the navigation bar.

---

## 🎨 Design System

JivanSetu uses a cohesive, premium dark-theme design language:

- **Primary Background**: `#060d1f` (deep navy)
- **Red Accents**: `#dc2626` (urgency, hearts, critical alerts)
- **Blue Accents**: `#2563eb` (trust, compliance, primary CTA)
- **Green Accents**: `#10b981` (success, donors, verified)
- **Amber Accents**: `#f59e0b` (warnings, high-priority)
- **Glass Effects**: `backdrop-filter: blur(20px)` with subtle borders
- **Typography**: Noto Sans, Noto Sans Devanagari, Noto Serif Display
- **Motion**: Smooth entrance animations, hover effects, and micro-interactions via Motion (Framer Motion)
- **Cards**: Rounded corners (`rounded-2xl`/`rounded-3xl`) with gradient glows

---

## 🤖 AI Assistant — Seva AI

**Seva AI** (सेवा — *Service*) is JivanSetu's compassionate AI assistant, available as a floating widget on every page and as a dedicated full-page experience.

### Capabilities
- 🩺 Organ donation registration guidance
- 🩸 Finding nearby blood donors and blood banks
- 📋 Document requirements for registration
- ⚖️ Legal information (THOTA, NOTTO, PDPA)
- ❤️ Emotional support & general guidance
- 🌐 Multi-language responses

### How It Works
Seva AI uses a keyword-based RAG (Retrieval-Augmented Generation) approach to provide contextual, accurate responses about India's organ and blood donation ecosystem.

---

## ⚖️ Legal Compliance

JivanSetu is designed with strict adherence to Indian medical and legal regulations:

- **THOTA 1994** — The Transplantation of Human Organs and Tissues Act (amended 2011)
- **NOTTO** — National Organ and Tissue Transplant Organization (apex regulatory body)
- **PDPA 2023** — Personal Data Protection Act (data privacy)

> ⚠️ **JivanSetu is a matching and awareness platform, NOT a marketplace.** Trading organs is illegal and punishable under Indian law. All organ matches are routed through NOTTO-authorized channels.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript strict mode conventions
- Use existing Radix UI / shadcn/ui components where possible
- Maintain i18n support — add translations for all 12 languages
- Ensure all UI components are responsive (mobile-first)
- Test across major browsers (Chrome, Firefox, Safari, Edge)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Attributions

- UI Components: [shadcn/ui](https://ui.shadcn.com/) — MIT License
- Photography: [Unsplash](https://unsplash.com) — Unsplash License
- Icons: [Lucide](https://lucide.dev/) — ISC License
- Fonts: [Google Fonts](https://fonts.google.com/) (Noto Sans, Noto Serif Display, Noto Sans Devanagari)
- Original Design: [Figma Design File](https://www.figma.com/design/00lW0AcOigpzjTAKj2PZJs/JivanSetu)

---

<p align="center">
  Made with ❤️ for India — <strong>JivanSetu · जीवनसेतु</strong>
</p>
<p align="center">
  <em>One donor can save 8 lives. Register today.</em>
</p>