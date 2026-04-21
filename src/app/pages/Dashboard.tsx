import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Heart, Droplets, Activity, Shield, Award, Calendar, Clock,
  Download, Bell, MapPin, CheckCircle, ArrowRight, ChevronRight,
  User, TrendingUp, Gift, Zap, Eye, FileText
} from "lucide-react";

const MOCK_USER = {
  name: "Rajesh Kumar Sharma",
  nameHi: "राजेश कुमार शर्मा",
  email: "rajesh.sharma@gmail.com",
  donorId: "JS-2026-DL-048291",
  bloodType: "O+",
  organsPlodged: ["Heart", "Kidneys", "Liver", "Corneas"],
  city: "New Delhi",
  memberSince: "April 2026",
  status: "active" as const,
  totalDonations: 7,
  livesImpacted: 21,
  badgesEarned: 4,
  daysSinceLastDonation: 42,
  nextEligible: 48,
};

const DONATION_HISTORY = [
  { id: 1, type: "blood", date: "March 10, 2026", location: "Red Cross Center, Connaught Place", bloodType: "O+", status: "completed" },
  { id: 2, type: "blood", date: "December 5, 2025", location: "AIIMS Blood Bank, New Delhi", bloodType: "O+", status: "completed" },
  { id: 3, type: "blood", date: "September 12, 2025", location: "Apollo Blood Drive, Saket", bloodType: "O+", status: "completed" },
  { id: 4, type: "blood", date: "June 20, 2025", location: "Max Hospital Camp, Noida", bloodType: "O+", status: "completed" },
  { id: 5, type: "blood", date: "March 15, 2025", location: "Red Cross Center, Connaught Place", bloodType: "O+", status: "completed" },
];

const UPCOMING = [
  { id: 1, type: "Donation Camp", date: "May 5, 2026", time: "10:00 AM", location: "India Gate, New Delhi", status: "registered" },
  { id: 2, type: "Health Checkup", date: "May 12, 2026", time: "2:00 PM", location: "AIIMS OPD, New Delhi", status: "scheduled" },
];

const BADGES = [
  { id: 1, name: "First Donation", icon: <Heart size={18} />, color: "#dc2626", earned: true },
  { id: 2, name: "5x Donor", icon: <Award size={18} />, color: "#f59e0b", earned: true },
  { id: 3, name: "Life Saver", icon: <Zap size={18} />, color: "#10b981", earned: true },
  { id: 4, name: "Organ Pledger", icon: <Gift size={18} />, color: "#a855f7", earned: true },
  { id: 5, name: "10x Donor", icon: <TrendingUp size={18} />, color: "#3b82f6", earned: false },
  { id: 6, name: "Community Hero", icon: <User size={18} />, color: "#ec4899", earned: false },
];

const QUICK_ACTIONS = [
  { label: "Download Card", icon: <Download size={16} />, href: "/donor-card", color: "#2563eb" },
  { label: "View Alerts", icon: <Bell size={16} />, href: "/alerts", color: "#f59e0b" },
  { label: "Pledge Wall", icon: <Award size={16} />, href: "/pledge-wall", color: "#dc2626" },
  { label: "Report Scanner", icon: <FileText size={16} />, href: "/report-scanner", color: "#a855f7" },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<"history" | "upcoming">("history");

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-6xl mx-auto">

        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
        >
          <div>
            <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)", letterSpacing: "0.08em", fontWeight: 600 }}>
              MY DASHBOARD
            </p>
            <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "white", marginTop: "4px" }}>
              Welcome back, {MOCK_USER.name.split(" ")[0]} 👋
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              नमस्ते, {MOCK_USER.nameHi.split(" ")[0]} · Member since {MOCK_USER.memberSince}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #b91c1c, #dc2626)",
                boxShadow: "0 6px 20px rgba(220,38,38,0.35)",
                fontSize: "13px",
              }}
            >
              <Droplets size={15} />
              Schedule Donation
            </Link>
          </div>
        </motion.div>

        {/* Status Card + Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 rounded-3xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(30,64,175,0.2), rgba(37,99,235,0.1))",
              border: "1px solid rgba(37,99,235,0.25)",
            }}
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 600, letterSpacing: "0.08em" }}>DONOR STATUS</p>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span style={{ fontSize: "10px", color: "#6ee7b7", fontWeight: 700 }}>ACTIVE</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #7f1d1d, #dc2626)" }}>
                  <Droplets size={24} color="white" />
                  <span style={{ fontSize: "14px", fontWeight: 900, color: "white", marginLeft: "2px" }}>{MOCK_USER.bloodType}</span>
                </div>
                <div>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>{MOCK_USER.donorId}</p>
                  <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)" }}>{MOCK_USER.city} · NOTTO Verified</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {MOCK_USER.organsPlodged.map((organ) => (
                  <span key={organ} className="px-2.5 py-1 rounded-full"
                    style={{ fontSize: "10px", fontWeight: 600, color: "#93c5fd", background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}>
                    {organ}
                  </span>
                ))}
              </div>

              <Link to="/donor-card" className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                style={{ fontSize: "12px", fontWeight: 600 }}>
                View Donor Card <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Donations Made", value: MOCK_USER.totalDonations.toString(), icon: <Droplets size={18} />, color: "#dc2626", gradient: "linear-gradient(135deg, #7f1d1d, #dc2626)" },
              { label: "Lives Impacted", value: MOCK_USER.livesImpacted.toString(), icon: <Heart size={18} />, color: "#10b981", gradient: "linear-gradient(135deg, #064e3b, #059669)" },
              { label: "Badges Earned", value: `${MOCK_USER.badgesEarned}/6`, icon: <Award size={18} />, color: "#f59e0b", gradient: "linear-gradient(135deg, #78350f, #d97706)" },
              { label: "Days Since Last", value: MOCK_USER.daysSinceLastDonation.toString(), icon: <Calendar size={18} />, color: "#3b82f6", gradient: "linear-gradient(135deg, #1e3a8a, #2563eb)" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="rounded-2xl p-4 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.gradient }}>
                  <span style={{ color: "white" }}>{stat.icon}</span>
                </div>
                <p style={{ fontSize: "26px", fontWeight: 800, color: "white", lineHeight: 1 }}>{stat.value}</p>
                <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", marginTop: "4px" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Eligibility Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-5 mb-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-blue-400" />
              <p style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>Next Donation Eligibility</p>
            </div>
            <span style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600 }}>
              {MOCK_USER.nextEligible} days remaining
            </span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((90 - MOCK_USER.nextEligible) / 90) * 100}%` }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #2563eb, #60a5fa)" }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>Last donation: March 10, 2026</span>
            <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>Eligible: April 28, 2026</span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          {QUICK_ACTIONS.map((action, i) => (
            <Link
              key={action.label}
              to={action.href}
              className="flex items-center gap-3 rounded-2xl p-4 transition-all hover:scale-[1.02] group"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${action.color}20`, color: action.color }}>
                {action.icon}
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>{action.label}</p>
                <ChevronRight size={12} className="text-white/30 group-hover:text-white/60 transition-colors mt-0.5" />
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award size={14} className="text-yellow-400" />
              <p style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>My Badges</p>
            </div>
            <span style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)" }}>
              {BADGES.filter(b => b.earned).length}/{BADGES.length} earned
            </span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {BADGES.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-2 py-3 px-2 rounded-2xl transition-all"
                style={{
                  background: badge.earned ? `${badge.color}10` : "rgba(255,255,255,0.02)",
                  border: badge.earned ? `1px solid ${badge.color}30` : "1px solid rgba(255,255,255,0.05)",
                  opacity: badge.earned ? 1 : 0.4,
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: badge.earned ? `${badge.color}25` : "rgba(255,255,255,0.05)",
                    color: badge.earned ? badge.color : "rgba(255,255,255,0.3)",
                  }}>
                  {badge.icon}
                </div>
                <span style={{ fontSize: "10px", fontWeight: 600, color: badge.earned ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)", textAlign: "center" }}>
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Donation History & Upcoming */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {(["history", "upcoming"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3.5 transition-all"
                style={{
                  fontSize: "13px",
                  fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? "white" : "rgba(255,255,255,0.4)",
                  borderBottom: activeTab === tab ? "2px solid #2563eb" : "2px solid transparent",
                  background: activeTab === tab ? "rgba(37,99,235,0.05)" : "transparent",
                }}
              >
                {tab === "history" ? "Donation History" : "Upcoming"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-5">
            {activeTab === "history" && (
              <div className="flex flex-col gap-3">
                {DONATION_HISTORY.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3.5 rounded-xl transition-all hover:bg-white/[0.03]"
                    style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #7f1d1d, #dc2626)" }}>
                      <Droplets size={16} color="white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>{item.bloodType} Blood Donation</p>
                      <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)" }}>{item.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{item.date}</p>
                      <div className="flex items-center gap-1 justify-end mt-0.5">
                        <CheckCircle size={10} className="text-green-400" />
                        <span style={{ fontSize: "10px", color: "#6ee7b7", fontWeight: 600 }}>Completed</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "upcoming" && (
              <div className="flex flex-col gap-3">
                {UPCOMING.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3.5 rounded-xl"
                    style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)" }}>
                      <Calendar size={16} color="white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>{item.type}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin size={10} className="text-white/40" />
                        <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)" }}>{item.location}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{item.date}</p>
                      <p style={{ fontSize: "11px", color: "#93c5fd" }}>{item.time}</p>
                    </div>
                  </div>
                ))}
                <div className="text-center py-4">
                  <Link to="/register" className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                    style={{ fontSize: "13px", fontWeight: 600 }}>
                    Schedule a New Donation <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
