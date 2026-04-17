import { useState } from "react";
import { motion } from "motion/react";
import {
  Shield, ExternalLink, CheckCircle, Phone, MapPin,
  ChevronDown, ChevronUp, BookOpen, Building2, Globe, ArrowRight, Heart, HelpCircle
} from "lucide-react";
import { Link } from "react-router";

const STEPS = [
  { step: 1, title: "Visit the NOTTO Portal", desc: "Go to the official NOTTO website at notto.mohfw.gov.in. Click on 'Online Pledge' or 'Donor Registration'.", icon: <Globe size={18} /> },
  { step: 2, title: "Choose Registration Type", desc: "Select whether you want to register as a Living Donor (for blood relatives) or sign an Organ Donation Pledge (for cadaveric donation after brain death).", icon: <Heart size={18} /> },
  { step: 3, title: "Fill in Personal Details", desc: "Enter your full name, Aadhaar number, date of birth, address, mobile number, and email. All fields match government ID.", icon: <BookOpen size={18} /> },
  { step: 4, title: "Select Organs to Donate", desc: "You can choose specific organs (Heart, Kidneys, Liver, Lungs, Corneas, Pancreas) or pledge 'All Organs'. You can update this later.", icon: <CheckCircle size={18} /> },
  { step: 5, title: "Upload Documents", desc: "Upload a scanned copy of your Aadhaar card and a recent passport-sized photograph. Files should be under 2MB each.", icon: <Shield size={18} /> },
  { step: 6, title: "Receive Your Donor Card", desc: "After successful registration, you'll receive a digital NOTTO Donor Card via email and SMS. Keep this for hospital verification.", icon: <ExternalLink size={18} /> },
];

const OFFICES = [
  { name: "NOTTO (National)", location: "New Delhi", phone: "1800-11-NOTTO", type: "Apex Body", coverage: "All India" },
  { name: "ROTTO North", location: "PGIMER, Chandigarh", phone: "+91-172-2755555", type: "Regional", coverage: "North India" },
  { name: "ROTTO West", location: "KEM Hospital, Mumbai", phone: "+91-22-24107000", type: "Regional", coverage: "West India" },
  { name: "ROTTO South", location: "DMWIMS, Kerala", phone: "+91-497-2804000", type: "Regional", coverage: "South India" },
  { name: "ROTTO East", location: "IPGMER, Kolkata", phone: "+91-33-22041101", type: "Regional", coverage: "East India" },
  { name: "ZTCC Mumbai", location: "JJ Hospital, Mumbai", phone: "+91-22-23735555", type: "Zonal", coverage: "Mumbai Region" },
  { name: "SOTTO Tamil Nadu", location: "Chennai", phone: "+91-44-28290200", type: "State", coverage: "Tamil Nadu" },
  { name: "SOTTO Karnataka", location: "Bangalore", phone: "+91-80-26995000", type: "State", coverage: "Karnataka" },
];

const FAQ = [
  { q: "What is NOTTO?", a: "NOTTO (National Organ and Tissue Transplant Organization) is the apex body under the Ministry of Health & Family Welfare, Government of India. It coordinates, networks, and operates the organ and tissue procurement and distribution system across India." },
  { q: "Is registering with NOTTO mandatory?", a: "While signing a donor pledge is voluntary, all organ transplants in India must be coordinated through NOTTO-registered hospitals. Registration ensures your wish to donate is officially recorded and can be honored." },
  { q: "Can I change my mind after registering?", a: "Yes, absolutely. You can revoke your donor pledge at any time by contacting NOTTO or updating your preferences on the portal. Organ donation is 100% voluntary." },
  { q: "What is the difference between ROTTO and SOTTO?", a: "ROTTO (Regional Organ and Tissue Transplant Organization) covers a multi-state region, while SOTTO (State Organ and Tissue Transplant Organization) operates at the state level. Both work under NOTTO's coordination." },
  { q: "Does my family need to consent?", a: "Yes. Even if you've registered as a donor, in the event of brain death, your family's consent is required before organ retrieval. It's crucial to inform your family about your decision to donate." },
  { q: "How is organ allocation decided?", a: "NOTTO follows a transparent allocation algorithm based on medical urgency, blood group compatibility, waiting time, and geographical proximity. The system is designed to be fair and equitable." },
];

export function NOTTOGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", boxShadow: "0 10px 30px rgba(37,99,235,0.3)" }}>
            <Shield size={30} color="white" />
          </div>
          <p style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 700, letterSpacing: "0.1em" }} className="mb-3">NOTTO INTEGRATION GUIDE</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Register with{" "}
            <span style={{ background: "linear-gradient(90deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              NOTTO
            </span>
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(148,163,184,0.85)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            The National Organ & Tissue Transplant Organization is India's apex body coordinating all organ donations. Here's everything you need to register.
          </p>
        </motion.div>

        {/* What is NOTTO */}
        <div className="rounded-3xl p-6 md:p-8 mb-8"
          style={{ background: "linear-gradient(135deg, rgba(30,64,175,0.12), rgba(37,99,235,0.06))", border: "1px solid rgba(37,99,235,0.2)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={14} className="text-blue-400" />
            <span style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 600, letterSpacing: "0.08em" }}>ABOUT NOTTO</span>
          </div>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: 1.8 }}>
            <strong style={{ color: "white" }}>NOTTO</strong> was established under the Directorate General of Health Services, Ministry of Health & Family Welfare, Government of India.
            It functions as the apex centre for <strong style={{ color: "#93c5fd" }}>All India activities</strong> related to procurement, distribution, and registry of
            organs and tissues. NOTTO maintains the national waiting list, coordinates cross-state organ sharing, and ensures compliance with the{" "}
            <strong style={{ color: "#fca5a5" }}>Transplantation of Human Organs & Tissues Act (THOTA), 1994</strong>.
          </p>
        </div>

        {/* Step by Step */}
        <div className="mb-10">
          <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "16px" }}>STEP-BY-STEP REGISTRATION</p>
          <div className="flex flex-col gap-3">
            {STEPS.map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa" }}>
                  {s.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold" style={{ background: "rgba(37,99,235,0.2)", color: "#93c5fd" }}>
                      Step {s.step}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "4px" }}>{s.title}</h3>
                  <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.75)", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-6 mb-10 text-center"
          style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(37,99,235,0.25)" }}>
          <h3 style={{ fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "8px" }}>Ready to Register?</h3>
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)", marginBottom: "20px" }}>
            Visit the official NOTTO portal to begin your registration
          </p>
          <a href="https://notto.mohfw.gov.in" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", boxShadow: "0 12px 40px rgba(37,99,235,0.35)", fontSize: "15px" }}>
            <Globe size={18} />
            Visit NOTTO Portal
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Regional Offices */}
        <div className="mb-10">
          <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "16px" }}>NOTTO REGIONAL OFFICES</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OFFICES.map((o) => (
              <div key={o.name} className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold"
                    style={{
                      background: o.type === "Apex Body" ? "rgba(220,38,38,0.15)" : o.type === "Regional" ? "rgba(37,99,235,0.15)" : o.type === "Zonal" ? "rgba(139,92,246,0.15)" : "rgba(5,150,105,0.15)",
                      color: o.type === "Apex Body" ? "#fca5a5" : o.type === "Regional" ? "#93c5fd" : o.type === "Zonal" ? "#c084fc" : "#6ee7b7",
                      border: `1px solid ${o.type === "Apex Body" ? "rgba(220,38,38,0.25)" : o.type === "Regional" ? "rgba(37,99,235,0.25)" : o.type === "Zonal" ? "rgba(139,92,246,0.25)" : "rgba(5,150,105,0.25)"}`,
                    }}>
                    {o.type}
                  </span>
                </div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "white", marginBottom: "2px" }}>{o.name}</p>
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin size={10} className="text-white/30" />
                  <span style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)" }}>{o.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={10} className="text-white/30" />
                  <span style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 500 }}>{o.phone}</span>
                </div>
                <p style={{ fontSize: "10px", color: "rgba(148,163,184,0.4)", marginTop: "4px" }}>Coverage: {o.coverage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={14} className="text-white/50" />
            <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", fontWeight: 600, letterSpacing: "0.08em" }}>FREQUENTLY ASKED QUESTIONS</p>
          </div>
          <div className="flex flex-col gap-2">
            {FAQ.map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-all hover:bg-white/3">
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>{item.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-blue-400" /> : <ChevronDown size={16} className="text-white/30" />}
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    className="px-5 pb-4">
                    <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.85)", lineHeight: 1.7 }}>{item.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.6)", marginBottom: "12px" }}>Already registered with NOTTO?</p>
          <Link to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #b91c1c, #dc2626)", boxShadow: "0 8px 25px rgba(220,38,38,0.3)", fontSize: "14px" }}>
            <Heart size={16} fill="white" />
            Register on JivanSetu
            <ArrowRight size={16} />
          </Link>
          <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.4)", marginTop: "12px" }}>
            NOTTO Helpline: 1800-11-NOTTO (Toll-free) · National Ambulance: 108
          </p>
        </div>
      </div>
    </div>
  );
}
