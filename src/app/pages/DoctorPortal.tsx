import { useState } from "react";
import { motion } from "motion/react";
import {
  Stethoscope, Shield, CheckCircle, XCircle, Clock, User,
  Heart, Droplets, MapPin, AlertTriangle, FileText, Eye, ChevronDown,
  Activity, Award, Lock, ArrowRight
} from "lucide-react";

type VerificationRequest = {
  id: number;
  patientName: string;
  age: number;
  type: "blood" | "organ";
  need: string;
  hospital: string;
  city: string;
  severity: "critical" | "high" | "moderate";
  submittedAt: string;
  documents: string[];
  note: string;
  status: "pending" | "verified" | "rejected";
};

const MOCK_REQUESTS: VerificationRequest[] = [
  { id: 1, patientName: "Arjun Sharma", age: 34, type: "blood", need: "O− Blood", hospital: "AIIMS New Delhi", city: "New Delhi", severity: "critical", submittedAt: "2 hours ago", documents: ["Prescription.pdf", "Lab Report.pdf"], note: "Post-accident trauma. ICU admission. Needs immediate 4 units.", status: "pending" },
  { id: 2, patientName: "Meera Pillai", age: 52, type: "organ", need: "Kidney", hospital: "KEM Hospital", city: "Mumbai", severity: "critical", submittedAt: "4 hours ago", documents: ["Form18.pdf", "Medical Report.pdf", "NOTTO Registration.pdf"], note: "End-stage renal disease. MELD score 28. On dialysis 3 years.", status: "pending" },
  { id: 3, patientName: "Suresh Kumar", age: 28, type: "blood", need: "AB+ Blood", hospital: "Apollo Hospitals", city: "Chennai", severity: "high", submittedAt: "6 hours ago", documents: ["Prescription.pdf"], note: "Surgery scheduled in 12 hours. Requires 2 units packed RBC.", status: "pending" },
  { id: 4, patientName: "Fatima Begum", age: 47, type: "organ", need: "Liver", hospital: "Narayana Health", city: "Bangalore", severity: "high", submittedAt: "8 hours ago", documents: ["Form18.pdf", "CT Scan Report.pdf"], note: "MELD score 32. Partial liver from living donor considered.", status: "pending" },
  { id: 5, patientName: "Priya N.", age: 19, type: "blood", need: "B− Blood", hospital: "PGI Chandigarh", city: "Chandigarh", severity: "critical", submittedAt: "12 hours ago", documents: ["Lab Report.pdf", "Prescription.pdf"], note: "Rare blood type. Thalassemia patient.", status: "pending" },
];

const SEVERITY_STYLE = {
  critical: { color: "#ef4444", bg: "rgba(220,38,38,0.12)", border: "rgba(220,38,38,0.25)" },
  high: { color: "#f59e0b", bg: "rgba(217,119,6,0.1)", border: "rgba(217,119,6,0.2)" },
  moderate: { color: "#10b981", bg: "rgba(5,150,105,0.1)", border: "rgba(5,150,105,0.2)" },
};

export function DoctorPortal() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mciNumber, setMciNumber] = useState("");
  const [password, setPassword] = useState("");
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [rejectingId, setRejectingId] = useState<number | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  const handleVerify = (id: number) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "verified" as const } : r));
  };

  const handleReject = (id: number) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "rejected" as const } : r));
    setRejectingId(null);
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const verifiedCount = requests.filter((r) => r.status === "verified").length;

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#060d1f" }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl p-8"
          style={{ background: "linear-gradient(180deg, rgba(30,58,138,0.1), rgba(0,0,0,0))", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>

          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #065f46, #059669)" }}>
              <Stethoscope size={28} color="white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Doctor's Portal</h2>
            <p className="text-sm text-center" style={{ color: "rgba(110,231,183,0.6)" }}>
              For verified medical professionals only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium pl-1" style={{ color: "rgba(110,231,183,0.8)" }}>MCI Registration Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Shield size={16} className="text-white/40" />
                </div>
                <input type="text" value={mciNumber} onChange={(e) => setMciNumber(e.target.value)} required
                  placeholder="MCI-XXXX-XXXXX"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium pl-1" style={{ color: "rgba(110,231,183,0.8)" }}>Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={16} className="text-white/40" />
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            </div>

            <button type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-white mt-6 flex items-center justify-center gap-2 group transition-all"
              style={{ background: "linear-gradient(135deg, #065f46, #059669)", boxShadow: "0 8px 20px rgba(5,150,105,0.25)" }}>
              Access Portal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-4 flex items-start gap-2 px-3 py-2.5 rounded-xl"
            style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.15)" }}>
            <AlertTriangle size={12} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <p style={{ fontSize: "11px", color: "rgba(253,230,138,0.7)", lineHeight: 1.4 }}>
              Demo mode: Enter any MCI number and password to access.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#060d1f" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope size={14} className="text-green-400" />
              <span style={{ fontSize: "12px", color: "#6ee7b7", fontWeight: 700, letterSpacing: "0.1em" }}>DOCTOR'S PORTAL</span>
            </div>
            <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, color: "white" }}>Verification Dashboard</h1>
            <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)" }}>Review and validate patient requests</p>
          </div>

          {/* Doctor Profile Card */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.2)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #065f46, #059669)" }}>
              <User size={18} color="white" />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>Dr. Priya Nair</p>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={10} className="text-green-400" />
                <span style={{ fontSize: "11px", color: "#6ee7b7" }}>MCI Verified · Transplant Surgeon</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Pending", value: pendingCount, icon: <Clock size={16} />, color: "#f59e0b" },
            { label: "Verified Today", value: verifiedCount, icon: <CheckCircle size={16} />, color: "#10b981" },
            { label: "Total Verified", value: 247 + verifiedCount, icon: <Award size={16} />, color: "#3b82f6" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${s.color}22`, color: s.color }}>{s.icon}</div>
              <p style={{ fontSize: "24px", fontWeight: 800, color: "white" }}>{s.value}</p>
              <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Request Cards */}
        <div className="flex flex-col gap-4">
          {requests.map((req, i) => {
            const sev = SEVERITY_STYLE[req.severity];
            return (
              <motion.div key={req.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: req.status === "verified" ? "rgba(16,185,129,0.06)" : req.status === "rejected" ? "rgba(220,38,38,0.04)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${req.status === "verified" ? "rgba(16,185,129,0.2)" : req.status === "rejected" ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.08)"}`,
                  opacity: req.status !== "pending" ? 0.7 : 1,
                }}>
                <div className="h-0.5" style={{ background: req.status === "verified" ? "#10b981" : req.status === "rejected" ? "#ef4444" : `linear-gradient(90deg, ${sev.color}, ${sev.color}88)` }} />

                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Status Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        {req.status === "pending" && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: sev.bg, border: `1px solid ${sev.border}` }}>
                            {req.severity === "critical" && <span className="animate-pulse">●</span>}
                            <span style={{ fontSize: "10px", fontWeight: 700, color: sev.color, letterSpacing: "0.06em" }}>{req.severity.toUpperCase()}</span>
                          </div>
                        )}
                        {req.status === "verified" && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                            <CheckCircle size={11} className="text-green-400" />
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#6ee7b7", letterSpacing: "0.06em" }}>VERIFIED BY DOCTOR</span>
                          </div>
                        )}
                        {req.status === "rejected" && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)" }}>
                            <XCircle size={11} className="text-red-400" />
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#fca5a5", letterSpacing: "0.06em" }}>REJECTED</span>
                          </div>
                        )}
                        <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>Submitted {req.submittedAt}</span>
                      </div>

                      {/* Patient */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ background: req.type === "blood" ? "linear-gradient(135deg, #7f1d1d, #dc2626)" : "linear-gradient(135deg, #1e3a8a, #2563eb)" }}>
                          {req.type === "blood" ? <Droplets size={18} color="white" /> : <Heart size={18} fill="white" color="white" />}
                        </div>
                        <div>
                          <p style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>{req.patientName}, {req.age} yrs</p>
                          <div className="flex items-center gap-2">
                            <MapPin size={11} className="text-white/40" />
                            <span style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)" }}>{req.hospital}, {req.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl px-3 py-2 mb-3 inline-block" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <span style={{ fontSize: "10px", color: "rgba(148,163,184,0.5)" }}>Needs: </span>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "white" }}>{req.need}</span>
                      </div>

                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginBottom: "8px" }}>{req.note}</p>

                      <div className="flex items-center gap-2 flex-wrap">
                        {req.documents.map((doc) => (
                          <div key={doc} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <FileText size={11} className="text-white/40" />
                            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>{doc}</span>
                            <Eye size={11} className="text-blue-400 cursor-pointer" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    {req.status === "pending" && (
                      <div className="flex md:flex-col gap-2 flex-shrink-0">
                        <button onClick={() => handleVerify(req.id)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                          style={{ background: "linear-gradient(135deg, #065f46, #059669)", fontSize: "13px" }}>
                          <CheckCircle size={14} /> Verify
                        </button>
                        {rejectingId === req.id ? (
                          <div className="flex flex-col gap-2">
                            <select className="rounded-lg px-3 py-2 text-white text-xs outline-none"
                              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                              defaultValue="">
                              <option value="" disabled style={{ background: "#0f172a" }}>Reason</option>
                              <option style={{ background: "#0f172a" }}>Incomplete documents</option>
                              <option style={{ background: "#0f172a" }}>Invalid medical data</option>
                              <option style={{ background: "#0f172a" }}>Duplicate request</option>
                              <option style={{ background: "#0f172a" }}>Other</option>
                            </select>
                            <button onClick={() => handleReject(req.id)}
                              className="px-4 py-2 rounded-lg text-xs font-semibold text-white"
                              style={{ background: "rgba(220,38,38,0.2)", border: "1px solid rgba(220,38,38,0.3)" }}>
                              Confirm Reject
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setRejectingId(req.id)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all hover:bg-red-500/10"
                            style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "#fca5a5", fontSize: "13px" }}>
                            <XCircle size={14} /> Reject
                            <ChevronDown size={12} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* NOTTO Notice */}
        <div className="mt-8 rounded-2xl p-5" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
          <div className="flex items-start gap-3">
            <Activity size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <p style={{ fontSize: "13px", color: "rgba(147,197,253,0.85)", lineHeight: 1.6 }}>
              <strong style={{ color: "#93c5fd" }}>Verification Notice:</strong> Your verification adds a "Verified by Doctor" badge to the patient's request, increasing its priority in the matching system. All verifications are logged and auditable per NOTTO guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
