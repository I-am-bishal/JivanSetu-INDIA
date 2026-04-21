import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  AlertTriangle, MapPin, Clock, Heart, Droplets, Filter, Search,
  Phone, ArrowRight, Activity, ChevronDown, CheckCircle
} from "lucide-react";
import { useThemeStyles } from "../ThemeContext";

type SeverityType = "critical" | "high" | "moderate";
type NeedType = "organ" | "blood";

interface SOSRequest {
  id: number;
  name: string;
  age: number;
  type: NeedType;
  need: string;
  bloodType?: string;
  organ?: string;
  hospital: string;
  city: string;
  state: string;
  distance: number;
  timeAgo: string;
  severity: SeverityType;
  contactName: string;
  contactPhone: string;
  note: string;
  verified: boolean;
}

const SOS_DATA: SOSRequest[] = [
  { id: 1, name: "Arjun Sharma", age: 34, type: "blood", need: "O− Blood", bloodType: "O−", hospital: "AIIMS New Delhi", city: "New Delhi", state: "Delhi", distance: 2.4, timeAgo: "2 min ago", severity: "critical", contactName: "Dr. Preeti Kapoor", contactPhone: "+91-11-26588500", note: "Post-accident trauma. ICU. Needs immediate 4 units.", verified: true },
  { id: 2, name: "Meera Pillai", age: 52, type: "organ", need: "Kidney", organ: "Kidney", hospital: "KEM Hospital", city: "Mumbai", state: "Maharashtra", distance: 5.8, timeAgo: "8 min ago", severity: "critical", contactName: "Dr. Rajan Mehta", contactPhone: "+91-22-24107000", note: "End-stage renal disease. On dialysis for 3 years. Cadaveric match needed.", verified: true },
  { id: 3, name: "Suresh Kumar", age: 28, type: "blood", need: "AB+ Blood", bloodType: "AB+", hospital: "Apollo Hospitals", city: "Chennai", state: "Tamil Nadu", distance: 12.1, timeAgo: "15 min ago", severity: "high", contactName: "Dr. Lakshmi Venkat", contactPhone: "+91-44-28290200", note: "Surgery scheduled in 6 hours. Requires 2 units of packed RBC.", verified: true },
  { id: 4, name: "Fatima Begum", age: 47, type: "organ", need: "Liver", organ: "Liver", hospital: "Narayana Health", city: "Bangalore", state: "Karnataka", distance: 7.3, timeAgo: "22 min ago", severity: "high", contactName: "Dr. Sanjay Gupta", contactPhone: "+91-80-71222222", note: "MELD score 32. Registered with NOTTO. Partial liver from living donor considered.", verified: true },
  { id: 5, name: "Priya Nandakumar", age: 19, type: "blood", need: "B− Blood", bloodType: "B−", hospital: "PGI Chandigarh", city: "Chandigarh", state: "Punjab", distance: 15.6, timeAgo: "31 min ago", severity: "critical", contactName: "Dr. Harpreet Singh", contactPhone: "+91-172-2755555", note: "Rare blood type. Thalassemia patient. Regular transfusion required.", verified: true },
  { id: 6, name: "Rajan Mani", age: 63, type: "organ", need: "Cornea", organ: "Cornea", hospital: "Sankara Nethralaya", city: "Chennai", state: "Tamil Nadu", distance: 23.4, timeAgo: "45 min ago", severity: "moderate", contactName: "Dr. Usha Priya", contactPhone: "+91-44-28254180", note: "Bilateral corneal opacity. Vision < 6/60. Will restore full sight.", verified: true },
  { id: 7, name: "Ananya Trivedi", age: 41, type: "blood", need: "A+ Blood", bloodType: "A+", hospital: "Tata Memorial Centre", city: "Mumbai", state: "Maharashtra", distance: 9.1, timeAgo: "1 hr ago", severity: "high", contactName: "Dr. Prashant Bhai", contactPhone: "+91-22-24177000", note: "Chemotherapy patient. Hemoglobin dropped to 6.2 g/dL. Needs 3 units.", verified: true },
  { id: 8, name: "Krishnan Venugopal", age: 58, type: "organ", need: "Heart", organ: "Heart", hospital: "SCTIMST Trivandrum", city: "Thiruvananthapuram", state: "Kerala", distance: 45.2, timeAgo: "1.5 hrs ago", severity: "critical", contactName: "Dr. Ajay Thampy", contactPhone: "+91-471-2524601", note: "Dilated cardiomyopathy. EF 15%. On LVAD. Brain-death donor match urgently needed.", verified: true },
];

const SEVERITY_CONFIG = {
  critical: { label: "CRITICAL", color: "#ef4444", bg: "rgba(220,38,38,0.12)", border: "rgba(220,38,38,0.3)", topBar: "linear-gradient(90deg, #dc2626, #ef4444)", pulse: true },
  high: { label: "HIGH", color: "#f59e0b", bg: "rgba(217,119,6,0.1)", border: "rgba(217,119,6,0.25)", topBar: "linear-gradient(90deg, #d97706, #f59e0b)", pulse: false },
  moderate: { label: "MODERATE", color: "#10b981", bg: "rgba(5,150,105,0.1)", border: "rgba(5,150,105,0.25)", topBar: "linear-gradient(90deg, #059669, #10b981)", pulse: false },
};

function SOSCard({ request }: { request: SOSRequest }) {
  const [expanded, setExpanded] = useState(false);
  const sev = SEVERITY_CONFIG[request.severity];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: sev.bg,
        border: `1px solid ${sev.border}`,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Top severity bar */}
      <div className="h-1" style={{ background: sev.topBar }} />

      <div className="p-5">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: `${sev.color}22`, border: `1px solid ${sev.color}44` }}
            >
              {sev.pulse && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: sev.color }}></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: sev.color }}></span>
                </span>
              )}
              <span style={{ fontSize: "10px", fontWeight: 700, color: sev.color, letterSpacing: "0.06em" }}>{sev.label}</span>
            </div>
            {request.verified && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <CheckCircle size={10} className="text-green-400" />
                <span style={{ fontSize: "9px", color: "#6ee7b7", fontWeight: 600 }}>NOTTO VERIFIED</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1" style={{ color: "var(--foreground)", opacity: 0.6, fontSize: "13px" }}>
            <Clock size={13} />
            {request.timeAgo}
          </div>
        </div>

        {/* Patient Info */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: request.type === "blood"
                ? "linear-gradient(135deg, #7f1d1d, #dc2626)"
                : "linear-gradient(135deg, #1e3a8a, #2563eb)",
            }}
          >
            {request.type === "blood"
              ? <Droplets size={20} color="white" />
              : <Heart size={20} fill="white" color="white" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: "18px", fontWeight: 700, color: "inherit", lineHeight: 1.2 }}>
              {request.name}, <span style={{ fontWeight: 400 }}>{request.age} yrs</span>
            </p>
            <p style={{ fontSize: "14px", color: "inherit", opacity: 0.7 }}>{request.hospital}</p>
          </div>
          <div
            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-center"
            style={{ background: "rgba(128,128,128,0.1)", border: "1px solid rgba(128,128,128,0.2)", minWidth: "60px" }}
          >
            <p style={{ fontSize: "16px", fontWeight: 800, color: "inherit", lineHeight: 1 }}>{request.need}</p>
          </div>
        </div>

        {/* Location & Distance */}
        <div className="flex items-center gap-3 mb-4 text-sm">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} style={{ color: "var(--foreground)", opacity: 0.5 }} />
            <span style={{ fontSize: "14px", color: "var(--foreground)", opacity: 0.7 }}>{request.city}, {request.state}</span>
          </div>
          <div className="h-3 w-px" style={{ background: "var(--foreground)", opacity: 0.1 }} />
          <div className="flex items-center gap-1.5">
            <Activity size={14} style={{ color: "var(--foreground)", opacity: 0.5 }} />
            <span style={{ fontSize: "14px", color: "var(--foreground)", opacity: 0.7 }}>{request.distance} km away</span>
          </div>
        </div>

        {/* Note */}
        <p style={{ fontSize: "14px", color: "var(--foreground)", opacity: 0.8, lineHeight: 1.5, marginBottom: "12px" }}>
          {request.note}
        </p>

        {/* Expanded Contact Info */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="rounded-xl p-3 mb-3"
            style={{ background: "rgba(128,128,128,0.1)", border: "1px solid rgba(128,128,128,0.2)" }}
          >
            <p style={{ fontSize: "13px", color: "var(--foreground)", opacity: 0.6, marginBottom: "4px" }}>Contact Nodal Officer</p>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "inherit" }}>{request.contactName}</p>
            <p style={{ fontSize: "15px", color: "#2563eb" }}>{request.contactPhone}</p>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all"
            style={{ fontSize: "14px", border: "1px solid rgba(128,128,128,0.2)", flex: 1, color: "var(--foreground)" }}
          >
            <Phone size={14} />
            {expanded ? "Hide Contact" : "Show Contact"}
            <ChevronDown size={14} className={`ml-auto transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
          <Link
            to={`/register?type=${request.type === "blood" ? "blood-donor" : "organ-donor"}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-white font-semibold transition-all hover:opacity-90 flex-1"
            style={{
              background: request.severity === "critical"
                ? "linear-gradient(135deg, #b91c1c, #dc2626)"
                : "linear-gradient(135deg, #92400e, #d97706)",
              fontSize: "12px",
            }}
          >
            I Can Help <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function UrgencyDashboard() {
  const [filter, setFilter] = useState<"all" | "blood" | "organ">("all");
  const [severityFilter, setSeverityFilter] = useState<"all" | SeverityType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const styles = useThemeStyles();

  const filtered = SOS_DATA.filter((r) => {
    if (filter !== "all" && r.type !== filter) return false;
    if (severityFilter !== "all" && r.severity !== severityFilter) return false;
    if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase()) && !r.city.toLowerCase().includes(searchQuery.toLowerCase()) && !r.need.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const criticalCount = SOS_DATA.filter((r) => r.severity === "critical").length;

  return (
    <div className="min-h-screen py-8 px-4 transition-colors duration-300" style={{ background: styles.pageBg, color: styles.textPrimary }}>
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span style={{ fontSize: "12px", color: "#f87171", fontWeight: 700, letterSpacing: "0.1em" }}>
              LIVE SOS DASHBOARD
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: styles.textPrimary, marginBottom: "4px" }}>
                Active Emergency Requests
              </h1>
              <p style={{ fontSize: "16px", color: styles.textSecondary }}>
                {SOS_DATA.length} active requests · {criticalCount} critical · Real-time nationwide feed
              </p>
            </div>

            {/* Critical Alert Box */}
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ background: styles.isDark ? "rgba(220,38,38,0.12)" : "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.3)" }}
            >
              <AlertTriangle size={20} className="text-red-500" />
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#ef4444" }}>{criticalCount} Critical Cases</p>
                <p style={{ fontSize: "13px", color: styles.isDark ? "rgba(248,113,113,0.7)" : "#b91c1c" }}>Need response in &lt;24 hours</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: styles.textMuted }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, or blood type..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none"
              style={{ background: styles.inputBg, border: `1px solid ${styles.inputBorder}`, color: styles.inputText, fontSize: "15px" }}
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2">
            {(["all", "blood", "organ"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl capitalize transition-all"
                style={{
                  fontSize: "14px",
                  fontWeight: filter === f ? 600 : 500,
                  background: filter === f ? (f === "blood" ? "rgba(220,38,38,0.15)" : f === "organ" ? "rgba(37,99,235,0.15)" : styles.badgeBg) : styles.inputBg,
                  border: filter === f ? (f === "blood" ? "1px solid rgba(220,38,38,0.4)" : f === "organ" ? "1px solid rgba(37,99,235,0.4)" : `1px solid ${styles.badgeBorder}`) : `1px solid ${styles.inputBorder}`,
                  color: filter === f ? (styles.isDark ? "white" : "black") : styles.textSecondary,
                }}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Severity Filter */}
          <div className="flex gap-2">
            {(["all", "critical", "high", "moderate"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSeverityFilter(s)}
                className="px-3 py-2 rounded-xl capitalize transition-all"
                style={{
                  fontSize: "13px",
                  fontWeight: severityFilter === s ? 600 : 500,
                  background: severityFilter === s && s !== "all"
                    ? (s === "critical" ? "rgba(220,38,38,0.15)" : s === "high" ? "rgba(217,119,6,0.15)" : "rgba(5,150,105,0.15)")
                    : severityFilter === s ? styles.badgeBg : styles.inputBg,
                  border: severityFilter === s ? `1px solid ${styles.badgeBorder}` : `1px solid ${styles.inputBorder}`,
                  color: severityFilter === s ? (styles.isDark ? "white" : "black") : styles.textSecondary,
                  display: s === "all" ? "flex" : undefined,
                  alignItems: s === "all" ? "center" : undefined,
                  gap: s === "all" ? "4px" : undefined,
                }}
              >
                {s === "all" && <Filter size={11} />}
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p style={{ fontSize: "14px", color: styles.textMuted, marginBottom: "16px" }}>
          Showing {filtered.length} of {SOS_DATA.length} requests
        </p>

        {/* SOS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((req) => (
            <SOSCard key={req.id} request={req} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search size={40} className="mx-auto mb-4" style={{ color: styles.textMuted }} />
            <p style={{ fontSize: "16px", color: styles.textSecondary }}>No requests match your filters</p>
          </div>
        )}

        {/* NOTTO Routing Notice */}
        <div className="mt-10 rounded-2xl p-5"
          style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
          <div className="flex items-start gap-3">
            <CheckCircle size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <p style={{ fontSize: "13px", color: "rgba(147,197,253,0.85)", lineHeight: 1.6 }}>
              <strong style={{ color: "#93c5fd" }}>NOTTO Compliance Notice:</strong> All organ matching is routed through the National Organ and Tissue Transplant Organization (NOTTO). Transplants are performed only at NOTTO-registered hospitals. This platform does not facilitate organ trade — such activity is illegal under THOTA 1994. Helpline: <strong>1800-11-NOTTO</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
