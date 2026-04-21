import { motion } from "motion/react";
import { FileText, Shield, AlertTriangle, Users, Heart, Scale, Ban, CheckCircle } from "lucide-react";
import { Link } from "react-router";

const SECTIONS = [
  {
    id: "acceptance",
    icon: <CheckCircle size={18} />,
    title: "1. Acceptance of Terms",
    color: "#10b981",
    paragraphs: [
      "By accessing or using JivanSetu (\"the Platform\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
      "JivanSetu reserves the right to update these terms at any time. Continued use of the Platform after changes constitutes acceptance of the revised terms. Users will be notified of material changes via email and in-app notifications.",
    ],
  },
  {
    id: "eligibility",
    icon: <Users size={18} />,
    title: "2. Eligibility & Registration",
    color: "#3b82f6",
    paragraphs: [
      "You must be at least 18 years old (or the legal age of majority in your jurisdiction) to register on JivanSetu. For organ donation registration, you must meet the medical eligibility criteria as defined by NOTTO guidelines.",
      "You agree to provide accurate, complete, and current information during registration, including your Aadhaar number for identity verification. Providing false or misleading information may result in immediate account termination and potential legal action.",
      "Each user may maintain only one account. Duplicate accounts will be suspended.",
    ],
  },
  {
    id: "platform-use",
    icon: <Heart size={18} />,
    title: "3. Platform Usage",
    color: "#dc2626",
    paragraphs: [
      "JivanSetu is a technology platform that facilitates the connection between organ and blood donors and recipients. We are NOT a medical provider, hospital, or transplant authority.",
      "All organ matching, transplant procedures, and medical decisions are handled exclusively by NOTTO-registered transplant centers and licensed physicians. JivanSetu serves only as an intermediary to streamline the registration and matching process.",
      "You agree to use the Platform only for lawful purposes related to organ and blood donation. Any attempt to use the Platform for commercial organ trade is strictly prohibited and will be reported to law enforcement.",
    ],
  },
  {
    id: "thota",
    icon: <Scale size={18} />,
    title: "4. THOTA 1994 Compliance",
    color: "#f59e0b",
    paragraphs: [
      "JivanSetu operates in full compliance with the Transplantation of Human Organs and Tissues Act (THOTA), 1994, as amended in 2011 and 2014.",
      "Organ trading is a criminal offense under THOTA 1994, punishable by imprisonment of up to 5 years and a fine of up to ₹20 lakhs. JivanSetu has zero tolerance for any form of organ commercialization.",
      "All organ donations facilitated through the Platform require proper authorization from NOTTO/ROTTO/SOTTO. For deceased (brain-death) organ donation, consent from the next of kin and certification by a panel of 4 doctors (as per THOTA protocols) is mandatory.",
      "Living organ donation is permitted only between near relatives (as defined by THOTA) unless an Authorization Committee grants special permission.",
    ],
  },
  {
    id: "medical-disclaimer",
    icon: <AlertTriangle size={18} />,
    title: "5. Medical Disclaimer",
    color: "#ef4444",
    paragraphs: [
      "JivanSetu does NOT provide medical advice, diagnosis, or treatment. All medical information on the Platform is for general informational purposes only.",
      "The Seva AI assistant provides general guidance about the donation process but is NOT a substitute for professional medical advice. Always consult a qualified healthcare provider for medical decisions.",
      "Blood compatibility information and organ matching suggestions are preliminary. Final decisions must be made by licensed transplant physicians at NOTTO-registered centers.",
      "JivanSetu is not responsible for any medical outcomes, complications, or adverse events resulting from donations or transplants facilitated through the Platform.",
    ],
  },
  {
    id: "user-obligations",
    icon: <Shield size={18} />,
    title: "6. User Obligations",
    color: "#a855f7",
    paragraphs: [
      "You agree to: (a) Keep your login credentials confidential; (b) Immediately report any unauthorized access to your account; (c) Provide accurate medical information; (d) Not impersonate any person or entity; (e) Not use the Platform for any illegal purpose.",
      "You must not: (a) Attempt to sell, trade, or commercially broker organs or tissues; (b) Upload false documents or medical records; (c) Harass, threaten, or defame other users; (d) Scrape, crawl, or automated-access the Platform; (e) Interfere with Platform security or infrastructure.",
    ],
  },
  {
    id: "liability",
    icon: <Ban size={18} />,
    title: "7. Limitation of Liability",
    color: "#6366f1",
    paragraphs: [
      "JivanSetu provides the Platform on an \"as-is\" and \"as-available\" basis. We do not guarantee uninterrupted access, error-free operation, or specific outcomes.",
      "To the maximum extent permitted by law, JivanSetu shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.",
      "Our total liability for any claim arising from these Terms shall not exceed ₹10,000 (ten thousand Indian rupees).",
    ],
  },
  {
    id: "termination",
    icon: <Ban size={18} />,
    title: "8. Termination",
    color: "#ec4899",
    paragraphs: [
      "You may deactivate your account at any time through your dashboard settings or by contacting support. Certain data may be retained as required by THOTA 1994 and PDPA 2023.",
      "JivanSetu reserves the right to suspend or terminate your account immediately if: (a) You violate these Terms; (b) You provide false information; (c) You engage in or facilitate illegal organ trade; (d) Required by law or court order.",
    ],
  },
  {
    id: "governing-law",
    icon: <Scale size={18} />,
    title: "9. Governing Law & Disputes",
    color: "#14b8a6",
    paragraphs: [
      "These Terms are governed by the laws of the Republic of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.",
      "Before initiating legal proceedings, you agree to attempt good-faith resolution by contacting our support team at legal@jivansetu.org.",
    ],
  },
];

export function Terms() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FileText size={14} className="text-blue-400" />
            <p style={{ fontSize: "12px", color: "#93c5fd", letterSpacing: "0.1em", fontWeight: 600 }}>LEGAL</p>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>Terms of Service</h1>
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Please read these terms carefully before using JivanSetu. By using our services, you agree to comply with these terms and all applicable Indian laws.
          </p>
          <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.4)", marginTop: "12px" }}>Effective: April 17, 2026 · Last updated: April 17, 2026</p>
        </motion.div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-3xl p-6 md:p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${section.color}20`, color: section.color }}>
                  {section.icon}
                </div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white" }}>{section.title}</h2>
              </div>
              <div className="flex flex-col gap-3 pl-0 md:pl-13">
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} style={{ fontSize: "13px", color: "rgba(148,163,184,0.75)", lineHeight: 1.8 }}>{p}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-6 mt-8 text-center"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)", marginBottom: "16px", lineHeight: 1.7 }}>
            By using JivanSetu, you acknowledge that you have read, understood, and agree to these Terms of Service and our{" "}
            <Link to="/privacy" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Privacy Policy</Link>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", fontSize: "13px" }}>
              Contact Legal Team
            </Link>
            <Link to="/privacy" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all hover:bg-white/[0.08]"
              style={{ border: "1px solid rgba(255,255,255,0.12)", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
              View Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
