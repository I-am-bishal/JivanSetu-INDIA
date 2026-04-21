import { motion } from "motion/react";
import { Shield, Lock, Eye, FileText, UserCheck, Trash2, Download, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router";

const SECTIONS = [
  {
    id: "collection",
    icon: <FileText size={18} />,
    title: "1. Information We Collect",
    color: "#3b82f6",
    content: [
      { subtitle: "Personal Information", text: "When you register on JivanSetu, we collect your full name, date of birth, Aadhaar number (for verification), mobile number, email address, blood group, city, and state." },
      { subtitle: "Medical Information", text: "For donors and receivers, we collect organ preferences, medical history, blood type, doctor's opinions, and medical certificates. This data is classified as Sensitive Personal Data under PDPA 2023." },
      { subtitle: "Usage Data", text: "We automatically collect device information, IP address, browser type, pages visited, and interaction patterns to improve our services." },
      { subtitle: "Location Data", text: "With your consent, we collect approximate location data to enable proximity-based donor matching and emergency alerts." },
    ],
  },
  {
    id: "usage",
    icon: <Eye size={18} />,
    title: "2. How We Use Your Data",
    color: "#10b981",
    content: [
      { subtitle: "Donor-Recipient Matching", text: "Your medical and personal data is used to match you with compatible donors or recipients through NOTTO's transplant network." },
      { subtitle: "Emergency Alerts", text: "We use your location and blood type to send proximity-based alerts when someone nearby urgently needs a matching donor." },
      { subtitle: "Communication", text: "We send OTP verification, appointment reminders, donation eligibility notifications, and campaign updates via SMS and email." },
      { subtitle: "Platform Improvement", text: "Anonymized and aggregated data helps us improve matching algorithms, user experience, and service availability." },
    ],
  },
  {
    id: "security",
    icon: <Lock size={18} />,
    title: "3. Data Security",
    color: "#f59e0b",
    content: [
      { subtitle: "Encryption", text: "All personal and medical data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit." },
      { subtitle: "Aadhaar Data", text: "Aadhaar numbers are used solely for identity verification via UIDAI APIs and are never stored in plaintext. Only a hashed reference is retained." },
      { subtitle: "Access Controls", text: "Medical data access is restricted to NOTTO-authorized physicians and hospital administrators through role-based access controls." },
      { subtitle: "Audit Trails", text: "All data access events are logged and auditable in compliance with PDPA 2023 requirements." },
    ],
  },
  {
    id: "sharing",
    icon: <UserCheck size={18} />,
    title: "4. Data Sharing",
    color: "#a855f7",
    content: [
      { subtitle: "NOTTO", text: "Organ donor and recipient data is shared with the National Organ and Tissue Transplant Organization (NOTTO) as required by THOTA 1994." },
      { subtitle: "Hospitals", text: "Your medical data is shared with NOTTO-registered transplant centers only when a potential match is identified." },
      { subtitle: "No Commercial Sale", text: "We never sell, rent, or trade your personal or medical data to third parties for commercial purposes." },
      { subtitle: "Legal Requirements", text: "We may disclose data if required by law, court order, or government authority in accordance with Indian law." },
    ],
  },
  {
    id: "rights",
    icon: <Shield size={18} />,
    title: "5. Your Rights (PDPA 2023)",
    color: "#dc2626",
    content: [
      { subtitle: "Right to Access", text: "You can request a copy of all personal data we hold about you at any time." },
      { subtitle: "Right to Correction", text: "You can update or correct inaccurate personal information through your dashboard or by contacting support." },
      { subtitle: "Right to Deletion", text: "You may request deletion of your account and associated data, subject to legal retention requirements under THOTA 1994." },
      { subtitle: "Right to Portability", text: "You can request your data in a machine-readable format for transfer to another service." },
      { subtitle: "Right to Withdraw Consent", text: "You can withdraw consent for data processing at any time. Note that this may affect your ability to use matching services." },
    ],
  },
  {
    id: "cookies",
    icon: <Eye size={18} />,
    title: "6. Cookies & Tracking",
    color: "#06b6d4",
    content: [
      { subtitle: "Essential Cookies", text: "Required for authentication, session management, and security. Cannot be disabled." },
      { subtitle: "Analytics Cookies", text: "Used to understand usage patterns and improve the platform. Can be opted out via cookie settings." },
      { subtitle: "No Third-Party Ads", text: "JivanSetu does not use advertising cookies or share data with ad networks." },
    ],
  },
];

export function Privacy() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield size={14} className="text-blue-400" />
            <p style={{ fontSize: "12px", color: "#93c5fd", letterSpacing: "0.1em", fontWeight: 600 }}>LEGAL</p>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>Privacy Policy</h1>
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Your privacy is our priority. This policy explains how JivanSetu collects, uses, and protects your data in compliance with India's Personal Data Protection Act (PDPA) 2023.
          </p>
          <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.4)", marginTop: "12px" }}>Last updated: April 17, 2026</p>
        </motion.div>

        {/* Compliance Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {["PDPA 2023 Compliant", "AES-256 Encrypted", "NOTTO Integrated", "THOTA 1994 Aligned"].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)" }}>
              <CheckCircle size={11} className="text-blue-400" />
              <span style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 600 }}>{badge}</span>
            </div>
          ))}
        </motion.div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-3xl p-6 md:p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${section.color}20`, color: section.color }}>
                  {section.icon}
                </div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white" }}>{section.title}</h2>
              </div>
              <div className="flex flex-col gap-4 pl-0 md:pl-13">
                {section.content.map((item) => (
                  <div key={item.subtitle}>
                    <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: "4px" }}>{item.subtitle}</h3>
                    <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.75)", lineHeight: 1.7 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact for Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-6 mt-8 text-center"
          style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}
        >
          <Mail size={20} className="text-blue-400 mx-auto mb-3" />
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "6px" }}>Privacy Concerns?</h3>
          <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.7)", marginBottom: "12px", lineHeight: 1.6 }}>
            Contact our Data Protection Officer at <span className="text-blue-400 font-semibold">privacy@jivansetu.org</span> or write to us at our Delhi headquarters.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", fontSize: "13px" }}
          >
            <Mail size={14} /> Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
