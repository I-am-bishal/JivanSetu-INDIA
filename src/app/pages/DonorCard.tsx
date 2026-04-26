import { motion } from "motion/react";
import { Heart, Shield, CheckCircle, MapPin, Droplets, Calendar, Share2, Download, QrCode } from "lucide-react";
import { Link } from "react-router";

const MOCK_DONOR = {
  name: "Bishal Paul",
  nameHi: "बिशाल पॉल",
  id: "JS-2026-DL-048291",
  bloodType: "O+",
  organs: ["Heart", "Kidneys", "Liver", "Corneas"],
  city: "New Delhi",
  state: "Delhi",
  registeredOn: "April 17, 2026",
  expiresOn: "April 16, 2031",
  status: "active",
  aadhaarLinked: true,
  nottoId: "NOTTO-DL-2026-48291",
};

export function DonorCard() {
  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "#060d1f" }}>
      <div className="max-w-md mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)", letterSpacing: "0.08em" }}>MY DIGITAL DONOR CARD</p>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "white", marginTop: "4px" }}>JivanSetu Donor Card</h1>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl overflow-hidden mb-4"
          style={{ boxShadow: "0 25px 80px rgba(37,99,235,0.25), 0 0 0 1px rgba(37,99,235,0.2)" }}
        >
          {/* Card Header */}
          <div
            className="p-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1e40af 100%)" }}
          >
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }} />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #dc2626, transparent)" }} />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <Heart size={16} fill="white" color="white" />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>JivanSetu</p>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>जीवनसेतु</p>
                  </div>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span style={{ fontSize: "10px", color: "#6ee7b7", fontWeight: 700 }}>ACTIVE</span>
                </div>
              </div>

              {/* Blood Type Badge */}
              <div className="flex items-end justify-between">
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>REGISTERED DONOR</p>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: "white", lineHeight: 1.1 }}>{MOCK_DONOR.name}</p>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontFamily: "'Noto Sans Devanagari', sans-serif", marginTop: "2px" }}>{MOCK_DONOR.nameHi}</p>
                </div>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #7f1d1d, #dc2626)",
                    boxShadow: "0 8px 20px rgba(220,38,38,0.4)",
                  }}
                >
                  <div className="text-center">
                    <Droplets size={14} color="white" className="mx-auto mb-0.5" />
                    <p style={{ fontSize: "18px", fontWeight: 900, color: "white", lineHeight: 1 }}>{MOCK_DONOR.bloodType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6" style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Organ Badges */}
            <div className="mb-5">
              <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", marginBottom: "8px", letterSpacing: "0.06em" }}>
                ORGANS PLEDGED
              </p>
              <div className="flex flex-wrap gap-2">
                {MOCK_DONOR.organs.map((organ) => (
                  <div key={organ} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}>
                    <CheckCircle size={11} className="text-blue-400" />
                    <span style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600 }}>{organ}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: "Donor ID", value: MOCK_DONOR.id, icon: <Shield size={12} /> },
                { label: "NOTTO ID", value: MOCK_DONOR.nottoId, icon: <Shield size={12} /> },
                { label: "Registered", value: MOCK_DONOR.registeredOn, icon: <Calendar size={12} /> },
                { label: "Location", value: `${MOCK_DONOR.city}, ${MOCK_DONOR.state}`, icon: <MapPin size={12} /> },
              ].map((detail) => (
                <div key={detail.label} className="rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-white/30">{detail.icon}</span>
                    <p style={{ fontSize: "10px", color: "rgba(148,163,184,0.5)", letterSpacing: "0.04em" }}>{detail.label}</p>
                  </div>
                  <p style={{ fontSize: "12px", color: "white", fontWeight: 600 }}>{detail.value}</p>
                </div>
              ))}
            </div>

            {/* Aadhaar Linked Badge */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-5"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <CheckCircle size={14} className="text-green-400" />
              <div>
                <p style={{ fontSize: "12px", color: "#6ee7b7", fontWeight: 600 }}>Aadhaar Verified · PDPA 2023 Protected</p>
                <p style={{ fontSize: "11px", color: "rgba(110,231,183,0.6)" }}>Identity authenticated · Data encrypted AES-256</p>
              </div>
            </div>

            {/* QR Placeholder */}
            <div className="flex items-center gap-4 px-4 py-4 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.06)" }}>
                <QrCode size={28} className="text-white/40" />
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>QR Code Verification</p>
                <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", lineHeight: 1.4 }}>Hospitals can scan to instantly verify your donor status and organ pledges</p>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-6 py-4" style={{ background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex items-center justify-between">
              <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>
                Valid until {MOCK_DONOR.expiresOn}
              </p>
              <div className="flex items-center gap-1.5">
                <Shield size={11} className="text-blue-400" />
                <span style={{ fontSize: "11px", color: "#93c5fd" }}>NOTTO Affiliated</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-white font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", fontSize: "14px" }}
          >
            <Download size={15} />
            Download PDF
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-all hover:bg-white/8"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: "14px",
              color: "white",
            }}
          >
            <Share2 size={15} />
            Share Card
          </button>
        </div>

        {/* Important Note */}
        <div className="rounded-2xl p-4"
          style={{ background: "rgba(234,179,8,0.08)", border: "1px solid rgba(234,179,8,0.2)" }}>
          <p style={{ fontSize: "12px", color: "rgba(253,230,138,0.9)", lineHeight: 1.6 }}>
            <strong>🔒 Important:</strong> This card serves as your intention to donate. In the event of brain death, your family must also provide consent. Please inform your family of your decision. The final transplant decision is made by NOTTO-certified physicians.
          </p>
        </div>

        <Link to="/" className="block text-center mt-4 py-3 text-white/50 hover:text-white/80 transition-all" style={{ fontSize: "13px" }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
