import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Droplets, Heart, ArrowRight, CheckCircle, Info, ChevronDown } from "lucide-react";

const BLOOD_TYPES = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"] as const;
type BloodType = typeof BLOOD_TYPES[number];

const COMPATIBILITY: Record<BloodType, { donateTo: BloodType[]; receiveFrom: BloodType[] }> = {
  "A+":  { donateTo: ["A+", "AB+"], receiveFrom: ["A+", "A−", "O+", "O−"] },
  "A−":  { donateTo: ["A+", "A−", "AB+", "AB−"], receiveFrom: ["A−", "O−"] },
  "B+":  { donateTo: ["B+", "AB+"], receiveFrom: ["B+", "B−", "O+", "O−"] },
  "B−":  { donateTo: ["B+", "B−", "AB+", "AB−"], receiveFrom: ["B−", "O−"] },
  "AB+": { donateTo: ["AB+"], receiveFrom: ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"] },
  "AB−": { donateTo: ["AB+", "AB−"], receiveFrom: ["A−", "B−", "AB−", "O−"] },
  "O+":  { donateTo: ["A+", "B+", "AB+", "O+"], receiveFrom: ["O+", "O−"] },
  "O−":  { donateTo: ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"], receiveFrom: ["O−"] },
};

const BLOOD_FACTS: Record<BloodType, { prevalence: string; fact: string; tag: string }> = {
  "A+":  { prevalence: "22.8%", fact: "Second most common blood type in India. Great for platelet donations!", tag: "Common" },
  "A−":  { prevalence: "5.3%", fact: "Relatively rare. Your blood can help both A+ and AB+ patients.", tag: "Uncommon" },
  "B+":  { prevalence: "32.3%", fact: "Most common blood type in India! One in three people share your type.", tag: "Most Common" },
  "B−":  { prevalence: "3.9%", fact: "Rare blood type. Less than 4% of Indians have B−. Your donations are precious!", tag: "Rare" },
  "AB+": { prevalence: "6.4%", fact: "Universal plasma donor! Your plasma can be given to anyone regardless of type.", tag: "Universal Plasma" },
  "AB−": { prevalence: "0.7%", fact: "Rarest blood type in India! Fewer than 1 in 100 people have AB−.", tag: "Rarest" },
  "O+":  { prevalence: "26.6%", fact: "Can donate to all positive blood types. High demand in emergencies!", tag: "High Demand" },
  "O−":  { prevalence: "1.9%", fact: "Universal red cell donor! Used in every emergency when there's no time to type-match.", tag: "Universal Donor" },
};

const TYPE_COLORS: Record<BloodType, { bg: string; border: string; text: string; glow: string }> = {
  "A+":  { bg: "rgba(37,99,235,0.15)", border: "rgba(37,99,235,0.4)", text: "#93c5fd", glow: "rgba(37,99,235,0.3)" },
  "A−":  { bg: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.4)", text: "#a5b4fc", glow: "rgba(99,102,241,0.3)" },
  "B+":  { bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.4)", text: "#6ee7b7", glow: "rgba(16,185,129,0.3)" },
  "B−":  { bg: "rgba(6,182,212,0.15)", border: "rgba(6,182,212,0.4)", text: "#67e8f9", glow: "rgba(6,182,212,0.3)" },
  "AB+": { bg: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.4)", text: "#c4b5fd", glow: "rgba(168,85,247,0.3)" },
  "AB−": { bg: "rgba(236,72,153,0.15)", border: "rgba(236,72,153,0.4)", text: "#f9a8d4", glow: "rgba(236,72,153,0.3)" },
  "O+":  { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.4)", text: "#fde68a", glow: "rgba(245,158,11,0.3)" },
  "O−":  { bg: "rgba(220,38,38,0.15)", border: "rgba(220,38,38,0.4)", text: "#fca5a5", glow: "rgba(220,38,38,0.3)" },
};

export function BloodCompatibility() {
  const [selected, setSelected] = useState<BloodType | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);

  const compat = selected ? COMPATIBILITY[selected] : null;
  const facts = selected ? BLOOD_FACTS[selected] : null;
  const colors = selected ? TYPE_COLORS[selected] : null;

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p style={{ fontSize: "12px", color: "#93c5fd", letterSpacing: "0.1em", fontWeight: 600 }} className="mb-3">EDUCATIONAL TOOL</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Blood Compatibility{" "}
            <span style={{ background: "linear-gradient(90deg, #dc2626, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Calculator
            </span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(148,163,184,0.8)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Select your blood type to see who you can donate to and receive from. Knowledge saves lives!
          </p>
        </motion.div>

        {/* Blood Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <p style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.7)", letterSpacing: "0.06em", marginBottom: "12px", textAlign: "center" }}>
            SELECT YOUR BLOOD TYPE
          </p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-2xl mx-auto">
            {BLOOD_TYPES.map((bt) => {
              const c = TYPE_COLORS[bt];
              const isSelected = selected === bt;
              return (
                <motion.button
                  key={bt}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected(bt)}
                  className="flex flex-col items-center gap-1 py-4 rounded-2xl transition-all"
                  style={{
                    background: isSelected ? c.bg : "rgba(255,255,255,0.04)",
                    border: isSelected ? `2px solid ${c.border}` : "2px solid rgba(255,255,255,0.08)",
                    boxShadow: isSelected ? `0 0 25px ${c.glow}` : "none",
                  }}
                >
                  <Droplets size={18} style={{ color: isSelected ? c.text : "rgba(255,255,255,0.3)" }} />
                  <span style={{
                    fontSize: "18px", fontWeight: 800,
                    color: isSelected ? c.text : "rgba(255,255,255,0.5)",
                  }}>
                    {bt}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {selected && compat && facts && colors && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              {/* Fact Card */}
              <div className="rounded-3xl p-6 mb-6" style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
                    style={{ background: `${colors.border}`, boxShadow: `0 8px 25px ${colors.glow}` }}>
                    <Droplets size={16} color="white" />
                    <span style={{ fontSize: "16px", fontWeight: 900, color: "white" }}>{selected}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full" style={{ fontSize: "10px", fontWeight: 700, background: `${colors.border}44`, color: colors.text, border: `1px solid ${colors.border}` }}>
                        {facts.tag}
                      </span>
                      <span style={{ fontSize: "12px", color: colors.text, fontWeight: 600 }}>
                        {facts.prevalence} of India's population
                      </span>
                    </div>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>{facts.fact}</p>
                  </div>
                </div>
              </div>

              {/* Can Donate To / Can Receive From */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Donate To */}
                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.15)", color: "#6ee7b7" }}>
                      <ArrowRight size={14} />
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Can Donate To</p>
                      <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>{compat.donateTo.length} compatible types</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {BLOOD_TYPES.map((bt) => {
                      const canDonate = compat.donateTo.includes(bt);
                      return (
                        <motion.div
                          key={bt}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: canDonate ? 0.1 : 0 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                          style={{
                            background: canDonate ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.03)",
                            border: canDonate ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(255,255,255,0.06)",
                            opacity: canDonate ? 1 : 0.3,
                          }}
                        >
                          {canDonate && <CheckCircle size={11} className="text-green-400" />}
                          <span style={{ fontSize: "13px", fontWeight: 700, color: canDonate ? "#6ee7b7" : "rgba(255,255,255,0.4)" }}>
                            {bt}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                  {compat.donateTo.length === 8 && (
                    <div className="flex items-center gap-1.5 mt-3 px-3 py-2 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                      <Heart size={12} className="text-green-400" />
                      <span style={{ fontSize: "11px", color: "#6ee7b7", fontWeight: 600 }}>🎉 Universal Donor! Can donate to everyone!</span>
                    </div>
                  )}
                </div>

                {/* Receive From */}
                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(37,99,235,0.15)", color: "#93c5fd" }}>
                      <Droplets size={14} />
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>Can Receive From</p>
                      <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>{compat.receiveFrom.length} compatible types</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {BLOOD_TYPES.map((bt) => {
                      const canReceive = compat.receiveFrom.includes(bt);
                      return (
                        <motion.div
                          key={bt}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: canReceive ? 0.1 : 0 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                          style={{
                            background: canReceive ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.03)",
                            border: canReceive ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(255,255,255,0.06)",
                            opacity: canReceive ? 1 : 0.3,
                          }}
                        >
                          {canReceive && <CheckCircle size={11} className="text-blue-400" />}
                          <span style={{ fontSize: "13px", fontWeight: 700, color: canReceive ? "#93c5fd" : "rgba(255,255,255,0.4)" }}>
                            {bt}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                  {compat.receiveFrom.length === 8 && (
                    <div className="flex items-center gap-1.5 mt-3 px-3 py-2 rounded-lg" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}>
                      <Heart size={12} className="text-blue-400" />
                      <span style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 600 }}>🎉 Universal Recipient! Can receive from everyone!</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Compatibility Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden mb-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className="w-full flex items-center justify-between px-6 py-4 transition-all hover:bg-white/[0.03]"
          >
            <div className="flex items-center gap-2">
              <Info size={14} className="text-blue-400" />
              <span style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>Full Compatibility Matrix</span>
            </div>
            <ChevronDown size={16} className="text-white/40" style={{ transform: showMatrix ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>

          <AnimatePresence>
            {showMatrix && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 overflow-x-auto">
                  <table className="w-full min-w-[600px]" style={{ borderCollapse: "separate", borderSpacing: "2px" }}>
                    <thead>
                      <tr>
                        <th className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", fontSize: "11px", color: "rgba(148,163,184,0.6)", fontWeight: 600 }}>
                          Donor → Recipient
                        </th>
                        {BLOOD_TYPES.map((bt) => (
                          <th key={bt} className="p-2 rounded-lg" style={{
                            background: selected === bt ? TYPE_COLORS[bt].bg : "rgba(255,255,255,0.06)",
                            fontSize: "12px", fontWeight: 700, color: selected === bt ? TYPE_COLORS[bt].text : "rgba(255,255,255,0.6)",
                          }}>
                            {bt}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {BLOOD_TYPES.map((donor) => (
                        <tr key={donor}>
                          <td className="p-2 rounded-lg" style={{
                            background: selected === donor ? TYPE_COLORS[donor].bg : "rgba(255,255,255,0.06)",
                            fontSize: "12px", fontWeight: 700, color: selected === donor ? TYPE_COLORS[donor].text : "rgba(255,255,255,0.6)",
                          }}>
                            {donor}
                          </td>
                          {BLOOD_TYPES.map((recipient) => {
                            const canDonate = COMPATIBILITY[donor].donateTo.includes(recipient);
                            return (
                              <td key={recipient} className="p-2 text-center rounded-lg" style={{
                                background: canDonate ? "rgba(16,185,129,0.1)" : "rgba(220,38,38,0.05)",
                                fontSize: "14px",
                              }}>
                                {canDonate ? (
                                  <span style={{ color: "#6ee7b7" }}>✓</span>
                                ) : (
                                  <span style={{ color: "rgba(255,255,255,0.15)" }}>✗</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)", marginBottom: "16px" }}>
            Now that you know your compatibility, take the next step — save a life today.
          </p>
          <Link
            to="/register?type=blood-donor"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #b91c1c, #dc2626)", boxShadow: "0 12px 40px rgba(220,38,38,0.3)", fontSize: "15px" }}
          >
            <Droplets size={18} />
            Register as Blood Donor
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
