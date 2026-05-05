import { useState } from "react";
import { motion } from "motion/react";
import {
  Phone, MapPin, Clock, Ambulance, Shield, Pill,
  HeartPulse, Building2, AlertTriangle, ExternalLink, Search,
  Flame, Siren, Baby, Brain
} from "lucide-react";

const EMERGENCY_NUMBERS = [
  { label: "National Emergency", number: "112", description: "Police, Fire, Ambulance — unified emergency", icon: <Siren size={22} />, color: "#dc2626", gradient: "linear-gradient(135deg, #7f1d1d, #dc2626)" },
  { label: "Ambulance", number: "108", description: "Free ambulance service across India", icon: <Ambulance size={22} />, color: "#f59e0b", gradient: "linear-gradient(135deg, #78350f, #d97706)" },
  { label: "Health Helpline", number: "104", description: "24/7 health information & advice", icon: <HeartPulse size={22} />, color: "#10b981", gradient: "linear-gradient(135deg, #065f46, #059669)" },
  { label: "NOTTO (Organ)", number: "1800-11-4770", description: "Organ donation & transplant helpline", icon: <Shield size={22} />, color: "#3b82f6", gradient: "linear-gradient(135deg, #1e3a8a, #2563eb)" },
  { label: "Women Helpline", number: "181", description: "Women in distress — 24/7 support", icon: <Phone size={22} />, color: "#ec4899", gradient: "linear-gradient(135deg, #831843, #db2777)" },
  { label: "Child Helpline", number: "1098", description: "Children in need of care & protection", icon: <Baby size={22} />, color: "#8b5cf6", gradient: "linear-gradient(135deg, #4c1d95, #7c3aed)" },
  { label: "Fire Brigade", number: "101", description: "Fire & rescue services", icon: <Flame size={22} />, color: "#f97316", gradient: "linear-gradient(135deg, #7c2d12, #ea580c)" },
  { label: "Mental Health", number: "08046110007", description: "iCall / Vandrevala Foundation helpline", icon: <Brain size={22} />, color: "#14b8a6", gradient: "linear-gradient(135deg, #134e4a, #0d9488)" },
];

type Pharmacy = {
  id: number;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  delivery: boolean;
  type: "chain" | "hospital" | "independent";
};

const PHARMACIES: Pharmacy[] = [
  { id: 1, name: "Apollo Pharmacy", city: "New Delhi", address: "Connaught Place, Block M", phone: "+91 11 3988 8888", hours: "24/7", delivery: true, type: "chain" },
  { id: 2, name: "MedPlus", city: "Hyderabad", address: "Banjara Hills, Road No. 12", phone: "+91 40 6720 3333", hours: "8 AM – 11 PM", delivery: true, type: "chain" },
  { id: 3, name: "AIIMS Pharmacy", city: "New Delhi", address: "AIIMS Campus, Ansari Nagar", phone: "+91 11 2658 8700", hours: "24/7", delivery: false, type: "hospital" },
  { id: 4, name: "Netmeds Pharmacy Store", city: "Chennai", address: "T. Nagar, Usman Road", phone: "+91 44 4500 1234", hours: "9 AM – 10 PM", delivery: true, type: "chain" },
  { id: 5, name: "Jan Aushadhi Kendra", city: "Mumbai", address: "Dadar West, Near Station", phone: "+91 22 2430 5678", hours: "9 AM – 9 PM", delivery: false, type: "independent" },
  { id: 6, name: "Fortis Hospital Pharmacy", city: "Gurugram", address: "Sector 44, Fortis Campus", phone: "+91 124 496 2222", hours: "24/7", delivery: false, type: "hospital" },
  { id: 7, name: "Wellness Forever", city: "Mumbai", address: "Andheri West, Link Road", phone: "+91 22 6191 1000", hours: "8 AM – 11 PM", delivery: true, type: "chain" },
  { id: 8, name: "CMC Pharmacy", city: "Vellore", address: "CMC Campus, Ida Scudder Road", phone: "+91 416 228 1000", hours: "24/7", delivery: false, type: "hospital" },
];

type AmbulanceService = {
  id: number;
  name: string;
  coverage: string;
  phone: string;
  type: "BLS" | "ALS" | "Air";
  freeService: boolean;
  response: string;
};

const AMBULANCES: AmbulanceService[] = [
  { id: 1, name: "108 GVK EMRI", coverage: "Pan India (33 States/UTs)", phone: "108", type: "BLS", freeService: true, response: "15–20 min" },
  { id: 2, name: "102 Janani Express", coverage: "Pan India — Maternal & Infant", phone: "102", type: "BLS", freeService: true, response: "20–30 min" },
  { id: 3, name: "Ziqitza Healthcare", coverage: "Mumbai, Delhi, Odisha, Bihar, Punjab", phone: "1298", type: "ALS", freeService: false, response: "12–18 min" },
  { id: 4, name: "StanPlus", coverage: "Hyderabad, Bangalore, Delhi NCR", phone: "+91 9100 108 108", type: "ALS", freeService: false, response: "8–12 min" },
  { id: 5, name: "CATS (Delhi Govt.)", coverage: "Delhi NCR", phone: "1099", type: "ALS", freeService: true, response: "15–25 min" },
  { id: 6, name: "Air Ambulance India", coverage: "Pan India — Critical Transfers", phone: "+91 9999 168 168", type: "Air", freeService: false, response: "60–120 min" },
];

const TYPE_LABELS_PHARMA = { chain: "Chain", hospital: "Hospital", independent: "Govt/NGO" };
const TYPE_COLORS_PHARMA = { chain: "#3b82f6", hospital: "#10b981", independent: "#f59e0b" };
const AMB_TYPE_COLORS = { BLS: "#3b82f6", ALS: "#f59e0b", Air: "#dc2626" };

export function EmergencyServices() {
  const [pharmacySearch, setPharmacySearch] = useState("");

  const filteredPharmacies = PHARMACIES.filter((p) => {
    const q = pharmacySearch.toLowerCase();
    return !pharmacySearch || p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p style={{ fontSize: "12px", color: "#fca5a5", letterSpacing: "0.1em", fontWeight: 600 }} className="mb-3">LIFE-SAVING RESOURCES</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Emergency{" "}
            <span style={{ background: "linear-gradient(90deg, #dc2626, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Services
            </span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(148,163,184,0.8)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Quick access to emergency numbers, ambulance services, and 24/7 pharmacies across India.
          </p>
        </motion.div>

        {/* ══════ EMERGENCY NUMBERS ══════ */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
            <AlertTriangle size={18} className="inline mr-2 text-red-400" />Emergency Helplines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {EMERGENCY_NUMBERS.map((e, i) => (
              <motion.a key={e.number} href={`tel:${e.number}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04 }}
                whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="rounded-2xl p-5 group cursor-pointer transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: e.gradient }}>
                  <span style={{ color: "white" }}>{e.icon}</span>
                </div>
                <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)", fontWeight: 600, letterSpacing: "0.04em", marginBottom: "4px" }}>{e.label}</p>
                <p style={{ fontSize: "24px", fontWeight: 800, color: "white", marginBottom: "4px", letterSpacing: "-0.02em" }}>{e.number}</p>
                <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)", lineHeight: 1.5 }}>{e.description}</p>
                <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <Phone size={12} style={{ color: e.color }} />
                  <span style={{ fontSize: "12px", color: e.color, fontWeight: 600 }}>Call Now</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ══════ AMBULANCE SERVICES ══════ */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
            <Ambulance size={18} className="inline mr-2 text-amber-400" />Ambulance Services
          </h2>
          <div className="flex flex-col gap-3">
            {AMBULANCES.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:border-white/15"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>{a.name}</h3>
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "10px", fontWeight: 700, background: `${AMB_TYPE_COLORS[a.type]}20`, color: AMB_TYPE_COLORS[a.type], border: `1px solid ${AMB_TYPE_COLORS[a.type]}40` }}>
                      {a.type}
                    </span>
                    {a.freeService && (
                      <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "10px", fontWeight: 700, background: "rgba(16,185,129,0.15)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.3)" }}>FREE</span>
                    )}
                  </div>
                  <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.6)", marginBottom: "4px" }}><MapPin size={11} className="inline mr-1" />{a.coverage}</p>
                  <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.5)" }}><Clock size={11} className="inline mr-1" />Avg. Response: {a.response}</p>
                </div>
                <a href={`tel:${a.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-95 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #b91c1c, #dc2626)", fontSize: "13px" }}>
                  <Phone size={13} /> Call {a.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══════ PHARMACIES ══════ */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}>
            <Pill size={18} className="inline mr-2 text-emerald-400" />24/7 Pharmacies
          </h2>
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="text" value={pharmacySearch} onChange={(e) => setPharmacySearch(e.target.value)}
              placeholder="Search pharmacies by name or city..."
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredPharmacies.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className="rounded-2xl p-5 transition-all hover:border-white/15"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full"
                    style={{ fontSize: "10px", fontWeight: 700, background: `${TYPE_COLORS_PHARMA[p.type]}20`, color: TYPE_COLORS_PHARMA[p.type], border: `1px solid ${TYPE_COLORS_PHARMA[p.type]}40` }}>
                    {TYPE_LABELS_PHARMA[p.type]}
                  </span>
                  {p.delivery && (
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "10px", fontWeight: 600, background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}>
                      🚚 Home Delivery
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
                  <Building2 size={14} className="inline mr-1.5 text-white/30" />{p.name}
                </h3>
                <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)", marginBottom: "6px" }}>
                  <MapPin size={11} className="inline mr-1" />{p.address}, {p.city}
                </p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}><Phone size={11} /> {p.phone}</span>
                  <span className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}><Clock size={11} /> {p.hours}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "12px" }}>Useful Government Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: "NOTTO Portal", url: "https://notto.mohfw.gov.in", desc: "National Organ & Tissue Transplant Organization" },
              { label: "eRaktKosh", url: "https://eraktkosh.in", desc: "National Blood Bank Management" },
              { label: "NHA (Ayushman Bharat)", url: "https://nha.gov.in", desc: "National Health Authority" },
              { label: "CDSCO", url: "https://cdsco.gov.in", desc: "Drug regulation & approval" },
              { label: "CoWIN", url: "https://www.cowin.gov.in", desc: "Vaccination portal" },
              { label: "Aarogya Setu", url: "https://aarogyasetu.gov.in", desc: "Health & wellness app" },
            ].map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-white/[0.05]"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <ExternalLink size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#93c5fd" }}>{link.label}</p>
                  <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <div className="rounded-2xl p-4 mt-8" style={{ background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)" }}>
          <p style={{ fontSize: "12px", color: "rgba(253,230,138,0.8)", lineHeight: 1.6 }}>
            <strong>⚠️ In case of a medical emergency, always dial 112 or 108 first.</strong> This page is for informational purposes. Actual response times may vary by location. Always verify pharmacy availability before visiting.
          </p>
        </div>
      </div>
    </div>
  );
}
