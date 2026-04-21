import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, MapPin, Phone, Clock, Droplets, Filter, Building, CheckCircle, X } from "lucide-react";

type AvailabilityStatus = "available" | "low" | "unavailable";

type BloodBank = {
  id: number;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  hours: string;
  type: "government" | "private" | "ngo";
  inventory: Record<string, AvailabilityStatus>;
};

const BLOOD_BANKS: BloodBank[] = [
  { id: 1, name: "Indian Red Cross Blood Bank", city: "New Delhi", state: "Delhi", address: "1 Red Cross Road, Near Parliament House", phone: "+91 11 2371 6441", hours: "24/7", type: "ngo",
    inventory: { "A+": "available", "A−": "low", "B+": "available", "B−": "available", "AB+": "available", "AB−": "unavailable", "O+": "available", "O−": "low" } },
  { id: 2, name: "AIIMS Blood Bank", city: "New Delhi", state: "Delhi", address: "Ansari Nagar East, AIIMS Campus", phone: "+91 11 2658 8700", hours: "24/7", type: "government",
    inventory: { "A+": "available", "A−": "available", "B+": "available", "B−": "low", "AB+": "low", "AB−": "unavailable", "O+": "available", "O−": "available" } },
  { id: 3, name: "Prathama Blood Centre", city: "Ahmedabad", state: "Gujarat", address: "Ellisbridge, Near Municipal Market", phone: "+91 79 2657 6500", hours: "8 AM – 8 PM", type: "ngo",
    inventory: { "A+": "available", "A−": "low", "B+": "available", "B−": "available", "AB+": "available", "AB−": "low", "O+": "available", "O−": "low" } },
  { id: 4, name: "Tata Memorial Hospital Blood Bank", city: "Mumbai", state: "Maharashtra", address: "Dr Ernest Borges Road, Parel", phone: "+91 22 2417 7000", hours: "24/7", type: "government",
    inventory: { "A+": "available", "A−": "available", "B+": "available", "B−": "available", "AB+": "low", "AB−": "unavailable", "O+": "available", "O−": "low" } },
  { id: 5, name: "Rotary TTK Blood Bank", city: "Chennai", state: "Tamil Nadu", address: "69 Poonamallee High Rd, Egmore", phone: "+91 44 2819 0000", hours: "24/7", type: "ngo",
    inventory: { "A+": "available", "A−": "low", "B+": "available", "B−": "low", "AB+": "available", "AB−": "unavailable", "O+": "available", "O−": "available" } },
  { id: 6, name: "KEM Hospital Blood Bank", city: "Mumbai", state: "Maharashtra", address: "Acharya Donde Marg, Parel", phone: "+91 22 2410 7000", hours: "24/7", type: "government",
    inventory: { "A+": "low", "A−": "unavailable", "B+": "available", "B−": "available", "AB+": "available", "AB−": "low", "O+": "available", "O−": "unavailable" } },
  { id: 7, name: "Narayana Health Blood Bank", city: "Bangalore", state: "Karnataka", address: "258/A Bommasandra, Electronic City", phone: "+91 80 7122 2222", hours: "8 AM – 10 PM", type: "private",
    inventory: { "A+": "available", "A−": "available", "B+": "available", "B−": "available", "AB+": "available", "AB−": "available", "O+": "available", "O−": "low" } },
  { id: 8, name: "PGI Blood Bank", city: "Chandigarh", state: "Chandigarh", address: "Sector 12, PGI Campus", phone: "+91 172 275 6565", hours: "24/7", type: "government",
    inventory: { "A+": "available", "A−": "low", "B+": "available", "B−": "low", "AB+": "low", "AB−": "unavailable", "O+": "available", "O−": "low" } },
  { id: 9, name: "Apollo Blood Bank", city: "Hyderabad", state: "Telangana", address: "Jubilee Hills, Road No. 72", phone: "+91 40 2360 7777", hours: "7 AM – 11 PM", type: "private",
    inventory: { "A+": "available", "A−": "available", "B+": "available", "B−": "available", "AB+": "available", "AB−": "low", "O+": "available", "O−": "available" } },
  { id: 10, name: "CMC Vellore Blood Bank", city: "Vellore", state: "Tamil Nadu", address: "Ida Scudder Rd, Vellore", phone: "+91 416 228 1000", hours: "24/7", type: "government",
    inventory: { "A+": "available", "A−": "available", "B+": "available", "B−": "low", "AB+": "available", "AB−": "unavailable", "O+": "available", "O−": "low" } },
  { id: 11, name: "Sankalp India Blood Bank", city: "Bangalore", state: "Karnataka", address: "Jayanagar 4th Block, South Bangalore", phone: "+91 80 2653 5959", hours: "9 AM – 7 PM", type: "ngo",
    inventory: { "A+": "available", "A−": "low", "B+": "available", "B−": "available", "AB+": "low", "AB−": "unavailable", "O+": "available", "O−": "low" } },
  { id: 12, name: "AMRI Hospital Blood Bank", city: "Kolkata", state: "West Bengal", address: "JC 16-17, Salt Lake City, Sector III", phone: "+91 33 6606 3636", hours: "24/7", type: "private",
    inventory: { "A+": "available", "A−": "available", "B+": "available", "B−": "available", "AB+": "available", "AB−": "low", "O+": "available", "O−": "available" } },
];

const STATES = [...new Set(BLOOD_BANKS.map((b) => b.state))].sort();
const BLOOD_TYPES = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const TYPE_LABELS = { government: "Govt", private: "Private", ngo: "NGO" };
const TYPE_COLORS = { government: "#3b82f6", private: "#a855f7", ngo: "#10b981" };

const STATUS_CONFIG: Record<AvailabilityStatus, { label: string; color: string; bg: string }> = {
  available: { label: "Available", color: "#6ee7b7", bg: "rgba(16,185,129,0.15)" },
  low: { label: "Low", color: "#fde68a", bg: "rgba(245,158,11,0.15)" },
  unavailable: { label: "Out", color: "#fca5a5", bg: "rgba(220,38,38,0.15)" },
};

export function BloodBankDirectory() {
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterBlood, setFilterBlood] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return BLOOD_BANKS.filter((bank) => {
      const matchesSearch = !search || bank.name.toLowerCase().includes(search.toLowerCase()) ||
        bank.city.toLowerCase().includes(search.toLowerCase()) ||
        bank.address.toLowerCase().includes(search.toLowerCase());
      const matchesState = !filterState || bank.state === filterState;
      const matchesBlood = !filterBlood || bank.inventory[filterBlood] === "available";
      return matchesSearch && matchesState && matchesBlood;
    });
  }, [search, filterState, filterBlood]);

  const clearFilters = () => { setSearch(""); setFilterState(""); setFilterBlood(""); };
  const hasFilters = search || filterState || filterBlood;

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p style={{ fontSize: "12px", color: "#93c5fd", letterSpacing: "0.1em", fontWeight: 600 }} className="mb-3">FIND A BLOOD BANK</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Blood Bank{" "}
            <span style={{ background: "linear-gradient(90deg, #dc2626, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Directory
            </span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(148,163,184,0.8)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Search {BLOOD_BANKS.length}+ blood banks across India with real-time availability status.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, city, or address..."
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl transition-all hover:bg-white/[0.08]"
              style={{
                background: showFilters ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.06)",
                border: showFilters ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(255,255,255,0.1)",
                fontSize: "13px", fontWeight: 600, color: showFilters ? "#93c5fd" : "rgba(255,255,255,0.7)",
              }}
            >
              <Filter size={14} /> Filters
              {hasFilters && <span className="w-2 h-2 rounded-full bg-blue-400" />}
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex-1">
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(148,163,184,0.7)", marginBottom: "6px", display: "block" }}>State</label>
                <select value={filterState} onChange={(e) => setFilterState(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "13px" }}>
                  <option value="" style={{ background: "#0f172a" }}>All States</option>
                  {STATES.map((s) => <option key={s} value={s} style={{ background: "#0f172a" }}>{s}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label style={{ fontSize: "11px", fontWeight: 600, color: "rgba(148,163,184,0.7)", marginBottom: "6px", display: "block" }}>Blood Type Available</label>
                <select value={filterBlood} onChange={(e) => setFilterBlood(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-white outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "13px" }}>
                  <option value="" style={{ background: "#0f172a" }}>Any Type</option>
                  {BLOOD_TYPES.map((bt) => <option key={bt} value={bt} style={{ background: "#0f172a" }}>{bt}</option>)}
                </select>
              </div>
              {hasFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/50 hover:text-white/80 self-end transition-all"
                  style={{ fontSize: "12px" }}>
                  <X size={12} /> Clear
                </button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.6)" }}>
            Showing <span className="text-white font-semibold">{filtered.length}</span> blood banks
          </p>
        </div>

        {/* Bank Cards */}
        <div className="flex flex-col gap-4">
          {filtered.map((bank, i) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl p-5 transition-all hover:border-white/15"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full"
                      style={{ fontSize: "10px", fontWeight: 700, background: `${TYPE_COLORS[bank.type]}20`, color: TYPE_COLORS[bank.type], border: `1px solid ${TYPE_COLORS[bank.type]}40` }}>
                      {TYPE_LABELS[bank.type]}
                    </span>
                    <span className="flex items-center gap-1" style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>
                      <MapPin size={10} /> {bank.city}, {bank.state}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
                    <Building size={14} className="inline mr-1.5 text-white/30" />{bank.name}
                  </h3>
                  <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)", marginBottom: "8px" }}>{bank.address}</p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}>
                      <Phone size={11} /> {bank.phone}
                    </span>
                    <span className="flex items-center gap-1.5" style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}>
                      <Clock size={11} /> {bank.hours}
                    </span>
                  </div>
                </div>

                {/* Inventory */}
                <div className="flex flex-wrap gap-1.5 lg:w-[340px] lg:flex-shrink-0">
                  {BLOOD_TYPES.map((bt) => {
                    const status = bank.inventory[bt] as AvailabilityStatus;
                    const config = STATUS_CONFIG[status];
                    return (
                      <div key={bt} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                        style={{ background: config.bg, minWidth: "72px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>{bt}</span>
                        <span style={{ fontSize: "10px", fontWeight: 500, color: config.color }}>{config.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Droplets size={40} className="text-white/10 mx-auto mb-4" />
            <p style={{ fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>No blood banks found</p>
            <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.5)" }}>Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 px-4 py-2 rounded-xl text-blue-400 hover:bg-white/[0.05] transition-all"
              style={{ fontSize: "13px", fontWeight: 600 }}>
              Clear all filters
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-2xl p-4 mt-8" style={{ background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)" }}>
          <p style={{ fontSize: "12px", color: "rgba(253,230,138,0.8)", lineHeight: 1.6 }}>
            <strong>⚠️ Disclaimer:</strong> Blood availability data is simulated for demonstration purposes. In production, this would be integrated with the eRaktKosh API (Government of India's blood bank management system) for real-time inventory.
          </p>
        </div>
      </div>
    </div>
  );
}
