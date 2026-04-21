import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle,
  Heart, AlertCircle, Building, Globe, ExternalLink
} from "lucide-react";
import { useThemeStyles } from "../ThemeContext";

const OFFICES = [
  { city: "New Delhi", address: "JivanSetu HQ, Block C-12, Connaught Place, New Delhi — 110001", phone: "+91 11 2345 6789", email: "delhi@jivansetu.org", hours: "Mon–Sat: 9:00 AM – 6:00 PM" },
  { city: "Mumbai", address: "Office 402, Nariman Point Tower, Mumbai — 400021", phone: "+91 22 3456 7890", email: "mumbai@jivansetu.org", hours: "Mon–Sat: 9:00 AM – 6:00 PM" },
  { city: "Chennai", address: "Suite 5A, Anna Nagar IT Park, Chennai — 600040", phone: "+91 44 4567 8901", email: "chennai@jivansetu.org", hours: "Mon–Sat: 9:30 AM – 5:30 PM" },
  { city: "Kolkata", address: "Room 201, Salt Lake Sector V, Kolkata — 700091", phone: "+91 33 5678 9012", email: "kolkata@jivansetu.org", hours: "Mon–Fri: 10:00 AM – 5:00 PM" },
];

const HELPLINES = [
  { name: "National Emergency", number: "112", desc: "All-in-one emergency response", color: "#ef4444", available: "24/7" },
  { name: "National Ambulance", number: "108", desc: "Emergency ambulance services across India", color: "#dc2626", available: "24/7" },
  { name: "NOTTO Helpline", number: "1800-11-NOTTO", desc: "National Organ Transplant body", color: "#2563eb", available: "24/7" },
  { name: "Maternity / Ambulance", number: "102", desc: "Pregnancy & regular ambulance", color: "#eab308", available: "24/7" },
  { name: "JivanSetu Support", number: "+91 1800-123-5678", desc: "Platform support & queries", color: "#10b981", available: "9 AM – 9 PM" },
];

const CATEGORIES = [
  "General Inquiry",
  "Donor Registration Help",
  "Medical Emergency",
  "Technical Issue",
  "Report a Bug",
  "Partnership / NGO",
  "Media / Press",
  "Legal / Compliance",
  "Feedback / Suggestion",
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", category: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const styles = useThemeStyles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", category: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen py-12 px-4 transition-colors duration-300" style={{ background: styles.pageBg, color: styles.textPrimary }}>
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p style={{ fontSize: "14px", color: styles.textLabel, letterSpacing: "0.1em", fontWeight: 600 }} className="mb-3">CONTACT US</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            We're here to{" "}
            <span style={styles.gradientText}>
              help
            </span>
          </h1>
          <p style={{ fontSize: "16px", color: styles.textSecondary, maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Have a question, need assistance with registration, or want to report an emergency? Reach out to us.
          </p>
        </motion.div>

        {/* Emergency Helplines */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Phone size={16} className="text-red-500" />
            <p style={{ fontSize: "13px", color: "#f87171", fontWeight: 600, letterSpacing: "0.08em" }}>EMERGENCY HELPLINES</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {HELPLINES.map((line, i) => (
              <motion.div
                key={line.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="rounded-2xl p-4"
                style={{ background: `${line.color}08`, border: `1px solid ${line.color}25` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${line.color}20` }}>
                    <Phone size={16} style={{ color: line.color }} />
                  </div>
                  <span style={{ fontSize: "12px", color: line.color, fontWeight: 600, letterSpacing: "0.05em" }}>
                    {line.available}
                  </span>
                </div>
                <p style={{ fontSize: "20px", fontWeight: 800, color: styles.textPrimary, marginBottom: "2px", letterSpacing: "-0.01em" }}>{line.number}</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: styles.textSecondary, marginBottom: "2px" }}>{line.name}</p>
                <p style={{ fontSize: "13px", color: styles.textMuted, lineHeight: 1.4 }}>{line.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 rounded-3xl p-6 md:p-8"
            style={{ background: styles.cardBg, border: `1px solid ${styles.cardBorder}` }}
          >
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare size={18} className="text-blue-500" />
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: styles.textPrimary }}>Send us a Message</h2>
            </div>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-6"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}
              >
                <CheckCircle size={16} className="text-green-400" />
                <p style={{ fontSize: "13px", color: "#6ee7b7", fontWeight: 500 }}>Message sent successfully! We'll get back to you within 24 hours.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontSize: "14px", fontWeight: 600, color: styles.textSecondary }}>Full Name</label>
                  <input
                    type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="rounded-xl outline-none px-4 py-3"
                    style={{ background: styles.inputBg, border: `1px solid ${styles.inputBorder}`, color: styles.inputText, fontSize: "15px" }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label style={{ fontSize: "14px", fontWeight: 600, color: styles.textSecondary }}>Email Address</label>
                  <input
                    type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="rounded-xl outline-none px-4 py-3"
                    style={{ background: styles.inputBg, border: `1px solid ${styles.inputBorder}`, color: styles.inputText, fontSize: "15px" }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: "14px", fontWeight: 600, color: styles.textSecondary }}>Category</label>
                <select
                  required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="rounded-xl outline-none px-4 py-3"
                  style={{ background: styles.inputBg, border: `1px solid ${styles.inputBorder}`, color: styles.inputText, fontSize: "15px" }}
                >
                  <option value="" style={{ background: styles.selectBg }}>Select a category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: styles.selectBg }}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: "14px", fontWeight: 600, color: styles.textSecondary }}>Subject</label>
                <input
                  type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Brief description of your query"
                  className="rounded-xl outline-none px-4 py-3"
                  style={{ background: styles.inputBg, border: `1px solid ${styles.inputBorder}`, color: styles.inputText, fontSize: "15px" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: "14px", fontWeight: 600, color: styles.textSecondary }}>Message</label>
                <textarea
                  required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className="rounded-xl outline-none px-4 py-3 resize-none"
                  style={{ background: styles.inputBg, border: `1px solid ${styles.inputBorder}`, color: styles.inputText, fontSize: "15px" }}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", boxShadow: "0 8px 25px rgba(37,99,235,0.3)", fontSize: "15px" }}
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Quick Info Card */}
            <div className="rounded-2xl p-5" style={{ background: styles.cardBg, border: `1px solid ${styles.cardBorder}` }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: styles.textPrimary, marginBottom: "16px" }}>Quick Contact</h3>
              {[
                { icon: <Mail size={16} />, label: "Email", value: "support@jivansetu.org", color: "#3b82f6" },
                { icon: <Phone size={16} />, label: "Phone", value: "+91 1800-123-5678", color: "#10b981" },
                { icon: <Clock size={16} />, label: "Hours", value: "Mon–Sat, 9 AM – 9 PM IST", color: "#f59e0b" },
                { icon: <Globe size={16} />, label: "Website", value: "www.jivansetu.org", color: "#a855f7" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 mb-3.5 last:mb-0">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: styles.textMuted, letterSpacing: "0.05em" }}>{item.label}</p>
                    <p style={{ fontSize: "14px", color: styles.textPrimary, fontWeight: 500 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="rounded-2xl p-5" style={{ background: styles.cardBg, border: `1px solid ${styles.cardBorder}` }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: styles.textPrimary, marginBottom: "12px" }}>Follow Us</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Twitter / X", "Instagram", "Facebook", "LinkedIn"].map((platform) => (
                  <a key={platform} href="#" className="flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all"
                    style={{ border: `1px solid ${styles.cardBorder}`, fontSize: "14px", color: styles.textSecondary, fontWeight: 500 }}>
                    <ExternalLink size={14} />
                    {platform}
                  </a>
                ))}
              </div>
            </div>

            {/* Emergency Note */}
            <div className="rounded-2xl p-4" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}>
              <div className="flex items-start gap-2.5">
                <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#ef4444", marginBottom: "4px" }}>Medical Emergency?</p>
                  <p style={{ fontSize: "14px", color: styles.isDark ? "rgba(252,165,165,0.7)" : "#b91c1c", lineHeight: 1.5 }}>
                    Call <strong>112</strong> for any emergency, <strong>108</strong> for ambulance or <strong>1800-11-NOTTO</strong> for organ transplant support. Don't wait for email support.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Regional Offices */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-2 mb-4">
            <Building size={16} className="text-blue-500" />
            <p style={{ fontSize: "13px", color: styles.textLabel, fontWeight: 600, letterSpacing: "0.08em" }}>REGIONAL OFFICES</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {OFFICES.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-4"
                style={{ background: styles.cardBg, border: `1px solid ${styles.cardBorder}` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-blue-500" />
                  <p style={{ fontSize: "17px", fontWeight: 700, color: styles.textPrimary }}>{office.city}</p>
                </div>
                <p style={{ fontSize: "14px", color: styles.textSecondary, lineHeight: 1.5, marginBottom: "8px" }}>{office.address}</p>
                <div className="flex flex-col gap-1.5">
                  <p style={{ fontSize: "13px", color: styles.textMuted }}>📞 {office.phone}</p>
                  <p style={{ fontSize: "13px", color: styles.textMuted }}>✉️ {office.email}</p>
                  <p style={{ fontSize: "13px", color: styles.textMuted }}>🕐 {office.hours}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
