import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, Droplets, ArrowRight, Shield, Award, MapPin,
  Users, Activity, CheckCircle, ChevronRight, Zap, Clock,
  Bell, ScanLine, Stethoscope, Scale
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1672075270227-ddf5cb181a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1613799604496-90c66af2b53b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1622461828449-9cbb6d0b7d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
];

const LIVE_STATS = [
  { label: "Registered Donors", value: "1,28,471", icon: <Users size={20} />, color: "#3b82f6", increment: true },
  { label: "Lives Saved", value: "32,918", icon: <Heart size={20} />, color: "#dc2626", increment: true },
  { label: "Partner Hospitals", value: "847", icon: <Activity size={20} />, color: "#10b981", increment: false },
  { label: "Cities Covered", value: "312", icon: <MapPin size={20} />, color: "#f59e0b", increment: false },
];

const PERSONA_CARDS = [
  {
    id: "organ-donor",
    title: "Donate an Organ",
    titleHi: "अंग दान करें",
    sub: "Register as a life-saving organ donor",
    icon: "heart",
    gradient: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 60%, #ef4444 100%)",
    glowColor: "rgba(220,38,38,0.4)",
    border: "rgba(220,38,38,0.3)",
    href: "/register?type=organ-donor",
    badge: "Most Needed",
    badgeColor: "#dc2626",
    stats: "One donor can save 8 lives",
  },
  {
    id: "organ-receiver",
    title: "Need an Organ",
    titleHi: "अंग चाहिए",
    sub: "Register your medical urgency today",
    icon: "activity",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)",
    glowColor: "rgba(37,99,235,0.4)",
    border: "rgba(37,99,235,0.3)",
    href: "/register?type=organ-receiver",
    badge: "Priority Access",
    badgeColor: "#2563eb",
    stats: "Match within 24 hours",
  },
  {
    id: "blood-donor",
    title: "Donate Blood",
    titleHi: "रक्त दान करें",
    sub: "Schedule a voluntary blood donation",
    icon: "droplet",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #ea580c 60%, #fb923c 100%)",
    glowColor: "rgba(234,88,12,0.4)",
    border: "rgba(234,88,12,0.3)",
    href: "/register?type=blood-donor",
    badge: "Every 3 Months",
    badgeColor: "#ea580c",
    stats: "3 lives saved per donation",
  },
  {
    id: "blood-receiver",
    title: "Need Blood",
    titleHi: "रक्त चाहिए",
    sub: "Find urgent blood donors near you",
    icon: "zap",
    gradient: "linear-gradient(135deg, #064e3b 0%, #059669 60%, #34d399 100%)",
    glowColor: "rgba(5,150,105,0.4)",
    border: "rgba(5,150,105,0.3)",
    href: "/register?type=blood-receiver",
    badge: "Emergency SOS",
    badgeColor: "#059669",
    stats: "Connect in under 5 minutes",
  },
];

const URGENCY_FEED = [
  { id: 1, name: "Arjun S.", age: 34, type: "blood", need: "O− Blood", location: "AIIMS Delhi", urgency: "critical", timeAgo: "2 min", hospital: "AIIMS New Delhi", img: null },
  { id: 2, name: "Meera P.", age: 52, type: "organ", need: "Kidney", location: "KEM Mumbai", urgency: "critical", timeAgo: "8 min", hospital: "KEM Hospital, Mumbai", img: null },
  { id: 3, name: "Suresh K.", age: 28, type: "blood", need: "AB+ Blood", location: "Apollo Chennai", urgency: "high", timeAgo: "15 min", hospital: "Apollo Hospitals, Chennai", img: null },
  { id: 4, name: "Fatima B.", age: 47, type: "organ", need: "Liver", location: "Narayana Bangalore", urgency: "high", timeAgo: "22 min", hospital: "Narayana Health, Bangalore", img: null },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Verma",
    location: "Delhi",
    role: "Kidney Recipient",
    text: "JivanSetu matched me with a donor within 18 hours. After 6 years on dialysis, I finally have my life back. This platform saved me.",
    img: "https://images.unsplash.com/photo-1622461828449-9cbb6d0b7d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 5,
  },
  {
    name: "Dr. Priya Nair",
    location: "Kochi",
    role: "Transplant Surgeon, Amrita Hospital",
    text: "The NOTTO-integrated matching system has reduced our waiting time by 60%. The platform's compliance with THOTA is impeccable.",
    img: "https://images.unsplash.com/photo-1623578981794-56753995d8f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 5,
  },
  {
    name: "Sunita Patel",
    location: "Ahmedabad",
    role: "Blood Donor (12 donations)",
    text: "Seva AI guided me through the entire registration in my language, Gujarati. The process was so simple, even my elderly parents could do it.",
    img: "https://images.unsplash.com/photo-1672075270227-ddf5cb181a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 5,
  },
];

function AnimatedStat({ value, label, icon, color }: { value: string; label: string; icon: React.ReactNode; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-2 px-6 py-4"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1" style={{ background: `${color}22`, color }}>
        {icon}
      </div>
      <span style={{ fontSize: "28px", fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>{value}</span>
      <span style={{ fontSize: "12px", color: "rgba(148,163,184,0.8)", textAlign: "center", lineHeight: 1.3 }}>{label}</span>
    </motion.div>
  );
}

export function Landing() {
  const { t } = useTranslation();
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "#060d1f", minHeight: "100vh", color: "white" }}>
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
        {/* Background Image Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={HERO_IMAGES[heroIdx]}
              alt="JivanSetu Hero"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.35) saturate(1.1)" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(6,13,31,0.3) 0%, rgba(6,13,31,0.6) 50%, rgba(6,13,31,0.95) 100%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 50% 60% at 80% 30%, rgba(220,38,38,0.1) 0%, transparent 70%)",
        }} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8 flex flex-col items-center">

          {/* NOTTO Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{
              background: "rgba(37,99,235,0.15)",
              border: "1px solid rgba(37,99,235,0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Shield size={13} className="text-blue-400" />
            <span style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 500 }}>
              NOTTO Affiliated · THOTA 1994 Compliant · 312 Cities
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-4"
          >
            <h1
              className="mb-2"
              style={{
                fontSize: "clamp(42px, 7vw, 80px)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontFamily: "'Noto Serif Display', 'Noto Sans', serif",
              }}
            >
              <span style={{ color: "white" }}>जीवनसेतु</span>
              <br />
              <span style={{
                background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                JivanSetu
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 2.5vw, 22px)",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 400,
                fontFamily: "'Noto Serif Display', serif",
                fontStyle: "italic",
                letterSpacing: "0.01em",
              }}
            >
              "{t("taglineFull")}"
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-10 max-w-xl"
            style={{ fontSize: "15px", color: "rgba(148,163,184,0.9)", lineHeight: 1.6 }}
          >
            {t("subTagline")}
          </motion.p>

          {/* ═══ FOUR PERSONA CARDS ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, staggerChildren: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mb-10"
          >
            {PERSONA_CARDS.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={card.href}
                  className="block rounded-3xl p-5 h-full relative overflow-hidden group"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${card.border}`,
                    boxShadow: `0 8px 32px ${card.glowColor}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Gradient glow bg */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: card.gradient, opacity: 0.08 }}
                  />

                  {/* Badge */}
                  <div
                    className="inline-flex items-center px-2.5 py-1 rounded-full mb-3"
                    style={{
                      background: `${card.badgeColor}22`,
                      border: `1px solid ${card.badgeColor}44`,
                      fontSize: "10px",
                      color: card.badgeColor === "#dc2626" ? "#fca5a5"
                        : card.badgeColor === "#2563eb" ? "#93c5fd"
                        : card.badgeColor === "#ea580c" ? "#fdba74"
                        : "#6ee7b7",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {card.badge}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                    style={{ background: card.gradient }}
                  >
                    {card.icon === "heart" && <Heart size={22} fill="white" color="white" />}
                    {card.icon === "activity" && <Activity size={22} color="white" />}
                    {card.icon === "droplet" && <Droplets size={22} color="white" />}
                    {card.icon === "zap" && <Zap size={22} fill="white" color="white" />}
                  </div>

                  {/* Text */}
                  <h3
                    style={{ fontSize: "16px", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "4px" }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#d1d5db", marginBottom: "8px", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                    {card.titleHi}
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.8)", lineHeight: 1.4, marginBottom: "12px" }}>
                    {card.sub}
                  </p>

                  {/* Stat */}
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={12} style={{ color: card.badgeColor === "#dc2626" ? "#fca5a5" : card.badgeColor === "#2563eb" ? "#93c5fd" : card.badgeColor === "#ea580c" ? "#fdba74" : "#6ee7b7" }} />
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>{card.stats}</span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
                    <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Emergency SOS CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/urgency"
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-white font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #b91c1c, #dc2626)",
                boxShadow: "0 8px 30px rgba(220,38,38,0.4)",
                fontSize: "14px",
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-100"></span>
              </span>
              View Live SOS Dashboard
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold transition-all hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: "14px",
                color: "white",
              }}
            >
              Register in 5 minutes
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LIVE STATS BAR
      ═══════════════════════════════════════════ */}
      <section style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {LIVE_STATS.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          URGENCY DASHBOARD PREVIEW
      ══════════════════════════��════════════════ */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span style={{ fontSize: "12px", color: "#f87171", fontWeight: 600, letterSpacing: "0.08em" }}>
                LIVE SOS FEED
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "white" }}>
              Active Requests Near You
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.8)", marginTop: "4px" }}>
              These patients need immediate help. One response can save a life.
            </p>
          </div>
          <Link
            to="/urgency"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:bg-white/10"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {URGENCY_FEED.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-5 relative overflow-hidden group cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: item.urgency === "critical"
                  ? "1px solid rgba(220,38,38,0.3)"
                  : "1px solid rgba(234,179,8,0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Urgency Indicator */}
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: item.urgency === "critical"
                    ? "linear-gradient(90deg, #dc2626, #ef4444)"
                    : "linear-gradient(90deg, #d97706, #f59e0b)",
                }}
              />

              <div className="flex items-start justify-between mb-3">
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{
                    background: item.urgency === "critical" ? "rgba(220,38,38,0.15)" : "rgba(234,179,8,0.15)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: item.urgency === "critical" ? "#fca5a5" : "#fde68a",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.urgency === "critical" ? (
                    <><span className="animate-pulse">●</span> CRITICAL</>
                  ) : (
                    <><span>●</span> HIGH</>
                  )}
                </div>
                <div className="flex items-center gap-1" style={{ color: "rgba(148,163,184,0.6)", fontSize: "11px" }}>
                  <Clock size={11} />
                  {item.timeAgo}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: item.type === "blood"
                      ? "linear-gradient(135deg, #7f1d1d, #dc2626)"
                      : "linear-gradient(135deg, #1e3a8a, #2563eb)",
                  }}
                >
                  {item.type === "blood" ? <Droplets size={18} color="white" /> : <Heart size={18} fill="white" color="white" />}
                </div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>{item.name}, {item.age}</p>
                  <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.7)" }}>{item.hospital.split(",")[0]}</p>
                </div>
              </div>

              <div className="rounded-xl px-3 py-2 mb-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Urgently needs</p>
                <p style={{ fontSize: "16px", fontWeight: 800, color: "white" }}>{item.need}</p>
              </div>

              <div className="flex items-center gap-1 mb-3">
                <MapPin size={11} style={{ color: "rgba(148,163,184,0.5)" }} />
                <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)" }}>{item.location}</span>
              </div>

              <Link
                to="/urgency"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: item.urgency === "critical"
                    ? "linear-gradient(135deg, #b91c1c, #dc2626)"
                    : "linear-gradient(135deg, #92400e, #d97706)",
                  fontSize: "13px",
                }}
              >
                Respond Now <ArrowRight size={13} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPLIANCE & TRUST SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(30,64,175,0.15), rgba(37,99,235,0.08))",
            border: "1px solid rgba(37,99,235,0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}>
                  <Shield size={28} color="white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={14} className="text-blue-400" />
                  <span style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 600, letterSpacing: "0.08em" }}>
                    LEGALLY COMPLIANT PLATFORM
                  </span>
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "white", marginBottom: "8px" }}>
                  {t("compliance.title")}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.85)", lineHeight: 1.7, maxWidth: "560px" }}>
                  {t("compliance.body")} All organ matches are routed through{" "}
                  <span className="text-blue-400 font-semibold">NOTTO (National Organ and Tissue Transplant Organization)</span>.
                  Trading organs is illegal under THOTA 1994 and punishable by law.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {["NOTTO Affiliated", "THOTA 1994 Compliant", "PDPA 2023 Secure"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-400" />
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600, letterSpacing: "0.1em" }} className="mb-2">
            REAL STORIES · REAL IMPACT
          </p>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "white" }}>
            Lives Changed by JivanSetu
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array(5).fill(0).map((_, j) => (
                  <span key={j} style={{ color: "#fbbf24", fontSize: "14px" }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic" }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={t.img}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: "2px solid rgba(255,255,255,0.1)" }}
                />
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>{t.name}</p>
                  <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.7)" }}>{t.role} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EXPLORE FEATURES
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600, letterSpacing: "0.1em" }} className="mb-2">
              EXPLORE JIVANSETU
            </p>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "white" }}>
              Powerful Features for Saving Lives
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/heatmap", title: "Live Heatmap", sub: "Real-time urgency map across India", icon: <MapPin size={20} />, color: "#f59e0b", gradient: "linear-gradient(135deg, #92400e, #d97706)" },
              { href: "/alerts", title: "Proximity Alerts", sub: "Get notified when someone nearby needs help", icon: <Bell size={20} />, color: "#3b82f6", gradient: "linear-gradient(135deg, #1e3a8a, #2563eb)" },
              { href: "/report-scanner", title: "Report Scanner", sub: "AI-powered medical report extraction", icon: <ScanLine size={20} />, color: "#a855f7", gradient: "linear-gradient(135deg, #581c87, #7c3aed)" },
              { href: "/doctor-portal", title: "Doctor's Portal", sub: "Verify requests as a medical professional", icon: <Stethoscope size={20} />, color: "#10b981", gradient: "linear-gradient(135deg, #065f46, #059669)" },
              { href: "/notto-guide", title: "NOTTO Guide", sub: "Register with India's organ transplant body", icon: <Shield size={20} />, color: "#2563eb", gradient: "linear-gradient(135deg, #1e40af, #3b82f6)" },
              { href: "/pledge-wall", title: "Pledge Wall", sub: "Join the wall of heroes — get your certificate", icon: <Award size={20} />, color: "#dc2626", gradient: "linear-gradient(135deg, #7f1d1d, #dc2626)" },
              { href: "/legal-faq", title: "Legal FAQ", sub: "THOTA explained in simple terms", icon: <Scale size={20} />, color: "#f59e0b", gradient: "linear-gradient(135deg, #78350f, #b45309)" },
              { href: "/seva-ai", title: "Seva AI", sub: "Your 24/7 AI-powered donation guide", icon: <Heart size={20} />, color: "#ec4899", gradient: "linear-gradient(135deg, #831843, #db2777)" },
            ].map((feat, i) => (
              <motion.div key={feat.href}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link to={feat.href}
                  className="block rounded-2xl p-5 h-full group transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: feat.gradient }}>
                    <span style={{ color: "white" }}>{feat.icon}</span>
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white", marginBottom: "4px" }}>{feat.title}</h3>
                  <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)", lineHeight: 1.5 }}>{feat.sub}</p>
                  <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <span style={{ fontSize: "12px", color: feat.color, fontWeight: 600 }}>Explore</span>
                    <ArrowRight size={12} style={{ color: feat.color }} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER CTA
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-4 text-center"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(37,99,235,0.08))",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "white", marginBottom: "12px", lineHeight: 1.1 }}>
            Your decision today<br />saves a life tomorrow.
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(148,163,184,0.8)", marginBottom: "32px" }}>
            Register in under 5 minutes. Change a life forever.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #1e40af, #2563eb)",
              boxShadow: "0 12px 40px rgba(37,99,235,0.4)",
              fontSize: "16px",
            }}
          >
            <Heart size={18} fill="white" />
            Become a Donor Today
            <ArrowRight size={18} />
          </Link>
          <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.5)", marginTop: "16px" }}>
            {t("footer.compliance")}
          </p>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 16px" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart size={14} fill="#dc2626" color="#dc2626" />
            <span style={{ fontSize: "13px", color: "rgba(148,163,184,0.7)" }}>
              JivanSetu · {t("footer.tagline")}
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.5)", textAlign: "center" }}>
            {t("footer.emergency")}
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Contact", "NOTTO"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "12px", color: "rgba(148,163,184,0.5)" }} className="hover:text-white/70 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}