import { useState } from "react";
import { motion } from "motion/react";
import {
  Heart, CheckCircle, Droplets, MapPin, Calendar, Shield, QrCode,
  Download, Share2, ArrowRight, Award, User, Sparkles
} from "lucide-react";

type PledgeDonor = {
  id: number;
  name: string;
  nameHi: string;
  city: string;
  state: string;
  bloodType: string;
  organs: string[];
  date: string;
  isPremium: boolean;
};

const PLEDGE_DONORS: PledgeDonor[] = [
  { id: 1, name: "Rajesh Sharma", nameHi: "राजेश शर्मा", city: "Delhi", state: "Delhi", bloodType: "O+", organs: ["Heart", "Kidneys", "Liver", "Corneas"], date: "17 Apr 2026", isPremium: true },
  { id: 2, name: "Priya Nair", nameHi: "प्रिया नायर", city: "Kochi", state: "Kerala", bloodType: "A+", organs: ["Kidneys", "Corneas"], date: "16 Apr 2026", isPremium: false },
  { id: 3, name: "Vikram Singh", nameHi: "विक्रम सिंह", city: "Jaipur", state: "Rajasthan", bloodType: "B+", organs: ["Heart", "Lungs", "Liver", "Kidneys", "Corneas", "Pancreas"], date: "15 Apr 2026", isPremium: true },
  { id: 4, name: "Sunita Patel", nameHi: "सुनीता पटेल", city: "Ahmedabad", state: "Gujarat", bloodType: "AB−", organs: ["Liver", "Corneas"], date: "14 Apr 2026", isPremium: false },
  { id: 5, name: "Arun Kumar", nameHi: "अरुण कुमार", city: "Chennai", state: "Tamil Nadu", bloodType: "O−", organs: ["Heart", "Kidneys", "Liver"], date: "13 Apr 2026", isPremium: true },
  { id: 6, name: "Fatima Khan", nameHi: "फातिमा खान", city: "Mumbai", state: "Maharashtra", bloodType: "B−", organs: ["Corneas", "Kidneys"], date: "12 Apr 2026", isPremium: false },
  { id: 7, name: "Deepak Verma", nameHi: "दीपक वर्मा", city: "Lucknow", state: "UP", bloodType: "A−", organs: ["Heart", "Liver", "Corneas"], date: "11 Apr 2026", isPremium: false },
  { id: 8, name: "Lakshmi Iyer", nameHi: "लक्ष्मी अय्यर", city: "Bangalore", state: "Karnataka", bloodType: "AB+", organs: ["Kidneys", "Liver", "Pancreas"], date: "10 Apr 2026", isPremium: true },
  { id: 9, name: "Mohammed Ali", nameHi: "मोहम्मद अली", city: "Hyderabad", state: "Telangana", bloodType: "O+", organs: ["Heart", "Kidneys"], date: "9 Apr 2026", isPremium: false },
  { id: 10, name: "Neha Gupta", nameHi: "नेहा गुप्ता", city: "Kolkata", state: "West Bengal", bloodType: "B+", organs: ["Corneas", "Liver"], date: "8 Apr 2026", isPremium: false },
  { id: 11, name: "Sanjay Rao", nameHi: "संजय राव", city: "Pune", state: "Maharashtra", bloodType: "A+", organs: ["Heart", "Kidneys", "Liver", "Lungs", "Corneas"], date: "7 Apr 2026", isPremium: true },
  { id: 12, name: "Ananya Trivedi", nameHi: "अनन्या त्रिवेदी", city: "Chandigarh", state: "Punjab", bloodType: "O−", organs: ["Kidneys", "Corneas"], date: "6 Apr 2026", isPremium: false },
];

const BLOOD_TYPES = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const ORGANS = ["Heart", "Kidneys", "Liver", "Lungs", "Corneas", "Pancreas"];

export function PledgeWall() {
  const [showForm, setShowForm] = useState(false);
  const [pledgeName, setPledgeName] = useState("");
  const [pledgeBlood, setPledgeBlood] = useState("");
  const [pledgeOrgans, setPledgeOrgans] = useState<string[]>([]);
  const [pledgeCity, setPledgeCity] = useState("");
  const [generated, setGenerated] = useState(false);

  const toggleOrgan = (o: string) => {
    setPledgeOrgans((prev) => prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]);
  };

  const handleGenerate = () => {
    if (pledgeName && pledgeBlood && pledgeOrgans.length > 0) {
      setGenerated(true);
    }
  };

  const totalPledgers = PLEDGE_DONORS.length + (generated ? 1 : 0);

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award size={14} className="text-yellow-400" />
            <span style={{ fontSize: "12px", color: "#fde68a", fontWeight: 700, letterSpacing: "0.1em" }}>THE PLEDGE WALL</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Wall of{" "}
            <span style={{ background: "linear-gradient(90deg, #dc2626, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Heroes
            </span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(148,163,184,0.8)", marginBottom: "16px" }}>
            {totalPledgers} people have pledged to save lives through organ and blood donation
          </p>
          <button onClick={() => { setShowForm(true); setGenerated(false); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #b91c1c, #dc2626)", boxShadow: "0 8px 25px rgba(220,38,38,0.3)", fontSize: "14px" }}>
            <Heart size={16} fill="white" />
            Create Your Pledge
          </button>
        </motion.div>

        {/* Pledge Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-10">
          {PLEDGE_DONORS.map((donor, i) => (
            <motion.div key={donor.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl p-4 relative overflow-hidden group"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {donor.isPremium && (
                <div className="absolute top-0 right-0">
                  <div className="px-2 py-0.5 rounded-bl-lg" style={{ background: "rgba(234,179,8,0.2)", borderBottom: "1px solid rgba(234,179,8,0.3)", borderLeft: "1px solid rgba(234,179,8,0.3)" }}>
                    <Sparkles size={10} className="text-yellow-400" />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                  style={{ background: `linear-gradient(135deg, hsl(${donor.id * 30}, 70%, 25%), hsl(${donor.id * 30}, 70%, 40%))`, fontSize: "14px", color: "white" }}>
                  {donor.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "white", lineHeight: 1.2 }} className="truncate">{donor.name}</p>
                  <p style={{ fontSize: "10px", color: "rgba(148,163,184,0.5)", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{donor.nameHi}</p>
                </div>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7f1d1d, #dc2626)" }}>
                  <span style={{ fontSize: "11px", fontWeight: 900, color: "white" }}>{donor.bloodType}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {donor.organs.map((organ) => (
                  <span key={organ} className="px-2 py-0.5 rounded-full"
                    style={{ fontSize: "10px", background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)", color: "#93c5fd" }}>
                    {organ}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <MapPin size={10} className="text-white/30" />
                  <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>{donor.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={10} className="text-white/30" />
                  <span style={{ fontSize: "10px", color: "rgba(148,163,184,0.4)" }}>{donor.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Pledge Form / Certificate */}
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mb-10" id="pledge-form">

            {!generated ? (
              <div className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "4px" }}>Create Your Pledge</h3>
                <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.7)", marginBottom: "20px" }}>Generate your digital Donor Certificate</p>

                {/* Name */}
                <div className="mb-4">
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)", marginBottom: "6px", display: "block" }}>Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="text" value={pledgeName} onChange={(e) => setPledgeName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
                  </div>
                </div>

                {/* City */}
                <div className="mb-4">
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)", marginBottom: "6px", display: "block" }}>City</label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="text" value={pledgeCity} onChange={(e) => setPledgeCity(e.target.value)}
                      placeholder="Your city"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} />
                  </div>
                </div>

                {/* Blood Type */}
                <div className="mb-4">
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)", marginBottom: "6px", display: "block" }}>Blood Group</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {BLOOD_TYPES.map((bt) => (
                      <button key={bt} onClick={() => setPledgeBlood(bt)}
                        className="py-2 rounded-lg transition-all"
                        style={{
                          fontSize: "12px", fontWeight: 700,
                          background: pledgeBlood === bt ? "linear-gradient(135deg, #b91c1c, #dc2626)" : "rgba(255,255,255,0.06)",
                          color: pledgeBlood === bt ? "white" : "rgba(255,255,255,0.5)",
                          border: pledgeBlood === bt ? "none" : "1px solid rgba(255,255,255,0.08)",
                        }}>
                        {bt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Organs */}
                <div className="mb-6">
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)", marginBottom: "6px", display: "block" }}>Organs to Pledge</label>
                  <div className="grid grid-cols-3 gap-2">
                    {ORGANS.map((o) => (
                      <button key={o} onClick={() => toggleOrgan(o)}
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl transition-all text-left"
                        style={{
                          background: pledgeOrgans.includes(o) ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                          border: pledgeOrgans.includes(o) ? "1px solid rgba(37,99,235,0.5)" : "1px solid rgba(255,255,255,0.08)",
                          fontSize: "12px", color: pledgeOrgans.includes(o) ? "white" : "rgba(255,255,255,0.5)",
                        }}>
                        {pledgeOrgans.includes(o) ? <CheckCircle size={12} className="text-blue-400" /> : <div className="w-3 h-3 rounded-full border border-white/20" />}
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={handleGenerate}
                  disabled={!pledgeName || !pledgeBlood || pledgeOrgans.length === 0}
                  className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #b91c1c, #dc2626)", fontSize: "15px" }}>
                  <Award size={18} />
                  Generate Certificate
                </button>
              </div>
            ) : (
              /* Generated Certificate */
              <div>
                <div className="rounded-3xl overflow-hidden mb-4"
                  style={{ boxShadow: "0 25px 80px rgba(37,99,235,0.2), 0 0 0 1px rgba(37,99,235,0.15)" }}>

                  {/* Certificate Header */}
                  <div className="p-6 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #0f172a, #1e3a8a, #1e40af)" }}>
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
                      style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }} />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                            <Heart size={16} fill="white" color="white" />
                          </div>
                          <div>
                            <p style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>JivanSetu</p>
                            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>जीवनसेतु</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                          style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)" }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <span style={{ fontSize: "10px", color: "#6ee7b7", fontWeight: 700 }}>ACTIVE PLEDGE</span>
                        </div>
                      </div>

                      <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", marginBottom: "2px" }}>CERTIFICATE OF PLEDGE</p>
                      <p style={{ fontSize: "22px", fontWeight: 800, color: "white", lineHeight: 1.1 }}>{pledgeName}</p>
                    </div>
                  </div>

                  {/* Certificate Body */}
                  <div className="p-6" style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pledgeOrgans.map((organ) => (
                        <div key={organ} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                          style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}>
                          <CheckCircle size={11} className="text-blue-400" />
                          <span style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600 }}>{organ}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: "Blood Group", value: pledgeBlood, icon: <Droplets size={12} /> },
                        { label: "Location", value: pledgeCity || "India", icon: <MapPin size={12} /> },
                        { label: "Pledge ID", value: `JS-2026-PL-${(Math.random() * 99999).toFixed(0).padStart(5, "0")}`, icon: <Shield size={12} /> },
                        { label: "Pledge Date", value: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), icon: <Calendar size={12} /> },
                      ].map((d) => (
                        <div key={d.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-white/30">{d.icon}</span>
                            <p style={{ fontSize: "10px", color: "rgba(148,163,184,0.5)" }}>{d.label}</p>
                          </div>
                          <p style={{ fontSize: "12px", color: "white", fontWeight: 600 }}>{d.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* QR Code */}
                    <div className="flex items-center gap-4 px-4 py-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.06)" }}>
                        <QrCode size={24} className="text-white/40" />
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", fontWeight: 600, color: "white" }}>QR Verification Code</p>
                        <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>Scannable by NOTTO-registered hospitals</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-3" style={{ background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>NOTTO Affiliated · THOTA 1994 Compliant</span>
                      <div className="flex items-center gap-1.5">
                        <Shield size={11} className="text-blue-400" />
                        <span style={{ fontSize: "11px", color: "#93c5fd" }}>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-semibold transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", fontSize: "14px" }}>
                    <Download size={15} /> Download PDF
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-all hover:bg-white/8"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "14px", color: "white" }}>
                    <Share2 size={15} /> Share Card
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
