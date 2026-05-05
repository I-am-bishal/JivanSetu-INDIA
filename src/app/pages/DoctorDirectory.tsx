import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Search, MapPin, Phone, Clock, Filter, X, Star,
  Stethoscope, GraduationCap, Calendar, Award, ChevronRight, Languages
} from "lucide-react";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  subSpecialty: string;
  hospital: string;
  city: string;
  state: string;
  phone: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: string;
  availability: string;
  languages: string[];
  transplantSpecialist: boolean;
  degrees: string;
};

const DOCTORS: Doctor[] = [
  { id: 1, name: "Dr. Suresh Rao", specialty: "Nephrology", subSpecialty: "Kidney Transplant", hospital: "AIIMS New Delhi", city: "New Delhi", state: "Delhi", phone: "+91 11 2658 8500", experience: 28, rating: 4.9, reviews: 1230, fee: "₹1,500", availability: "Mon–Sat, 10 AM – 4 PM", languages: ["Hindi", "English"], transplantSpecialist: true, degrees: "MBBS, MD, DM (Nephrology)" },
  { id: 2, name: "Dr. Priya Nair", specialty: "Transplant Surgery", subSpecialty: "Liver Transplant", hospital: "Amrita Hospital", city: "Kochi", state: "Kerala", phone: "+91 484 285 1234", experience: 22, rating: 4.8, reviews: 890, fee: "₹2,000", availability: "Mon–Fri, 9 AM – 5 PM", languages: ["Malayalam", "English", "Hindi"], transplantSpecialist: true, degrees: "MBBS, MS, MCh (Surgical Gastroenterology)" },
  { id: 3, name: "Dr. Ankit Sharma", specialty: "Cardiology", subSpecialty: "Heart Transplant", hospital: "Medanta – The Medicity", city: "Gurugram", state: "Haryana", phone: "+91 124 414 1414", experience: 30, rating: 4.9, reviews: 2100, fee: "₹2,500", availability: "Mon–Sat, 9 AM – 3 PM", languages: ["Hindi", "English", "Punjabi"], transplantSpecialist: true, degrees: "MBBS, MD, DM (Cardiology), FACC" },
  { id: 4, name: "Dr. Kavitha Raman", specialty: "Hematology", subSpecialty: "Bone Marrow Transplant", hospital: "CMC Vellore", city: "Vellore", state: "Tamil Nadu", phone: "+91 416 228 1000", experience: 25, rating: 4.8, reviews: 760, fee: "₹1,200", availability: "Mon–Fri, 8 AM – 4 PM", languages: ["Tamil", "English", "Hindi"], transplantSpecialist: true, degrees: "MBBS, MD, DM (Clinical Hematology)" },
  { id: 5, name: "Dr. Rajesh Gupta", specialty: "Urology", subSpecialty: "Kidney Transplant Surgery", hospital: "Fortis Memorial", city: "Gurugram", state: "Haryana", phone: "+91 124 496 2222", experience: 20, rating: 4.6, reviews: 650, fee: "₹1,800", availability: "Tue–Sat, 10 AM – 6 PM", languages: ["Hindi", "English"], transplantSpecialist: true, degrees: "MBBS, MS, MCh (Urology)" },
  { id: 6, name: "Dr. Sneha Patil", specialty: "Neurology", subSpecialty: "Epilepsy & Stroke", hospital: "NIMHANS", city: "Bangalore", state: "Karnataka", phone: "+91 80 2699 5000", experience: 18, rating: 4.7, reviews: 540, fee: "₹1,000", availability: "Mon–Fri, 9 AM – 4 PM", languages: ["Kannada", "English", "Hindi"], transplantSpecialist: false, degrees: "MBBS, MD, DM (Neurology)" },
  { id: 7, name: "Dr. Farhan Khan", specialty: "Oncology", subSpecialty: "Surgical Oncology", hospital: "Tata Memorial Hospital", city: "Mumbai", state: "Maharashtra", phone: "+91 22 2417 7000", experience: 24, rating: 4.8, reviews: 1450, fee: "₹1,500", availability: "Mon–Sat, 8 AM – 2 PM", languages: ["Hindi", "English", "Marathi", "Urdu"], transplantSpecialist: false, degrees: "MBBS, MS, MCh (Surgical Oncology)" },
  { id: 8, name: "Dr. Meenakshi Iyer", specialty: "Hepatology", subSpecialty: "Liver Disease & Transplant", hospital: "Apollo Hospital", city: "Chennai", state: "Tamil Nadu", phone: "+91 44 2829 3333", experience: 19, rating: 4.7, reviews: 820, fee: "₹2,200", availability: "Mon–Fri, 10 AM – 5 PM", languages: ["Tamil", "English"], transplantSpecialist: true, degrees: "MBBS, MD, DM (Hepatology)" },
  { id: 9, name: "Dr. Amit Banerjee", specialty: "Pulmonology", subSpecialty: "Lung Transplant", hospital: "AMRI Hospital", city: "Kolkata", state: "West Bengal", phone: "+91 33 6606 3636", experience: 16, rating: 4.5, reviews: 380, fee: "₹1,200", availability: "Mon–Sat, 11 AM – 5 PM", languages: ["Bengali", "Hindi", "English"], transplantSpecialist: true, degrees: "MBBS, MD, DM (Pulmonary Medicine)" },
  { id: 10, name: "Dr. Pooja Reddy", specialty: "Pediatric Surgery", subSpecialty: "Pediatric Organ Transplant", hospital: "Narayana Health City", city: "Bangalore", state: "Karnataka", phone: "+91 80 7122 2222", experience: 15, rating: 4.6, reviews: 440, fee: "₹1,800", availability: "Mon–Fri, 9 AM – 3 PM", languages: ["Kannada", "Telugu", "English", "Hindi"], transplantSpecialist: true, degrees: "MBBS, MS, MCh (Pediatric Surgery)" },
];

const SPECIALTIES = [...new Set(DOCTORS.map((d) => d.specialty))].sort();
const CITIES = [...new Set(DOCTORS.map((d) => d.city))].sort();

export function DoctorDirectory() {
  const [search, setSearch] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [transplantOnly, setTransplantOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return DOCTORS.filter((d) => {
      const q = search.toLowerCase();
      const matchSearch = !search || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.hospital.toLowerCase().includes(q) || d.city.toLowerCase().includes(q);
      const matchSpec = !filterSpecialty || d.specialty === filterSpecialty;
      const matchCity = !filterCity || d.city === filterCity;
      const matchTransplant = !transplantOnly || d.transplantSpecialist;
      return matchSearch && matchSpec && matchCity && matchTransplant;
    });
  }, [search, filterSpecialty, filterCity, transplantOnly]);

  const clearFilters = () => { setSearch(""); setFilterSpecialty(""); setFilterCity(""); setTransplantOnly(false); };
  const hasFilters = search || filterSpecialty || filterCity || transplantOnly;

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p style={{ fontSize: "12px", color: "#c4b5fd", letterSpacing: "0.1em", fontWeight: 600 }} className="mb-3">FIND A SPECIALIST</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Doctor{" "}
            <span style={{ background: "linear-gradient(90deg, #a855f7, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Directory
            </span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(148,163,184,0.8)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Connect with {DOCTORS.length}+ verified transplant specialists, surgeons, and medical experts across India.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctors, specialties, hospitals..."
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all hover:bg-white/[0.08]"
              style={{
                background: showFilters ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.06)",
                border: showFilters ? "1px solid rgba(168,85,247,0.3)" : "1px solid rgba(255,255,255,0.1)",
                fontSize: "13px", fontWeight: 600, color: showFilters ? "#c4b5fd" : "rgba(255,255,255,0.7)",
              }}>
              <Filter size={14} /> Filters
              {hasFilters && <span className="w-2 h-2 rounded-full bg-purple-400" />}
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex-1">
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(148,163,184,0.7)", marginBottom: "6px", display: "block" }}>Specialty</label>
                <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "13px" }}>
                  <option value="" style={{ background: "#0f172a" }}>All Specialties</option>
                  {SPECIALTIES.map((s) => <option key={s} value={s} style={{ background: "#0f172a" }}>{s}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(148,163,184,0.7)", marginBottom: "6px", display: "block" }}>City</label>
                <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "13px" }}>
                  <option value="" style={{ background: "#0f172a" }}>All Cities</option>
                  {CITIES.map((c) => <option key={c} value={c} style={{ background: "#0f172a" }}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button onClick={() => setTransplantOnly(!transplantOnly)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
                  style={{
                    background: transplantOnly ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.06)",
                    border: transplantOnly ? "1px solid rgba(168,85,247,0.3)" : "1px solid rgba(255,255,255,0.1)",
                    fontSize: "12px", fontWeight: 600, color: transplantOnly ? "#c4b5fd" : "rgba(255,255,255,0.5)",
                  }}>
                  <Award size={12} /> Transplant
                </button>
                {hasFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/50 hover:text-white/80 transition-all"
                    style={{ fontSize: "12px" }}><X size={12} /> Clear</button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="flex items-center justify-between mb-4">
          <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.6)" }}>
            Showing <span className="text-white font-semibold">{filtered.length}</span> doctors
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="rounded-2xl p-5 transition-all hover:border-white/15"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #581c87, #7c3aed)" }}>
                  <Stethoscope size={24} color="white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>{d.name}</h3>
                    {d.transplantSpecialist && (
                      <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "9px", fontWeight: 700, background: "rgba(16,185,129,0.15)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.3)" }}>
                        TRANSPLANT
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "13px", color: "#c4b5fd", fontWeight: 600, marginBottom: "2px" }}>{d.specialty} · {d.subSpecialty}</p>
                  <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>{d.degrees}</p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star size={13} fill="#fbbf24" color="#fbbf24" />
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#fbbf24" }}>{d.rating}</span>
                  <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>({d.reviews})</span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
                <div className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}>
                  <MapPin size={11} className="flex-shrink-0" /> <span className="truncate">{d.hospital}, {d.city}</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}>
                  <GraduationCap size={11} className="flex-shrink-0" /> {d.experience} yrs experience
                </div>
                <div className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}>
                  <Calendar size={11} className="flex-shrink-0" /> <span className="truncate">{d.availability}</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}>
                  <Languages size={11} className="flex-shrink-0" /> <span className="truncate">{d.languages.join(", ")}</span>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>Consultation Fee</span>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "#6ee7b7" }}>{d.fee}</p>
                </div>
                <a href={`tel:${d.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #581c87, #7c3aed)", fontSize: "13px" }}>
                  <Phone size={13} /> Book / Call
                  <ChevronRight size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Stethoscope size={40} className="text-white/10 mx-auto mb-4" />
            <p style={{ fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>No doctors found</p>
            <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.5)" }}>Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 px-4 py-2 rounded-xl text-purple-400 hover:bg-white/[0.05] transition-all"
              style={{ fontSize: "13px", fontWeight: 600 }}>Clear all filters</button>
          </div>
        )}

        <div className="rounded-2xl p-4 mt-8" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
          <p style={{ fontSize: "12px", color: "rgba(196,181,253,0.8)", lineHeight: 1.6 }}>
            <strong>ℹ️ Note:</strong> Doctor listings are curated for demonstration. In production, all doctors are NMC (National Medical Commission) verified and linked to NOTTO-certified transplant programmes.
          </p>
        </div>
      </div>
    </div>
  );
}
