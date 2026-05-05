import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Search, MapPin, Phone, Clock, Building2, Filter, X, Star,
  Bed, Ambulance, Shield, ChevronRight, Navigation, Heart
} from "lucide-react";

type Hospital = {
  id: number;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  emergency: boolean;
  hours: string;
  type: "government" | "private" | "trust";
  specialties: string[];
  beds: number;
  rating: number;
  distance: string;
  transplantCenter: boolean;
};

const HOSPITALS: Hospital[] = [
  { id: 1, name: "AIIMS New Delhi", city: "New Delhi", state: "Delhi", address: "Sri Aurobindo Marg, Ansari Nagar", phone: "+91 11 2658 8500", emergency: true, hours: "24/7", type: "government", specialties: ["Cardiology", "Nephrology", "Neurosurgery", "Organ Transplant"], beds: 2478, rating: 4.8, distance: "2.3 km", transplantCenter: true },
  { id: 2, name: "Safdarjung Hospital", city: "New Delhi", state: "Delhi", address: "Ansari Nagar West, Ring Road", phone: "+91 11 2673 0000", emergency: true, hours: "24/7", type: "government", specialties: ["General Surgery", "Orthopedics", "Burns Unit", "Trauma"], beds: 1531, rating: 4.2, distance: "3.1 km", transplantCenter: false },
  { id: 3, name: "Apollo Hospital", city: "Chennai", state: "Tamil Nadu", address: "21 Greams Lane, Off Greams Road", phone: "+91 44 2829 3333", emergency: true, hours: "24/7", type: "private", specialties: ["Cardiac Surgery", "Liver Transplant", "Oncology", "Robotic Surgery"], beds: 710, rating: 4.7, distance: "5.8 km", transplantCenter: true },
  { id: 4, name: "Narayana Health City", city: "Bangalore", state: "Karnataka", address: "258/A, Bommasandra, Electronic City", phone: "+91 80 7122 2222", emergency: true, hours: "24/7", type: "private", specialties: ["Cardiac Sciences", "Nephrology", "Organ Transplant", "Pediatrics"], beds: 3200, rating: 4.6, distance: "8.2 km", transplantCenter: true },
  { id: 5, name: "KEM Hospital", city: "Mumbai", state: "Maharashtra", address: "Acharya Donde Marg, Parel", phone: "+91 22 2410 7000", emergency: true, hours: "24/7", type: "government", specialties: ["Trauma Surgery", "Nephrology", "Hematology", "Kidney Transplant"], beds: 1800, rating: 4.3, distance: "4.5 km", transplantCenter: true },
  { id: 6, name: "CMC Vellore", city: "Vellore", state: "Tamil Nadu", address: "Ida Scudder Road, Vellore", phone: "+91 416 228 1000", emergency: true, hours: "24/7", type: "trust", specialties: ["Neurology", "Hepatology", "Bone Marrow Transplant", "Endocrinology"], beds: 2700, rating: 4.9, distance: "12.0 km", transplantCenter: true },
  { id: 7, name: "Medanta - The Medicity", city: "Gurugram", state: "Haryana", address: "CH Baktawar Singh Rd, Sector 38", phone: "+91 124 414 1414", emergency: true, hours: "24/7", type: "private", specialties: ["Heart Surgery", "Liver Transplant", "Kidney Transplant", "Oncology"], beds: 1250, rating: 4.7, distance: "15.4 km", transplantCenter: true },
  { id: 8, name: "PGIMER Chandigarh", city: "Chandigarh", state: "Chandigarh", address: "Sector 12, Chandigarh", phone: "+91 172 274 6018", emergency: true, hours: "24/7", type: "government", specialties: ["Hepatology", "Nephrology", "Neurosurgery", "Organ Transplant"], beds: 1968, rating: 4.8, distance: "6.7 km", transplantCenter: true },
  { id: 9, name: "Amrita Hospital", city: "Kochi", state: "Kerala", address: "AIMS Ponekkara PO, Kochi", phone: "+91 484 285 1234", emergency: true, hours: "24/7", type: "trust", specialties: ["Cardiology", "Gastroenterology", "Organ Transplant", "Oncology"], beds: 1350, rating: 4.5, distance: "9.1 km", transplantCenter: true },
  { id: 10, name: "NIMHANS", city: "Bangalore", state: "Karnataka", address: "Hosur Road, Lakkasandra", phone: "+91 80 2699 5000", emergency: true, hours: "24/7", type: "government", specialties: ["Neurology", "Psychiatry", "Neurosurgery", "Mental Health"], beds: 950, rating: 4.6, distance: "7.3 km", transplantCenter: false },
  { id: 11, name: "Fortis Memorial Research Institute", city: "Gurugram", state: "Haryana", address: "Sector 44, Gurugram", phone: "+91 124 496 2222", emergency: true, hours: "24/7", type: "private", specialties: ["Kidney Transplant", "Bone Marrow", "Cardiac Sciences", "Urology"], beds: 1000, rating: 4.5, distance: "14.2 km", transplantCenter: true },
  { id: 12, name: "SCTIMST", city: "Thiruvananthapuram", state: "Kerala", address: "Medical College PO, Trivandrum", phone: "+91 471 252 4600", emergency: true, hours: "24/7", type: "government", specialties: ["Cardiology", "Cardiovascular Surgery", "Organ Transplant"], beds: 450, rating: 4.7, distance: "18.5 km", transplantCenter: true },
];

const CITIES = [...new Set(HOSPITALS.map((h) => h.city))].sort();
const ALL_SPECIALTIES = [...new Set(HOSPITALS.flatMap((h) => h.specialties))].sort();
const TYPE_LABELS = { government: "Govt", private: "Private", trust: "Trust" };
const TYPE_COLORS = { government: "#3b82f6", private: "#a855f7", trust: "#10b981" };

export function NearbyHospitals() {
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [transplantOnly, setTransplantOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return HOSPITALS.filter((h) => {
      const q = search.toLowerCase();
      const matchSearch = !search || h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q) || h.specialties.some((s) => s.toLowerCase().includes(q));
      const matchCity = !filterCity || h.city === filterCity;
      const matchSpec = !filterSpecialty || h.specialties.includes(filterSpecialty);
      const matchTransplant = !transplantOnly || h.transplantCenter;
      return matchSearch && matchCity && matchSpec && matchTransplant;
    });
  }, [search, filterCity, filterSpecialty, transplantOnly]);

  const clearFilters = () => { setSearch(""); setFilterCity(""); setFilterSpecialty(""); setTransplantOnly(false); };
  const hasFilters = search || filterCity || filterSpecialty || transplantOnly;

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p style={{ fontSize: "12px", color: "#93c5fd", letterSpacing: "0.1em", fontWeight: 600 }} className="mb-3">FIND MEDICAL CARE</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Nearby{" "}
            <span style={{ background: "linear-gradient(90deg, #10b981, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Hospitals
            </span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(148,163,184,0.8)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Locate {HOSPITALS.length}+ hospitals across India — transplant centres, trauma units, and emergency care near you.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hospitals, cities, or specialties..."
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all hover:bg-white/[0.08]"
              style={{
                background: showFilters ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)",
                border: showFilters ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(255,255,255,0.1)",
                fontSize: "13px", fontWeight: 600, color: showFilters ? "#6ee7b7" : "rgba(255,255,255,0.7)",
              }}>
              <Filter size={14} /> Filters
              {hasFilters && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex-1">
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(148,163,184,0.7)", marginBottom: "6px", display: "block" }}>City</label>
                <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "13px" }}>
                  <option value="" style={{ background: "#0f172a" }}>All Cities</option>
                  {CITIES.map((c) => <option key={c} value={c} style={{ background: "#0f172a" }}>{c}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(148,163,184,0.7)", marginBottom: "6px", display: "block" }}>Specialty</label>
                <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "13px" }}>
                  <option value="" style={{ background: "#0f172a" }}>All Specialties</option>
                  {ALL_SPECIALTIES.map((s) => <option key={s} value={s} style={{ background: "#0f172a" }}>{s}</option>)}
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button onClick={() => setTransplantOnly(!transplantOnly)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
                  style={{
                    background: transplantOnly ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.06)",
                    border: transplantOnly ? "1px solid rgba(220,38,38,0.3)" : "1px solid rgba(255,255,255,0.1)",
                    fontSize: "12px", fontWeight: 600, color: transplantOnly ? "#fca5a5" : "rgba(255,255,255,0.5)",
                  }}>
                  <Heart size={12} /> Transplant
                </button>
                {hasFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/50 hover:text-white/80 transition-all"
                    style={{ fontSize: "12px" }}><X size={12} /> Clear</button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results */}
        <div className="flex items-center justify-between mb-4">
          <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.6)" }}>
            Showing <span className="text-white font-semibold">{filtered.length}</span> hospitals
          </p>
        </div>

        {/* Hospital Cards */}
        <div className="flex flex-col gap-4">
          {filtered.map((h, i) => (
            <motion.div key={h.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              className="rounded-2xl p-5 transition-all hover:border-white/15 group"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

              {/* Top Row */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full"
                      style={{ fontSize: "10px", fontWeight: 700, background: `${TYPE_COLORS[h.type]}20`, color: TYPE_COLORS[h.type], border: `1px solid ${TYPE_COLORS[h.type]}40` }}>
                      {TYPE_LABELS[h.type]}
                    </span>
                    {h.emergency && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                        style={{ fontSize: "10px", fontWeight: 700, background: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)" }}>
                        <Ambulance size={10} /> 24/7 Emergency
                      </span>
                    )}
                    {h.transplantCenter && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                        style={{ fontSize: "10px", fontWeight: 700, background: "rgba(16,185,129,0.15)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.3)" }}>
                        <Shield size={10} /> Transplant Centre
                      </span>
                    )}
                    <span className="flex items-center gap-1" style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>
                      <MapPin size={10} /> {h.city}, {h.state}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
                    <Building2 size={15} className="inline mr-1.5 text-white/30" />{h.name}
                  </h3>
                  <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)", marginBottom: "10px" }}>{h.address}</p>

                  <div className="flex items-center gap-4 flex-wrap mb-3">
                    <span className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}><Phone size={11} /> {h.phone}</span>
                    <span className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}><Clock size={11} /> {h.hours}</span>
                    <span className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}><Bed size={11} /> {h.beds} Beds</span>
                    <span className="flex items-center gap-1" style={{ fontSize: "12px", color: "#fbbf24" }}><Star size={11} fill="#fbbf24" /> {h.rating}</span>
                    <span className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "#6ee7b7" }}><Navigation size={11} /> {h.distance}</span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5">
                    {h.specialties.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg" style={{ fontSize: "11px", fontWeight: 500, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row lg:flex-col gap-2 lg:w-[160px] flex-shrink-0">
                  <a href={`tel:${h.phone.replace(/\s/g, "")}`}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #065f46, #059669)", fontSize: "13px" }}>
                    <Phone size={13} /> Call Now
                  </a>
                  <a href={`https://www.google.com/maps/search/${encodeURIComponent(h.name + " " + h.city)}`} target="_blank" rel="noreferrer"
                    className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all hover:bg-white/[0.08]"
                    style={{ border: "1px solid rgba(255,255,255,0.12)", fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
                    <Navigation size={13} /> Directions
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Building2 size={40} className="text-white/10 mx-auto mb-4" />
            <p style={{ fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>No hospitals found</p>
            <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.5)" }}>Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 px-4 py-2 rounded-xl text-emerald-400 hover:bg-white/[0.05] transition-all"
              style={{ fontSize: "13px", fontWeight: 600 }}>Clear all filters</button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-2xl p-4 mt-8" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
          <p style={{ fontSize: "12px", color: "rgba(147,197,253,0.8)", lineHeight: 1.6 }}>
            <strong>ℹ️ Note:</strong> Hospital data is curated for demonstration. In production, this integrates with NHA (National Health Authority) and NOTTO databases for real-time bed availability and transplant centre verification.
          </p>
        </div>
      </div>
    </div>
  );
}
