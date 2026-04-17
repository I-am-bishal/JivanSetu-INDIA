import { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin, Heart, Droplets, Activity, Filter, Clock,
  AlertTriangle, ChevronRight, X
} from "lucide-react";

type CityDot = {
  id: string;
  name: string;
  state: string;
  x: number;
  y: number;
  bloodRequests: number;
  organRequests: number;
  severity: "critical" | "high" | "moderate";
  topNeeds: string[];
};

const CITIES: CityDot[] = [
  { id: "del", name: "New Delhi", state: "Delhi", x: 298, y: 175, bloodRequests: 24, organRequests: 8, severity: "critical", topNeeds: ["O− Blood", "Kidney", "B+ Blood"] },
  { id: "mum", name: "Mumbai", state: "Maharashtra", x: 218, y: 340, bloodRequests: 31, organRequests: 12, severity: "critical", topNeeds: ["AB+ Blood", "Liver", "Cornea"] },
  { id: "che", name: "Chennai", state: "Tamil Nadu", x: 310, y: 460, bloodRequests: 18, organRequests: 5, severity: "high", topNeeds: ["A+ Blood", "Kidney", "Heart"] },
  { id: "blr", name: "Bangalore", state: "Karnataka", x: 270, y: 440, bloodRequests: 14, organRequests: 7, severity: "high", topNeeds: ["O+ Blood", "Liver", "Cornea"] },
  { id: "kol", name: "Kolkata", state: "West Bengal", x: 420, y: 250, bloodRequests: 20, organRequests: 4, severity: "high", topNeeds: ["B− Blood", "Kidney"] },
  { id: "hyd", name: "Hyderabad", state: "Telangana", x: 290, y: 380, bloodRequests: 11, organRequests: 6, severity: "moderate", topNeeds: ["A− Blood", "Liver"] },
  { id: "ahm", name: "Ahmedabad", state: "Gujarat", x: 195, y: 265, bloodRequests: 9, organRequests: 3, severity: "moderate", topNeeds: ["O+ Blood", "Cornea"] },
  { id: "pun", name: "Pune", state: "Maharashtra", x: 235, y: 355, bloodRequests: 12, organRequests: 4, severity: "high", topNeeds: ["B+ Blood", "Kidney"] },
  { id: "jai", name: "Jaipur", state: "Rajasthan", x: 245, y: 200, bloodRequests: 7, organRequests: 2, severity: "moderate", topNeeds: ["AB− Blood", "Cornea"] },
  { id: "lko", name: "Lucknow", state: "Uttar Pradesh", x: 330, y: 200, bloodRequests: 15, organRequests: 5, severity: "high", topNeeds: ["O− Blood", "Kidney", "Heart"] },
  { id: "pat", name: "Patna", state: "Bihar", x: 388, y: 215, bloodRequests: 10, organRequests: 3, severity: "moderate", topNeeds: ["A+ Blood", "Liver"] },
  { id: "chd", name: "Chandigarh", state: "Punjab", x: 278, y: 145, bloodRequests: 6, organRequests: 2, severity: "moderate", topNeeds: ["B− Blood", "Cornea"] },
  { id: "tvm", name: "Thiruvananthapuram", state: "Kerala", x: 260, y: 500, bloodRequests: 8, organRequests: 4, severity: "high", topNeeds: ["O+ Blood", "Heart"] },
  { id: "gwh", name: "Guwahati", state: "Assam", x: 475, y: 200, bloodRequests: 5, organRequests: 1, severity: "moderate", topNeeds: ["B+ Blood"] },
  { id: "bho", name: "Bhopal", state: "Madhya Pradesh", x: 280, y: 280, bloodRequests: 8, organRequests: 2, severity: "moderate", topNeeds: ["A+ Blood", "Kidney"] },
];

const SEVERITY_CONFIG = {
  critical: { color: "#ef4444", glow: "rgba(239,68,68,0.6)", label: "Critical", bg: "rgba(220,38,38,0.15)" },
  high: { color: "#f59e0b", glow: "rgba(245,158,11,0.5)", label: "High", bg: "rgba(217,119,6,0.12)" },
  moderate: { color: "#10b981", glow: "rgba(16,185,129,0.4)", label: "Moderate", bg: "rgba(5,150,105,0.1)" },
};

const REGION_STATS = [
  { region: "North India", blood: 52, organ: 17, color: "#3b82f6" },
  { region: "West India", blood: 52, organ: 19, color: "#f59e0b" },
  { region: "South India", blood: 50, organ: 22, color: "#10b981" },
  { region: "East India", blood: 35, organ: 8, color: "#a855f7" },
];

export function LiveHeatmap() {
  const [filter, setFilter] = useState<"all" | "blood" | "organ">("all");
  const [severityFilter, setSeverityFilter] = useState<"all" | "critical" | "high" | "moderate">("all");
  const [selectedCity, setSelectedCity] = useState<CityDot | null>(null);

  const filtered = CITIES.filter((c) => {
    if (severityFilter !== "all" && c.severity !== severityFilter) return false;
    if (filter === "blood" && c.bloodRequests === 0) return false;
    if (filter === "organ" && c.organRequests === 0) return false;
    return true;
  });

  const totalBlood = CITIES.reduce((s, c) => s + c.bloodRequests, 0);
  const totalOrgan = CITIES.reduce((s, c) => s + c.organRequests, 0);
  const criticalCount = CITIES.filter((c) => c.severity === "critical").length;

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#060d1f" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span style={{ fontSize: "12px", color: "#f87171", fontWeight: 700, letterSpacing: "0.1em" }}>
              LIVE HEATMAP
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "white", marginBottom: "4px" }}>
            India — Urgency Heatmap
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)" }}>
            Real-time visualization of blood and organ requirements across India
          </p>
        </motion.div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Blood Requests", value: totalBlood, icon: <Droplets size={16} />, color: "#dc2626" },
            { label: "Organ Requests", value: totalOrgan, icon: <Heart size={16} />, color: "#2563eb" },
            { label: "Cities Monitored", value: CITIES.length, icon: <MapPin size={16} />, color: "#f59e0b" },
            { label: "Critical Zones", value: criticalCount, icon: <AlertTriangle size={16} />, color: "#ef4444" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}22`, color: s.color }}>{s.icon}</div>
              </div>
              <p style={{ fontSize: "24px", fontWeight: 800, color: "white" }}>{s.value}</p>
              <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "blood", "organ"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl capitalize transition-all"
              style={{
                fontSize: "13px", fontWeight: filter === f ? 600 : 400,
                background: filter === f ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                border: filter === f ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color: filter === f ? "white" : "rgba(255,255,255,0.5)",
              }}
            >{f === "all" ? "All Types" : f}</button>
          ))}
          <div className="w-px bg-white/10 mx-1" />
          {(["all", "critical", "high", "moderate"] as const).map((s) => (
            <button key={s} onClick={() => setSeverityFilter(s)}
              className="px-3 py-2 rounded-xl capitalize transition-all flex items-center gap-1.5"
              style={{
                fontSize: "12px", fontWeight: severityFilter === s ? 600 : 400,
                background: severityFilter === s ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                border: severityFilter === s ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.06)",
                color: severityFilter === s ? "white" : "rgba(255,255,255,0.4)",
              }}
            >
              {s === "all" && <Filter size={11} />}
              {s !== "all" && <span className="w-2 h-2 rounded-full" style={{ background: SEVERITY_CONFIG[s].color }} />}
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map Area */}
          <div className="flex-1 rounded-3xl overflow-hidden relative"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", minHeight: "520px" }}>

            {/* Map Header */}
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-white/40" />
                <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>Last updated: just now</span>
              </div>
              <div className="flex items-center gap-3">
                {Object.entries(SEVERITY_CONFIG).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: val.color }} />
                    <span style={{ fontSize: "10px", color: "rgba(148,163,184,0.6)" }}>{val.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SVG Map */}
            <div className="relative p-4" style={{ minHeight: "460px" }}>
              <svg viewBox="140 80 400 480" className="w-full h-full" style={{ maxHeight: "460px" }}>
                {/* India outline simplified */}
                <path
                  d="M270,100 L310,95 L340,110 L360,100 L380,115 L400,110 L430,130 L460,145 L490,170 L500,200 L490,220 L470,240 L450,260 L440,290 L430,310 L420,340 L410,360 L390,380 L380,400 L370,420 L350,440 L330,460 L310,475 L290,490 L270,510 L255,505 L245,490 L240,470 L250,450 L260,430 L250,410 L240,390 L230,370 L210,360 L200,340 L190,310 L185,280 L180,260 L175,240 L190,220 L200,200 L210,180 L230,160 L240,140 L250,120 Z"
                  fill="rgba(37,99,235,0.06)"
                  stroke="rgba(37,99,235,0.15)"
                  strokeWidth="1.5"
                />

                {/* City dots */}
                {filtered.map((city) => {
                  const sev = SEVERITY_CONFIG[city.severity];
                  return (
                    <g key={city.id} onClick={() => setSelectedCity(city)} className="cursor-pointer">
                      {/* Glow */}
                      <circle cx={city.x} cy={city.y} r={city.severity === "critical" ? 18 : 14} fill={sev.glow} opacity={0.2}>
                        {city.severity === "critical" && (
                          <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
                        )}
                      </circle>
                      {/* Dot */}
                      <circle cx={city.x} cy={city.y} r={6 + (city.bloodRequests + city.organRequests) / 8} fill={sev.color} opacity={0.9} />
                      <circle cx={city.x} cy={city.y} r={3} fill="white" opacity={0.8} />
                      {/* Label */}
                      <text x={city.x} y={city.y - 14} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontWeight="600" fontFamily="'Noto Sans', sans-serif">
                        {city.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* City Tooltip */}
              {selectedCity && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 w-72 rounded-2xl p-5 z-10"
                  style={{ background: "rgba(15,23,42,0.95)", border: `1px solid ${SEVERITY_CONFIG[selectedCity.severity].color}44`, backdropFilter: "blur(20px)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>{selectedCity.name}</p>
                      <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)" }}>{selectedCity.state}</p>
                    </div>
                    <button onClick={() => setSelectedCity(null)} className="text-white/40 hover:text-white transition-all"><X size={16} /></button>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 w-fit"
                    style={{ background: SEVERITY_CONFIG[selectedCity.severity].bg, border: `1px solid ${SEVERITY_CONFIG[selectedCity.severity].color}44` }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: SEVERITY_CONFIG[selectedCity.severity].color }} />
                    <span style={{ fontSize: "10px", fontWeight: 700, color: SEVERITY_CONFIG[selectedCity.severity].color, letterSpacing: "0.06em" }}>
                      {SEVERITY_CONFIG[selectedCity.severity].label.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-xl p-3" style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)" }}>
                      <p style={{ fontSize: "20px", fontWeight: 800, color: "#fca5a5" }}>{selectedCity.bloodRequests}</p>
                      <p style={{ fontSize: "10px", color: "rgba(252,165,165,0.6)" }}>Blood Requests</p>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}>
                      <p style={{ fontSize: "20px", fontWeight: 800, color: "#93c5fd" }}>{selectedCity.organRequests}</p>
                      <p style={{ fontSize: "10px", color: "rgba(147,197,253,0.6)" }}>Organ Requests</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", marginBottom: "6px" }}>Top Needs:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCity.topNeeds.map((need) => (
                      <span key={need} className="px-2.5 py-1 rounded-full" style={{ fontSize: "11px", color: "white", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        {need}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-72 flex flex-col gap-4">
            {/* Region breakdown */}
            <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "12px" }}>REGIONAL BREAKDOWN</p>
              <div className="flex flex-col gap-3">
                {REGION_STATS.map((r) => (
                  <div key={r.region}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{r.region}</span>
                      <span style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)" }}>{r.blood + r.organ} total</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full" style={{ width: `${((r.blood + r.organ) / 80) * 100}%`, background: r.color }} />
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span style={{ fontSize: "10px", color: "rgba(220,38,38,0.7)" }}>🩸 {r.blood}</span>
                      <span style={{ fontSize: "10px", color: "rgba(37,99,235,0.7)" }}>🫀 {r.organ}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top urgent cities */}
            <div className="rounded-3xl p-5" style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)" }}>
              <p style={{ fontSize: "11px", color: "#fca5a5", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "12px" }}>MOST URGENT CITIES</p>
              <div className="flex flex-col gap-2">
                {CITIES.filter((c) => c.severity === "critical").map((c) => (
                  <button key={c.id} onClick={() => setSelectedCity(c)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl transition-all hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span style={{ fontSize: "13px", color: "white", fontWeight: 500 }}>{c.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span style={{ fontSize: "12px", color: "#fca5a5", fontWeight: 700 }}>{c.bloodRequests + c.organRequests}</span>
                      <ChevronRight size={12} className="text-white/30" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity info */}
            <div className="rounded-3xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Activity size={13} className="text-green-400" />
                <span style={{ fontSize: "11px", color: "#6ee7b7", fontWeight: 600 }}>LIVE DATA FEED</span>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)", lineHeight: 1.5 }}>
                Data is aggregated from NOTTO-registered hospitals, blood banks, and verified SOS requests on JivanSetu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
