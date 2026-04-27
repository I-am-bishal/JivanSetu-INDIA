import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  User, Mail, Phone, MapPin, Droplets, Heart, Shield,
  Bell, Lock, Camera, CheckCircle, AlertTriangle, Save,
  ChevronRight, LogOut, Trash2, Eye, EyeOff, Edit3
} from "lucide-react";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const ORGANS = ["Heart", "Kidneys", "Liver", "Lungs", "Pancreas", "Corneas", "Skin", "Bones"];
const STATES = ["Andhra Pradesh","Assam","Bihar","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl p-6 mb-5"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(37,99,235,0.15)", color: "#60a5fa" }}>
          {icon}
        </div>
        <h2 style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize: "12px", fontWeight: 600, color: "rgba(148,163,184,0.8)", letterSpacing: "0.05em" }}>
        {label.toUpperCase()}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "white",
  fontSize: "14px",
  padding: "10px 14px",
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s",
};

export function ProfilePage() {
  const navigate = useNavigate();

  // Personal info
  const [name, setName] = useState("Bishal Paul");
  const [email, setEmail] = useState("bishal.paul@gmail.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [city, setCity] = useState("New Delhi");
  const [state, setState] = useState("Delhi");
  const [dob, setDob] = useState("1998-03-15");
  const [gender, setGender] = useState("Male");
  const [bio, setBio] = useState("Passionate blood & organ donor. Saving lives one donation at a time.");

  // Medical
  const [bloodType, setBloodType] = useState("O+");
  const [pledgedOrgans, setPledgedOrgans] = useState<string[]>(["Heart", "Kidneys", "Liver", "Corneas"]);
  const [medicalConditions, setMedicalConditions] = useState("None");
  const [lastDonation, setLastDonation] = useState("2026-03-10");

  // Notifications
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(true);
  const [notifUrgent, setNotifUrgent] = useState(true);
  const [notifNews, setNotifNews] = useState(false);

  // Security
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  // UI state
  const [saved, setSaved] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [avatarInitials, setAvatarInitials] = useState("BP");

  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const toggleOrgan = (organ: string) => {
    setPledgedOrgans(prev =>
      prev.includes(organ) ? prev.filter(o => o !== organ) : [...prev, organ]
    );
  };

  const handleSave = () => {
    setSaved(true);
    setAvatarInitials(initials);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("jivansetu_logged_in");
    navigate("/");
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
      style={{ background: value ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "rgba(255,255,255,0.1)" }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300"
        style={{ left: value ? "22px" : "2px" }}
      />
    </button>
  );

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)", letterSpacing: "0.08em", fontWeight: 600 }}>MY ACCOUNT</p>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 800, color: "white", marginTop: "4px" }}>Profile Settings</h1>
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.6)", marginTop: "4px" }}>Manage your personal information, preferences, and security.</p>
        </motion.div>

        {/* Avatar Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 mb-5 flex flex-col sm:flex-row items-center sm:items-start gap-5"
          style={{ background: "linear-gradient(135deg, rgba(30,64,175,0.15), rgba(37,99,235,0.06))", border: "1px solid rgba(37,99,235,0.2)" }}
        >
          <div className="relative group">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center font-black text-3xl text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 8px 30px rgba(37,99,235,0.35)" }}
            >
              {avatarInitials || initials}
            </div>
            <button
              onClick={() => setEditingAvatar(!editingAvatar)}
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}
            >
              <Camera size={14} color="white" />
            </button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "white" }}>{name}</h2>
            <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.7)", marginTop: "2px" }}>{email}</p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(16,185,129,0.15)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.25)" }}>
                ● Active Donor
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(220,38,38,0.12)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.2)" }}>
                {bloodType}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(37,99,235,0.12)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.2)" }}>
                JS-2026-DL-048291
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: "rgba(37,99,235,0.15)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.25)" }}
          >
            Dashboard <ChevronRight size={14} />
          </button>
        </motion.div>

        {/* Personal Info */}
        <Section title="Personal Information" icon={<User size={16} />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name">
              <input value={name} onChange={e => setName(e.target.value)} style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </Field>
            <Field label="Date of Birth">
              <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={{ ...inputStyle, colorScheme: "dark" }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </Field>
            <Field label="Email Address">
              <div className="relative">
                <Mail size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(148,163,184,0.5)" }} />
                <input value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, paddingLeft: "34px" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            </Field>
            <Field label="Phone Number">
              <div className="relative">
                <Phone size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(148,163,184,0.5)" }} />
                <input value={phone} onChange={e => setPhone(e.target.value)} style={{ ...inputStyle, paddingLeft: "34px" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            </Field>
            <Field label="Gender">
              <select value={gender} onChange={e => setGender(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                {["Male", "Female", "Non-binary", "Prefer not to say"].map(g => (
                  <option key={g} value={g} style={{ background: "#0f172a" }}>{g}</option>
                ))}
              </select>
            </Field>
            <Field label="City">
              <div className="relative">
                <MapPin size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(148,163,184,0.5)" }} />
                <input value={city} onChange={e => setCity(e.target.value)} style={{ ...inputStyle, paddingLeft: "34px" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            </Field>
            <Field label="State">
              <select value={state} onChange={e => setState(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                {STATES.map(s => (
                  <option key={s} value={s} style={{ background: "#0f172a" }}>{s}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Short Bio">
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </Field>
          </div>
        </Section>

        {/* Medical Info */}
        <Section title="Medical Information" icon={<Droplets size={16} />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <Field label="Blood Type">
              <div className="flex flex-wrap gap-2">
                {BLOOD_TYPES.map(bt => (
                  <button
                    key={bt}
                    onClick={() => setBloodType(bt)}
                    className="px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={{
                      background: bloodType === bt ? "linear-gradient(135deg, #b91c1c, #dc2626)" : "rgba(255,255,255,0.05)",
                      color: bloodType === bt ? "white" : "rgba(255,255,255,0.5)",
                      border: bloodType === bt ? "1px solid rgba(220,38,38,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {bt}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Last Donation Date">
              <input type="date" value={lastDonation} onChange={e => setLastDonation(e.target.value)}
                style={{ ...inputStyle, colorScheme: "dark" }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </Field>
          </div>
          <Field label="Pledged Organs">
            <div className="flex flex-wrap gap-2 mt-1">
              {ORGANS.map(organ => (
                <button
                  key={organ}
                  onClick={() => toggleOrgan(organ)}
                  className="px-3 py-1.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{
                    background: pledgedOrgans.includes(organ) ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)",
                    color: pledgedOrgans.includes(organ) ? "#93c5fd" : "rgba(255,255,255,0.4)",
                    border: pledgedOrgans.includes(organ) ? "1px solid rgba(37,99,235,0.35)" : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {pledgedOrgans.includes(organ) && <CheckCircle size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />}
                  {organ}
                </button>
              ))}
            </div>
          </Field>
          <div className="mt-4">
            <Field label="Medical Conditions / Allergies">
              <input value={medicalConditions} onChange={e => setMedicalConditions(e.target.value)}
                placeholder="e.g. None, Diabetes, Hypertension..."
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </Field>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notification Preferences" icon={<Bell size={16} />}>
          <div className="flex flex-col gap-4">
            {[
              { label: "Email Notifications", desc: "Receive donation reminders and updates via email", value: notifEmail, onChange: setNotifEmail },
              { label: "SMS Alerts", desc: "Get urgent blood/organ requests via SMS", value: notifSMS, onChange: setNotifSMS },
              { label: "Urgent Request Alerts", desc: "Immediate alerts for life-critical blood or organ needs", value: notifUrgent, onChange: setNotifUrgent },
              { label: "Newsletter & News", desc: "Monthly updates, stories, and platform news", value: notifNews, onChange: setNotifNews },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between gap-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>{item.label}</p>
                  <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)", marginTop: "2px" }}>{item.desc}</p>
                </div>
                <Toggle value={item.value} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </Section>

        {/* Security */}
        <Section title="Security" icon={<Lock size={16} />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Current Password">
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPass}
                  onChange={e => setOldPass(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: "40px" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(148,163,184,0.5)" }}>
                  {showOld ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>
            <Field label="New Password">
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  placeholder="Min. 8 characters"
                  style={{ ...inputStyle, paddingRight: "40px" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(148,163,184,0.5)" }}>
                  {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>
          </div>
          <button
            className="mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            style={{ background: "rgba(37,99,235,0.15)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.25)" }}
          >
            Update Password
          </button>
        </Section>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 mb-6"
          style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.2)" }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(220,38,38,0.15)", color: "#f87171" }}>
              <AlertTriangle size={16} />
            </div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>Danger Zone</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              style={{ background: "rgba(220,38,38,0.12)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.25)" }}
            >
              <LogOut size={15} /> Log Out of All Devices
            </button>
            <button
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              style={{ background: "rgba(220,38,38,0.05)", color: "#f87171", border: "1px solid rgba(220,38,38,0.15)" }}
            >
              <Trash2 size={15} /> Delete Account
            </button>
          </div>
        </motion.div>

        {/* Save Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-4 flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl"
          style={{
            background: "rgba(15,23,42,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}
        >
          <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.7)" }}>
            {saved
              ? <span style={{ color: "#6ee7b7", display: "flex", alignItems: "center", gap: "6px" }}><CheckCircle size={14} /> Changes saved successfully!</span>
              : "Unsaved changes will be lost on navigation."}
          </p>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 15px rgba(37,99,235,0.35)" }}
          >
            <Save size={15} /> Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
}
