import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Bell, MapPin, Heart, Droplets, Clock, ArrowRight,
  Sliders, BellRing, BellOff, CheckCircle, Navigation, Activity
} from "lucide-react";

type Alert = {
  id: number;
  name: string;
  age: number;
  type: "blood" | "organ";
  need: string;
  hospital: string;
  city: string;
  distance: number;
  severity: "critical" | "high" | "moderate";
  timeAgo: string;
  note: string;
};

const MOCK_ALERTS: Alert[] = [
  { id: 1, name: "Arjun S.", age: 34, type: "blood", need: "O− Blood", hospital: "AIIMS New Delhi", city: "New Delhi", distance: 2.4, severity: "critical", timeAgo: "2 min ago", note: "Post-accident trauma, ICU. Needs 4 units immediately." },
  { id: 2, name: "Priya N.", age: 19, type: "blood", need: "B− Blood", hospital: "Max Hospital", city: "New Delhi", distance: 5.1, severity: "critical", timeAgo: "8 min ago", note: "Thalassemia patient. Rare blood type. Regular transfusion required." },
  { id: 3, name: "Vikram R.", age: 42, type: "organ", need: "Kidney", hospital: "Fortis Hospital", city: "Gurgaon", distance: 12.3, severity: "high", timeAgo: "22 min ago", note: "End-stage renal disease. On dialysis for 2 years." },
  { id: 4, name: "Sunita P.", age: 55, type: "blood", need: "AB+ Blood", hospital: "Safdarjung Hospital", city: "New Delhi", distance: 3.8, severity: "high", timeAgo: "35 min ago", note: "Surgery scheduled tomorrow. Requires 2 units packed RBC." },
  { id: 5, name: "Rajan M.", age: 63, type: "organ", need: "Cornea", hospital: "AIIMS New Delhi", city: "New Delhi", distance: 4.2, severity: "moderate", timeAgo: "1 hr ago", note: "Bilateral corneal opacity. Vision < 6/60." },
  { id: 6, name: "Fatima B.", age: 47, type: "organ", need: "Liver", hospital: "Medanta Hospital", city: "Gurgaon", distance: 18.5, severity: "critical", timeAgo: "1.5 hrs ago", note: "MELD score 28. Partial liver from living donor considered." },
  { id: 7, name: "Anil K.", age: 31, type: "blood", need: "A+ Blood", hospital: "BLK Hospital", city: "New Delhi", distance: 6.7, severity: "moderate", timeAgo: "2 hrs ago", note: "Chemotherapy patient. Hemoglobin dropped to 7.1 g/dL." },
  { id: 8, name: "Meera D.", age: 29, type: "blood", need: "O+ Blood", hospital: "Sir Ganga Ram Hospital", city: "New Delhi", distance: 7.9, severity: "high", timeAgo: "2.5 hrs ago", note: "Post-partum hemorrhage. Needs 3 units urgently." },
];

const SEVERITY_BADGE = {
  critical: { label: "CRITICAL", color: "#ef4444", bg: "rgba(220,38,38,0.15)", border: "rgba(220,38,38,0.3)" },
  high: { label: "HIGH", color: "#f59e0b", bg: "rgba(217,119,6,0.12)", border: "rgba(217,119,6,0.25)" },
  moderate: { label: "MODERATE", color: "#10b981", bg: "rgba(5,150,105,0.1)", border: "rgba(5,150,105,0.25)" },
};

export function ProximityAlerts() {
  const [radius, setRadius] = useState(25);
  const [typeFilter, setTypeFilter] = useState<"all" | "blood" | "organ">("all");
  const [notificationsOn, setNotificationsOn] = useState(true);

  const filtered = MOCK_ALERTS.filter((a) => {
    if (a.distance > radius) return false;
    if (typeFilter !== "all" && a.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#060d1f" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <BellRing size={14} className="text-blue-400" />
            <span style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 700, letterSpacing: "0.1em" }}>PROXIMITY ALERTS</span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "white", marginBottom: "4px" }}>
            Alerts Near You
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)" }}>
            Receive notifications when someone nearby urgently needs blood or organ donation
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Controls */}
          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
            {/* Location Card */}
            <div className="rounded-3xl p-5" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Navigation size={14} className="text-blue-400" />
                <span style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 600, letterSpacing: "0.06em" }}>YOUR LOCATION</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={14} className="text-blue-400" />
                <span style={{ fontSize: "15px", fontWeight: 600, color: "white" }}>New Delhi, Delhi</span>
              </div>
              <p style={{ fontSize: "11px", color: "rgba(147,197,253,0.6)" }}>Simulated location for demo</p>
            </div>

            {/* Radius Slider */}
            <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Sliders size={14} className="text-white/50" />
                <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", fontWeight: 600, letterSpacing: "0.06em" }}>SEARCH RADIUS</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontSize: "32px", fontWeight: 800, color: "white" }}>{radius}<span style={{ fontSize: "14px", fontWeight: 400, color: "rgba(148,163,184,0.6)" }}> km</span></span>
              </div>
              <input
                type="range" min={10} max={50} value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(90deg, #2563eb ${((radius - 10) / 40) * 100}%, rgba(255,255,255,0.1) ${((radius - 10) / 40) * 100}%)` }}
              />
              <div className="flex items-center justify-between mt-2">
                <span style={{ fontSize: "10px", color: "rgba(148,163,184,0.4)" }}>10 km</span>
                <span style={{ fontSize: "10px", color: "rgba(148,163,184,0.4)" }}>50 km</span>
              </div>
            </div>

            {/* Type Filter */}
            <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "10px" }}>ALERT TYPE</p>
              <div className="flex flex-col gap-2">
                {([
                  { val: "all" as const, label: "All Alerts", icon: <Bell size={14} /> },
                  { val: "blood" as const, label: "Blood Only", icon: <Droplets size={14} /> },
                  { val: "organ" as const, label: "Organ Only", icon: <Heart size={14} /> },
                ] as const).map((opt) => (
                  <button key={opt.val} onClick={() => setTypeFilter(opt.val)}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all"
                    style={{
                      background: typeFilter === opt.val ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.04)",
                      border: typeFilter === opt.val ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(255,255,255,0.06)",
                      color: typeFilter === opt.val ? "white" : "rgba(255,255,255,0.5)",
                      fontSize: "13px",
                    }}
                  >
                    <span className={typeFilter === opt.val ? "text-blue-400" : "text-white/30"}>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Toggle */}
            <div className="rounded-3xl p-5" style={{ background: notificationsOn ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.03)", border: notificationsOn ? "1px solid rgba(16,185,129,0.15)" : "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {notificationsOn ? <BellRing size={16} className="text-green-400" /> : <BellOff size={16} className="text-white/30" />}
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>Push Notifications</p>
                    <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>{notificationsOn ? "Enabled" : "Disabled"}</p>
                  </div>
                </div>
                <button onClick={() => setNotificationsOn(!notificationsOn)}
                  className="w-11 h-6 rounded-full relative transition-all"
                  style={{ background: notificationsOn ? "#059669" : "rgba(255,255,255,0.15)" }}>
                  <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all"
                    style={{ left: notificationsOn ? "22px" : "2px" }} />
                </button>
              </div>
            </div>
          </div>

          {/* Alert Feed */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.5)" }}>
                {filtered.length} alerts within {radius} km
              </p>
              <div className="flex items-center gap-1.5">
                <Activity size={12} className="text-green-400" />
                <span style={{ fontSize: "11px", color: "#6ee7b7" }}>Live</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {filtered.map((alert, i) => {
                const sev = SEVERITY_BADGE[alert.severity];
                return (
                  <motion.div key={alert.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: sev.bg, border: `1px solid ${sev.border}` }}
                  >
                    <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${sev.color}, ${sev.color}88)` }} />
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                            style={{ background: `${sev.color}22`, border: `1px solid ${sev.color}44` }}>
                            {alert.severity === "critical" && (
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: sev.color }}></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: sev.color }}></span>
                              </span>
                            )}
                            <span style={{ fontSize: "10px", fontWeight: 700, color: sev.color, letterSpacing: "0.06em" }}>{sev.label}</span>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                            <MapPin size={10} className="text-white/40" />
                            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{alert.distance} km</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1" style={{ color: "rgba(148,163,184,0.5)", fontSize: "11px" }}>
                          <Clock size={11} />
                          {alert.timeAgo}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ background: alert.type === "blood" ? "linear-gradient(135deg, #7f1d1d, #dc2626)" : "linear-gradient(135deg, #1e3a8a, #2563eb)" }}>
                          {alert.type === "blood" ? <Droplets size={18} color="white" /> : <Heart size={18} fill="white" color="white" />}
                        </div>
                        <div className="flex-1">
                          <p style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>{alert.name}, {alert.age} yrs</p>
                          <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)" }}>{alert.hospital}, {alert.city}</p>
                        </div>
                        <div className="px-3 py-1.5 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <p style={{ fontSize: "14px", fontWeight: 800, color: "white" }}>{alert.need}</p>
                        </div>
                      </div>

                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginBottom: "12px" }}>{alert.note}</p>

                      <Link to="/urgency"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                        style={{ background: `linear-gradient(135deg, ${sev.color}cc, ${sev.color})`, fontSize: "13px" }}>
                        I Can Help <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}

              {filtered.length === 0 && (
                <div className="text-center py-20 rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <CheckCircle size={40} className="text-green-400/30 mx-auto mb-4" />
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>No alerts in your radius</p>
                  <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.4)", marginTop: "4px" }}>Try increasing your search radius</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
