import { motion } from "motion/react";
import { Heart, Shield, Users, Award, Activity, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const TEAM = [
  { name: "Dr. Anjali Mehrotra", role: "Medical Director", img: "https://images.unsplash.com/photo-1623578981794-56753995d8f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", bio: "Former NOTTO senior physician. 22 years in transplant medicine." },
  { name: "Vikram Nair", role: "CTO & Co-founder", img: "https://images.unsplash.com/photo-1622461828449-9cbb6d0b7d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", bio: "IIT Bombay alumnus. 15 years in healthcare technology." },
  { name: "Sunita Krishnan", role: "Head of Compliance", img: "https://images.unsplash.com/photo-1672075270227-ddf5cb181a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", bio: "Legal expert in THOTA & PDPA. Former MoHFW consultant." },
];

const VALUES = [
  { icon: <Heart size={22} />, title: "Compassion First", desc: "Every decision prioritizes patient welfare above all else", color: "#dc2626" },
  { icon: <Shield size={22} />, title: "Legal Integrity", desc: "100% THOTA compliant. Organ trade is strictly prohibited.", color: "#2563eb" },
  { icon: <Users size={22} />, title: "Inclusive Access", desc: "12 languages. Every Indian deserves access to life-saving technology.", color: "#059669" },
  { icon: <Activity size={22} />, title: "Medical Accuracy", desc: "All information vetted by licensed transplant physicians.", color: "#f59e0b" },
];

export function About() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p style={{ fontSize: "12px", color: "#93c5fd", letterSpacing: "0.1em", fontWeight: 600 }} className="mb-3">ABOUT JIVANSETU</p>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "16px" }}>
            Bridging the gap between<br />
            <span style={{ background: "linear-gradient(90deg, #dc2626, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              donors and those in need
            </span>
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(148,163,184,0.85)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            JivanSetu (Bridge of Life) was founded in 2026 to solve India's critical shortage of organ and blood donors through technology, transparency, and trust.
          </p>
        </motion.div>

        {/* Mission */}
        <div className="rounded-3xl p-8 mb-8"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Award size={14} className="text-yellow-400" />
            <span style={{ fontSize: "11px", color: "#fde68a", fontWeight: 600, letterSpacing: "0.08em" }}>OUR MISSION</span>
          </div>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.85)", lineHeight: 1.8 }}>
            India has one of the world's lowest organ donation rates — just{" "}
            <strong style={{ color: "#fca5a5" }}>0.86 donors per million population</strong>. With over{" "}
            <strong style={{ color: "white" }}>500,000 people</strong> dying annually due to lack of organ availability,
            JivanSetu exists to close this gap through a NOTTO-integrated matching platform, multilingual accessibility,
            and an AI-powered guidance system that makes the process easy, trusted, and dignified.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {VALUES.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${v.color}22`, color: v.color }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "4px" }}>{v.title}</h3>
              <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.75)", lineHeight: 1.5 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-10">
          <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "16px" }}>OUR LEADERSHIP</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TEAM.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-5 text-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <ImageWithFallback src={member.img} alt={member.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                  style={{ border: "2px solid rgba(37,99,235,0.3)" }} />
                <p style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>{member.name}</p>
                <p style={{ fontSize: "12px", color: "#93c5fd", marginBottom: "6px" }}>{member.role}</p>
                <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.65)", lineHeight: 1.4 }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div className="rounded-3xl p-6 mb-8"
          style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "12px" }}>Legal & Compliance Framework</h3>
          {[
            "All organ matching is processed through NOTTO — the Government of India's apex transplant body",
            "Organ trading is strictly illegal under THOTA 1994 and punishable with 3–5 years imprisonment",
            "User data is protected under Personal Data Protection Act (PDPA) 2023 with AES-256 encryption",
            "All listed hospitals are NOTTO-registered transplant centers",
            "Brain-death donation requires certified verification by 4 physicians per THOTA protocols",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 mb-2.5">
              <CheckCircle size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{item}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #b91c1c, #dc2626)", boxShadow: "0 12px 40px rgba(220,38,38,0.3)", fontSize: "15px" }}>
            <Heart size={18} fill="white" />
            Join the Movement
            <ArrowRight size={16} />
          </Link>
          <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.5)", marginTop: "12px" }}>
            NOTTO Helpline: 1800-11-NOTTO · National Ambulance: 108
          </p>
        </div>
      </div>
    </div>
  );
}