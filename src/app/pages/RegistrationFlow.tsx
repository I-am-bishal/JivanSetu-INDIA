import { useState } from "react";
import { useSearchParams, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, Droplets, Activity, Zap, CheckCircle, ArrowRight, ArrowLeft,
  Upload, Shield, Phone, User, Calendar, MapPin, AlertCircle, Sparkles
} from "lucide-react";

const PERSONA_CONFIG = {
  "organ-donor": { title: "Organ Donor", titleHi: "अंग दाता", color: "#dc2626", gradient: "linear-gradient(135deg, #7f1d1d, #dc2626)", icon: <Heart size={24} fill="white" color="white" /> },
  "organ-receiver": { title: "Organ Receiver", titleHi: "अंग प्राप्तकर्ता", color: "#2563eb", gradient: "linear-gradient(135deg, #1e3a8a, #2563eb)", icon: <Activity size={24} color="white" /> },
  "blood-donor": { title: "Blood Donor", titleHi: "रक्त दाता", color: "#ea580c", gradient: "linear-gradient(135deg, #7c2d12, #ea580c)", icon: <Droplets size={24} color="white" /> },
  "blood-receiver": { title: "Blood Receiver", titleHi: "रक्त प्राप्तकर्ता", color: "#059669", gradient: "linear-gradient(135deg, #064e3b, #059669)", icon: <Zap size={24} fill="white" color="white" /> },
};

const BLOOD_TYPES = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const ORGANS = ["Heart", "Kidneys", "Liver", "Lungs", "Corneas", "Pancreas", "Small Intestine"];
const STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"];

const STEPS = ["Personal Info", "Verify OTP", "Medical Details", "Documents", "Done"];

type FormData = {
  fullName: string;
  mobile: string;
  aadhaar: string;
  dob: string;
  bloodType: string;
  city: string;
  state: string;
  organs: string[];
  urgency: string;
  hospital: string;
  otp: string[];
  docUploaded: boolean;
  certUploaded: boolean;
};

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: i < current ? "#10b981" : i === current ? "#2563eb" : "rgba(255,255,255,0.08)",
                border: i === current ? "2px solid rgba(96,165,250,0.5)" : "none",
                boxShadow: i === current ? "0 0 20px rgba(37,99,235,0.4)" : "none",
              }}
            >
              {i < current ? (
                <CheckCircle size={16} color="white" />
              ) : (
                <span style={{ fontSize: "13px", fontWeight: 700, color: i === current ? "white" : "rgba(255,255,255,0.3)" }}>
                  {i + 1}
                </span>
              )}
            </div>
            <span style={{ fontSize: "10px", color: i === current ? "white" : "rgba(255,255,255,0.3)", fontWeight: i === current ? 600 : 400, whiteSpace: "nowrap" }}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="w-12 h-0.5 mt-[-14px] mx-1"
              style={{ background: i < current ? "#10b981" : "rgba(255,255,255,0.08)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder, icon }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)", letterSpacing: "0.03em" }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl outline-none transition-all placeholder-white/20 text-white"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: `12px ${icon ? "12px 12px 44px" : "12px"}`,
            paddingLeft: icon ? "44px" : "12px",
            fontSize: "14px",
          }}
          onFocus={(e) => { e.target.style.borderColor = "rgba(37,99,235,0.6)"; e.target.style.background = "rgba(37,99,235,0.08)"; }}
          onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.06)"; }}
        />
      </div>
    </div>
  );
}

export function RegistrationFlow() {
  const [searchParams] = useSearchParams();
  const personaType = (searchParams.get("type") || "organ-donor") as keyof typeof PERSONA_CONFIG;
  const persona = PERSONA_CONFIG[personaType] || PERSONA_CONFIG["organ-donor"];
  const { t } = useTranslation();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    fullName: "", mobile: "", aadhaar: "", dob: "", bloodType: "", city: "", state: "",
    organs: [], urgency: "moderate", hospital: "", otp: ["", "", "", "", "", ""],
    docUploaded: false, certUploaded: false,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const updateForm = (key: keyof FormData, val: any) => setForm((prev) => ({ ...prev, [key]: val }));

  const toggleOrgan = (organ: string) => {
    setForm((prev) => ({
      ...prev,
      organs: prev.organs.includes(organ) ? prev.organs.filter((o) => o !== organ) : [...prev.organs, organ],
    }));
  };

  const handleOTPChange = (idx: number, val: string) => {
    const newOtp = [...form.otp];
    newOtp[idx] = val.slice(-1);
    updateForm("otp", newOtp);
    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleSendOTP = () => { setOtpSent(true); };
  const handleVerifyOTP = () => {
    if (form.otp.join("").length === 6) setOtpVerified(true);
    setStep(2);
  };

  const isBloodType = personaType === "blood-donor" || personaType === "blood-receiver";
  const isReceiver = personaType === "organ-receiver" || personaType === "blood-receiver";

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f" }}>
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link to="/" className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/8 transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <ArrowLeft size={16} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: persona.gradient }}>
              {persona.icon}
            </div>
            <div>
              <p style={{ fontSize: "18px", fontWeight: 700, color: "white" }}>Register as {persona.title}</p>
              <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)", fontFamily: "'Noto Sans Devanagari', sans-serif" }}>{persona.titleHi} · जीवनसेतु</p>
            </div>
          </div>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator steps={STEPS} current={step} />

        {/* Form Card */}
        <div
          className="rounded-3xl p-6 md:p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <AnimatePresence mode="wait">
            {/* STEP 0: Personal Info */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "4px" }}>Personal Information</h2>
                <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.7)", marginBottom: "24px" }}>Your details are encrypted and PDPA 2023 compliant</p>
                <div className="flex flex-col gap-4">
                  <InputField label="Full Name (as on Aadhaar)" value={form.fullName} onChange={(v: string) => updateForm("fullName", v)} placeholder="e.g. Rajesh Kumar Sharma" icon={<User size={15} />} />
                  <InputField label="Aadhaar Number" value={form.aadhaar} onChange={(v: string) => updateForm("aadhaar", v)} placeholder="XXXX XXXX XXXX" icon={<Shield size={15} />} type="tel" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Date of Birth" value={form.dob} onChange={(v: string) => updateForm("dob", v)} type="date" icon={<Calendar size={15} />} />
                    <div className="flex flex-col gap-1.5">
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)", letterSpacing: "0.03em" }}>Blood Group</label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {BLOOD_TYPES.map((bt) => (
                          <button
                            key={bt}
                            onClick={() => updateForm("bloodType", bt)}
                            className="py-2 rounded-lg transition-all"
                            style={{
                              fontSize: "12px",
                              fontWeight: 700,
                              background: form.bloodType === bt ? "linear-gradient(135deg, #b91c1c, #dc2626)" : "rgba(255,255,255,0.06)",
                              color: form.bloodType === bt ? "white" : "rgba(255,255,255,0.5)",
                              border: form.bloodType === bt ? "none" : "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {bt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="City" value={form.city} onChange={(v: string) => updateForm("city", v)} placeholder="e.g. Mumbai" icon={<MapPin size={15} />} />
                    <div className="flex flex-col gap-1.5">
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)", letterSpacing: "0.03em" }}>State</label>
                      <select
                        value={form.state}
                        onChange={(e) => updateForm("state", e.target.value)}
                        className="w-full rounded-xl outline-none text-white"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          padding: "12px",
                          fontSize: "14px",
                        }}
                      >
                        <option value="" style={{ background: "#0f172a" }}>Select State</option>
                        {STATES.map((s) => <option key={s} value={s} style={{ background: "#0f172a" }}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  disabled={!form.fullName || !form.aadhaar || !form.bloodType}
                  className="w-full mt-6 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-98 disabled:opacity-40"
                  style={{ background: persona.gradient, fontSize: "15px" }}
                >
                  Continue <ArrowRight className="inline ml-1" size={16} />
                </button>
              </motion.div>
            )}

            {/* STEP 1: OTP Verification */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}>
                    <Phone size={28} color="white" />
                  </div>
                  <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "4px" }}>Aadhaar OTP Verification</h2>
                  <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.7)", maxWidth: "300px", margin: "0 auto" }}>
                    We'll send a 6-digit OTP to your Aadhaar-linked mobile number
                  </p>
                </div>

                <InputField label="Mobile Number (Aadhaar-linked)" value={form.mobile} onChange={(v: string) => updateForm("mobile", v)} placeholder="+91 XXXXX XXXXX" type="tel" icon={<Phone size={15} />} />

                {!otpSent ? (
                  <button
                    onClick={handleSendOTP}
                    disabled={form.mobile.length < 10}
                    className="w-full mt-4 py-3.5 rounded-xl text-white font-semibold transition-all disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", fontSize: "15px" }}
                  >
                    Send OTP via Aadhaar
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                    <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                      <CheckCircle size={14} className="text-green-400" />
                      <p style={{ fontSize: "12px", color: "#6ee7b7" }}>OTP sent to ••••• {form.mobile.slice(-4)}</p>
                    </div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)" }} className="block mb-3">
                      Enter 6-Digit OTP
                    </label>
                    <div className="flex gap-2 justify-center mb-6">
                      {form.otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOTPChange(i, e.target.value)}
                          className="w-12 h-12 text-center rounded-xl text-white font-bold outline-none transition-all"
                          style={{
                            background: digit ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.06)",
                            border: digit ? "1px solid rgba(37,99,235,0.5)" : "1px solid rgba(255,255,255,0.1)",
                            fontSize: "20px",
                          }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleVerifyOTP}
                      disabled={form.otp.join("").length < 6}
                      className="w-full py-3.5 rounded-xl text-white font-semibold transition-all disabled:opacity-40"
                      style={{ background: "linear-gradient(135deg, #065f46, #059669)", fontSize: "15px" }}
                    >
                      <CheckCircle className="inline mr-2" size={16} /> Verify & Continue
                    </button>
                  </motion.div>
                )}
                <button onClick={() => setStep(0)} className="w-full mt-3 py-2.5 rounded-xl text-white/50 hover:text-white/80 transition-all" style={{ fontSize: "13px" }}>
                  ← Back
                </button>
              </motion.div>
            )}

            {/* STEP 2: Medical Details */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "4px" }}>Medical Details</h2>
                <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.7)", marginBottom: "24px" }}>
                  {isBloodType ? "Your blood donation preferences" : "Select organs you wish to donate/require"}
                </p>

                {!isBloodType && (
                  <div className="mb-6">
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)", marginBottom: "10px", display: "block" }}>
                      {isReceiver ? "Organ Required" : "Organs to Donate"} (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {ORGANS.map((organ) => (
                        <button
                          key={organ}
                          onClick={() => toggleOrgan(organ)}
                          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all text-left"
                          style={{
                            background: form.organs.includes(organ) ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                            border: form.organs.includes(organ) ? "1px solid rgba(37,99,235,0.5)" : "1px solid rgba(255,255,255,0.08)",
                            fontSize: "13px",
                            color: form.organs.includes(organ) ? "white" : "rgba(255,255,255,0.6)",
                          }}
                        >
                          {form.organs.includes(organ) ? <CheckCircle size={14} className="text-blue-400 flex-shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0" />}
                          {organ}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isReceiver && (
                  <div className="mb-6">
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.9)", marginBottom: "10px", display: "block" }}>
                      Medical Urgency Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "critical", label: "Critical", sub: "< 24 hrs", color: "#dc2626" },
                        { id: "high", label: "High", sub: "1–7 days", color: "#d97706" },
                        { id: "moderate", label: "Moderate", sub: "1–4 weeks", color: "#059669" },
                      ].map((u) => (
                        <button
                          key={u.id}
                          onClick={() => updateForm("urgency", u.id)}
                          className="flex flex-col items-center py-3 px-2 rounded-xl transition-all"
                          style={{
                            background: form.urgency === u.id ? `${u.color}22` : "rgba(255,255,255,0.04)",
                            border: form.urgency === u.id ? `1px solid ${u.color}66` : "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <span style={{ fontSize: "13px", fontWeight: 700, color: form.urgency === u.id ? "white" : "rgba(255,255,255,0.5)" }}>{u.label}</span>
                          <span style={{ fontSize: "10px", color: form.urgency === u.id ? u.color : "rgba(148,163,184,0.4)" }}>{u.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isReceiver && (
                  <InputField label="Referring Hospital" value={form.hospital} onChange={(v: string) => updateForm("hospital", v)} placeholder="e.g. AIIMS New Delhi" icon={<MapPin size={15} />} />
                )}

                <button
                  onClick={() => setStep(3)}
                  className="w-full mt-6 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                  style={{ background: persona.gradient, fontSize: "15px" }}
                >
                  Continue <ArrowRight className="inline ml-1" size={16} />
                </button>
                <button onClick={() => setStep(1)} className="w-full mt-3 py-2.5 rounded-xl text-white/50 hover:text-white/80 transition-all" style={{ fontSize: "13px" }}>← Back</button>
              </motion.div>
            )}

            {/* STEP 3: Documents */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "4px" }}>Upload Documents</h2>
                <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.7)", marginBottom: "24px" }}>
                  Documents are encrypted with AES-256 and never shared without consent
                </p>

                <div className="flex flex-col gap-4">
                  {/* Doctor's Opinion */}
                  <div
                    onClick={() => updateForm("docUploaded", true)}
                    className="rounded-2xl p-5 cursor-pointer transition-all hover:border-blue-500/50"
                    style={{
                      background: form.docUploaded ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.04)",
                      border: form.docUploaded ? "2px dashed rgba(16,185,129,0.4)" : "2px dashed rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: form.docUploaded ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)" }}>
                        {form.docUploaded ? <CheckCircle size={22} className="text-green-400" /> : <Upload size={22} className="text-white/40" />}
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: form.docUploaded ? "#6ee7b7" : "white" }}>
                          {form.docUploaded ? "Doctor's Opinion — Uploaded ✓" : "Upload Doctor's Opinion"}
                        </p>
                        <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)" }}>
                          PDF or JPG · Max 5MB · On hospital letterhead
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Medical Certificate */}
                  <div
                    onClick={() => updateForm("certUploaded", true)}
                    className="rounded-2xl p-5 cursor-pointer transition-all"
                    style={{
                      background: form.certUploaded ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.04)",
                      border: form.certUploaded ? "2px dashed rgba(16,185,129,0.4)" : "2px dashed rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: form.certUploaded ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)" }}>
                        {form.certUploaded ? <CheckCircle size={22} className="text-green-400" /> : <Upload size={22} className="text-white/40" />}
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: form.certUploaded ? "#6ee7b7" : "white" }}>
                          {form.certUploaded ? "Medical Certificate — Uploaded ✓" : "Upload Medical Certificate"}
                        </p>
                        <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)" }}>
                          Eligibility certificate from registered hospital
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Seva AI tip */}
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}>
                    <Sparkles size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <p style={{ fontSize: "12px", color: "rgba(147,197,253,0.9)", lineHeight: 1.5 }}>
                      <strong>Seva AI tip:</strong> Ask Seva AI to help you understand what documents are needed and where to get them from your local government hospital.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)" }}>
                    <AlertCircle size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p style={{ fontSize: "12px", color: "rgba(253,230,138,0.9)", lineHeight: 1.5 }}>
                      Document upload is simulated in this demo. In production, uploads are processed through a HIPAA-compliant secure vault.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setStep(4)}
                  className="w-full mt-6 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                  style={{ background: persona.gradient, fontSize: "15px" }}
                >
                  Submit Registration <ArrowRight className="inline ml-1" size={16} />
                </button>
                <button onClick={() => setStep(2)} className="w-full mt-3 py-2.5 rounded-xl text-white/50 hover:text-white/80 transition-all" style={{ fontSize: "13px" }}>← Back</button>
              </motion.div>
            )}

            {/* STEP 4: Success */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "linear-gradient(135deg, #065f46, #059669)", boxShadow: "0 0 40px rgba(5,150,105,0.4)" }}
                >
                  <CheckCircle size={36} color="white" />
                </motion.div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "white", marginBottom: "8px" }}>
                  Registration Successful!
                </h2>
                <p style={{ fontSize: "15px", color: "#6ee7b7", marginBottom: "24px" }}>
                  Your {persona.title} profile is now active on JivanSetu
                </p>
                <div
                  className="rounded-2xl p-5 mb-6 text-left"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", marginBottom: "8px", letterSpacing: "0.06em" }}>REGISTRATION SUMMARY</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between"><span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Name</span><span style={{ fontSize: "13px", color: "white", fontWeight: 600 }}>{form.fullName || "Rajesh Kumar"}</span></div>
                    <div className="flex justify-between"><span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Blood Group</span><span style={{ fontSize: "13px", color: "white", fontWeight: 600 }}>{form.bloodType || "O+"}</span></div>
                    <div className="flex justify-between"><span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Type</span><span style={{ fontSize: "13px", color: "white", fontWeight: 600 }}>{persona.title}</span></div>
                    <div className="flex justify-between"><span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Status</span><span style={{ fontSize: "13px", color: "#6ee7b7", fontWeight: 600 }}>✓ Active</span></div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/donor-card"
                    className="w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: persona.gradient, fontSize: "15px" }}
                  >
                    View My Donor Card <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/"
                    className="w-full py-3 rounded-xl text-white/60 hover:text-white/80 transition-all"
                    style={{ fontSize: "13px" }}
                  >
                    ← Back to Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
