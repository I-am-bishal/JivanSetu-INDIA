import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Upload, FileText, ScanLine, CheckCircle, AlertCircle,
  Droplets, Heart, Building2, User, Stethoscope, ArrowRight, X, Sparkles
} from "lucide-react";

type ScanResult = {
  patientName: string;
  bloodGroup: string;
  organType: string;
  hospitalName: string;
  doctorName: string;
  diagnosis: string;
  date: string;
  urgency: string;
};

const DEMO_RESULTS: Record<string, ScanResult> = {
  prescription: {
    patientName: "Meera Pillai",
    bloodGroup: "O+",
    organType: "N/A",
    hospitalName: "KEM Hospital, Mumbai",
    doctorName: "Dr. Rajan Mehta",
    diagnosis: "Acute Anemia — Post-surgical blood loss",
    date: "17 April 2026",
    urgency: "High",
  },
  form18: {
    patientName: "Krishnan Venugopal",
    bloodGroup: "AB−",
    organType: "Kidney (Left)",
    hospitalName: "SCTIMST Trivandrum",
    doctorName: "Dr. Ajay Thampy",
    diagnosis: "End-stage renal disease (ESRD), Stage 5 CKD",
    date: "15 April 2026",
    urgency: "Critical",
  },
};

export function ReportScanner() {
  const [docType, setDocType] = useState<"prescription" | "form18">("prescription");
  const [fileName, setFileName] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleScan = useCallback(() => {
    setScanning(true);
    setProgress(0);
    setResult(null);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setScanning(false);
          setResult(DEMO_RESULTS[docType]);
          return 100;
        }
        return p + 2;
      });
    }, 30);
  }, [docType]);

  const handleFile = (name: string) => {
    setFileName(name);
    setResult(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0].name);
    }
  }, []);

  const reset = () => {
    setFileName(null);
    setResult(null);
    setProgress(0);
    setScanning(false);
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#060d1f" }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ScanLine size={14} className="text-purple-400" />
            <span style={{ fontSize: "12px", color: "#c084fc", fontWeight: 700, letterSpacing: "0.1em" }}>AI REPORT SCANNER</span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "white", marginBottom: "8px" }}>
            Scan Medical Reports
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)", maxWidth: "480px", margin: "0 auto" }}>
            Upload your prescription or Form 18 (organ transplant form) and our AI will extract key medical data automatically
          </p>
        </motion.div>

        {/* Document Type Selector */}
        <div className="flex gap-3 mb-6">
          {([
            { val: "prescription" as const, label: "Prescription", sub: "Blood / General", icon: <FileText size={16} /> },
            { val: "form18" as const, label: "Form 18", sub: "Organ Transplant", icon: <Heart size={16} /> },
          ]).map((opt) => (
            <button key={opt.val} onClick={() => { setDocType(opt.val); reset(); }}
              className="flex-1 flex items-center gap-3 p-4 rounded-2xl transition-all"
              style={{
                background: docType === opt.val ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.04)",
                border: docType === opt.val ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.08)",
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: docType === opt.val ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.06)", color: docType === opt.val ? "#c084fc" : "rgba(255,255,255,0.3)" }}>
                {opt.icon}
              </div>
              <div className="text-left">
                <p style={{ fontSize: "14px", fontWeight: 600, color: docType === opt.val ? "white" : "rgba(255,255,255,0.6)" }}>{opt.label}</p>
                <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>{opt.sub}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => {
            if (!fileName) handleFile(docType === "prescription" ? "prescription_meera.pdf" : "form18_krishnan.pdf");
          }}
          className="rounded-3xl p-8 mb-6 text-center cursor-pointer transition-all"
          style={{
            background: dragActive ? "rgba(139,92,246,0.08)" : fileName ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.03)",
            border: dragActive ? "2px dashed rgba(139,92,246,0.5)" : fileName ? "2px dashed rgba(16,185,129,0.3)" : "2px dashed rgba(255,255,255,0.12)",
          }}
        >
          {!fileName ? (
            <>
              <Upload size={36} className="mx-auto mb-4" style={{ color: dragActive ? "#c084fc" : "rgba(255,255,255,0.2)" }} />
              <p style={{ fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>
                {dragActive ? "Drop file here" : "Click or drag a file to upload"}
              </p>
              <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.5)" }}>
                Supports PDF, JPG, PNG · Max 10MB
              </p>
              <p style={{ fontSize: "11px", color: "rgba(139,92,246,0.6)", marginTop: "12px" }}>
                💡 Click to use demo file for testing
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <CheckCircle size={20} className="text-green-400" />
              <div className="text-left">
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#6ee7b7" }}>{fileName}</p>
                <p style={{ fontSize: "11px", color: "rgba(110,231,183,0.6)" }}>Ready to scan</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); reset(); }} className="text-white/30 hover:text-white/60 ml-2"><X size={16} /></button>
            </div>
          )}
        </div>

        {/* Scan Button */}
        {fileName && !result && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleScan}
            disabled={scanning}
            className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2.5 transition-all hover:opacity-90 disabled:opacity-60 mb-6"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", fontSize: "15px", boxShadow: "0 8px 30px rgba(139,92,246,0.3)" }}
          >
            <Sparkles size={18} />
            {scanning ? "Scanning with AI..." : "Scan Document with AI"}
          </motion.button>
        )}

        {/* Progress Bar */}
        {scanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <div className="rounded-2xl p-5" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ScanLine size={14} className="text-purple-400 animate-pulse" />
                  <span style={{ fontSize: "13px", color: "#c084fc", fontWeight: 600 }}>AI Processing...</span>
                </div>
                <span style={{ fontSize: "13px", color: "white", fontWeight: 700 }}>{progress}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #7c3aed, #a855f7)" }} />
              </div>
              <div className="flex flex-col gap-1.5 mt-3">
                {[
                  { label: "OCR Text Extraction", done: progress > 25 },
                  { label: "Medical Entity Recognition", done: progress > 50 },
                  { label: "Data Validation & Structuring", done: progress > 75 },
                  { label: "Cross-referencing NOTTO Registry", done: progress > 90 },
                ].map((step) => (
                  <div key={step.label} className="flex items-center gap-2">
                    {step.done ? <CheckCircle size={12} className="text-green-400" /> : <div className="w-3 h-3 rounded-full border border-white/20" />}
                    <span style={{ fontSize: "11px", color: step.done ? "#6ee7b7" : "rgba(148,163,184,0.4)" }}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-3xl overflow-hidden mb-6" style={{ border: "1px solid rgba(16,185,129,0.3)" }}>
              <div className="px-5 py-3 flex items-center gap-2" style={{ background: "rgba(16,185,129,0.1)", borderBottom: "1px solid rgba(16,185,129,0.15)" }}>
                <CheckCircle size={14} className="text-green-400" />
                <span style={{ fontSize: "13px", color: "#6ee7b7", fontWeight: 600 }}>AI Extraction Complete</span>
              </div>

              <div className="p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Patient Name", value: result.patientName, icon: <User size={14} /> },
                    { label: "Blood Group", value: result.bloodGroup, icon: <Droplets size={14} /> },
                    { label: "Organ Type", value: result.organType, icon: <Heart size={14} /> },
                    { label: "Hospital", value: result.hospitalName, icon: <Building2 size={14} /> },
                    { label: "Doctor", value: result.doctorName, icon: <Stethoscope size={14} /> },
                    { label: "Date", value: result.date, icon: <FileText size={14} /> },
                  ].map((field) => (
                    <div key={field.label} className="rounded-xl p-3"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-white/30">{field.icon}</span>
                        <p style={{ fontSize: "10px", color: "rgba(148,163,184,0.5)", letterSpacing: "0.04em" }}>{field.label}</p>
                      </div>
                      <p style={{ fontSize: "14px", color: "white", fontWeight: 600 }}>{field.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: "10px", color: "rgba(148,163,184,0.5)", marginBottom: "4px" }}>DIAGNOSIS</p>
                  <p style={{ fontSize: "14px", color: "white", fontWeight: 600 }}>{result.diagnosis}</p>
                </div>

                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    background: result.urgency === "Critical" ? "rgba(220,38,38,0.1)" : "rgba(217,119,6,0.1)",
                    border: result.urgency === "Critical" ? "1px solid rgba(220,38,38,0.25)" : "1px solid rgba(217,119,6,0.25)",
                  }}>
                  <AlertCircle size={14} style={{ color: result.urgency === "Critical" ? "#fca5a5" : "#fde68a" }} />
                  <span style={{ fontSize: "12px", fontWeight: 700, color: result.urgency === "Critical" ? "#fca5a5" : "#fde68a" }}>
                    Urgency: {result.urgency}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link to={`/register?type=${result.organType !== "N/A" ? "organ-receiver" : "blood-receiver"}`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-semibold transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)", fontSize: "14px" }}>
                Auto-fill Registration <ArrowRight size={15} />
              </Link>
              <button onClick={reset}
                className="px-5 py-3.5 rounded-2xl font-semibold transition-all hover:bg-white/8"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "14px" }}>
                Scan Another
              </button>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 flex items-start gap-2 px-4 py-3 rounded-xl"
              style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.15)" }}>
              <AlertCircle size={13} className="text-yellow-400 flex-shrink-0 mt-0.5" />
              <p style={{ fontSize: "11px", color: "rgba(253,230,138,0.7)", lineHeight: 1.5 }}>
                <strong>Disclaimer:</strong> AI-extracted data is for pre-filling convenience only. Always verify extracted information with your physician. This is a simulated demo.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
