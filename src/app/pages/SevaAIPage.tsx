import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Sparkles, Send, MapPin, FileText, UserCheck, Heart, Droplets,
  Scale, BookOpen, Phone, RefreshCw, ArrowRight, CheckCircle
} from "lucide-react";
import { Link } from "react-router";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
  actionCards?: ActionCard[];
};

type ActionCard = {
  label: string;
  href: string;
  icon: React.ReactNode;
  color: string;
};

const RAG_KNOWLEDGE_BASE: Record<string, { text: string; actions?: ActionCard[] }> = {
  register_organ: {
    text: `**How to Register as an Organ Donor on JivanSetu:**\n\nRegistering takes only 5 minutes. Here's what you need:\n\n✅ Valid Aadhaar Card\n✅ Aadhaar-linked mobile number (for OTP)\n✅ Recent passport-sized photo\n\n**Step-by-step:**\n1. Click "Donate an Organ" on the home page\n2. Fill in personal details\n3. Verify with Aadhaar OTP\n4. Select organs you wish to donate\n5. Upload documents (optional for donors)\n6. Receive your Digital Donor Card\n\n**Important:** Your consent is 100% voluntary and can be revoked at any time by contacting us.`,
    actions: [{ label: "Register as Organ Donor", href: "/register?type=organ-donor", icon: <Heart size={14} />, color: "#dc2626" }],
  },
  register_blood: {
    text: `**How to Register as a Blood Donor:**\n\nYou can donate blood every 3 months (whole blood) or every 2 weeks (platelets). Requirements:\n\n✅ Age: 18–65 years\n✅ Weight: ≥45 kg\n✅ Hemoglobin: ≥12.5 g/dL (women), ≥13 g/dL (men)\n✅ No major illness in last 6 months\n✅ No tattoo in last 6 months\n\n**The 4 donations you can make:**\n• Whole Blood (most common)\n• Platelets (for cancer patients)\n• Plasma (for burn/trauma victims)\n• Red Blood Cells (for anemia)\n\nJivanSetu will match you with the nearest blood bank or hospital in your city.`,
    actions: [{ label: "Register as Blood Donor", href: "/register?type=blood-donor", icon: <Droplets size={14} />, color: "#ea580c" }],
  },
  legal: {
    text: `**Organ Donation Law in India:**\n\n📋 **The Transplantation of Human Organs and Tissues Act (THOTA), 1994** (amended 2011) governs all organ donations.\n\n**Key Legal Points:**\n• ✅ Organ donation is LEGAL and encouraged\n• ❌ Organ trading/selling is ILLEGAL and punishable with 3–5 years imprisonment\n• ✅ Both living and cadaveric (brain-death) donation is legal\n• ✅ Any Indian citizen can register as a donor\n• ✅ Family consent is required for cadaveric donation\n\n**Brain Death Certification:**\nRequired by 4 doctors including a neurologist, as per THOTA protocols.\n\n**JivanSetu's Compliance:**\nWe are a matching platform affiliated with NOTTO. We do NOT facilitate organ trade under any circumstances.\n\nOfficial resource: notto.mohfw.gov.in`,
    actions: [],
  },
  blood_banks: {
    text: `**Finding Blood Banks Near You:**\n\nI can help you locate the nearest verified blood bank. Here are some top resources:\n\n🏥 **National Blood Bank Directory:**\neraktkosh.in (Government of India portal)\n\n📞 **Emergency Blood Lines:**\n• AIIMS Delhi: +91-11-26588500\n• PGI Chandigarh: +91-172-2755555\n• KEM Mumbai: +91-22-24107000\n• Apollo Chennai: +91-44-28290200\n• Narayana Bangalore: +91-80-71222222\n• JIPMER Puducherry: +91-413-2272380\n\n🚨 **National Ambulance:** 108\n🆘 **NOTTO Helpline:** 1800-11-NOTTO (Toll-free)\n\nTo find blood donors in your specific area, share your location or city in the SOS Dashboard.`,
    actions: [{ label: "View SOS Dashboard", href: "/urgency", icon: <MapPin size={14} />, color: "#dc2626" }],
  },
  documents: {
    text: `**Documents Required for Registration:**\n\n**For Organ DONORS (Living):**\n• ✅ Aadhaar Card (mandatory)\n• ✅ Passport / Voter ID (alternate ID)\n• ✅ Donor's recent photo\n• 📄 Doctor's medical fitness certificate (recommended)\n\n**For Organ RECEIVERS:**\n• ✅ Aadhaar Card\n• ✅ Doctor's Opinion Letter (on hospital letterhead)\n• ✅ Medical Eligibility Certificate\n• ✅ Referring hospital NOTTO registration number\n• 📊 Recent lab reports (kidney/liver/cardiac function tests)\n\n**For Blood DONORS:**\n• ✅ Aadhaar Card\n• No other documents required!\n\n**For Blood RECEIVERS (Emergency):**\n• ✅ Any photo ID\n• ✅ Prescription from treating doctor\n\nAll documents are encrypted with AES-256 and stored per PDPA 2023 guidelines.`,
    actions: [
      { label: "Start Registration", href: "/register", icon: <UserCheck size={14} />, color: "#2563eb" },
    ],
  },
  emotional: {
    text: `I understand this is a deeply emotional journey — whether you're a donor, a family member, or someone awaiting an organ.\n\n💙 **To donors and their families:**\nYour gift of life is the most profound act of human kindness. One donor can give life to 8 people and restore sight to 2 more. Your loved one's legacy lives on through those they save.\n\n🌺 **To those awaiting transplants:**\nThe wait is incredibly hard, and your courage is extraordinary. JivanSetu works tirelessly, along with NOTTO, to find you a match as quickly as medically possible.\n\n🩸 **For blood donors:**\nEvery 2 seconds, someone in India needs blood. Your single donation saves 3 lives. You are a hero in the truest sense.\n\n---\n\nIf you need someone to talk to, the **iCall helpline (9152987821)** provides free mental health support in multiple languages.\n\nI'm here for you. What would you like to know more about?`,
    actions: [],
  },
  default: {
    text: `I'm **Seva**, your compassionate AI guide on JivanSetu — India's organ and blood donation matching platform.\n\n**I can help you with:**\n\n🩺 **Registration** — How to sign up as a donor or receiver\n🩸 **Blood Donation** — Finding banks, eligibility, process\n⚖️ **Legal Info** — THOTA, NOTTO, your rights\n📋 **Documents** — What you need and how to get them\n💙 **Emotional Support** — Guidance during difficult times\n🏥 **Emergency Help** — Connecting to hospitals and hotlines\n\nI'm powered by a Retrieval-Augmented Generation (RAG) system trained on official NOTTO guidelines, THOTA legislation, and verified medical information.\n\nWhat can I help you with today?`,
    actions: [],
  },
};

function getResponse(input: string): { text: string; actions?: ActionCard[] } {
  const lower = input.toLowerCase();
  if (lower.includes("organ") && (lower.includes("register") || lower.includes("sign") || lower.includes("how"))) return RAG_KNOWLEDGE_BASE.register_organ;
  if (lower.includes("blood") && (lower.includes("register") || lower.includes("donate") || lower.includes("how"))) return RAG_KNOWLEDGE_BASE.register_blood;
  if (lower.includes("legal") || lower.includes("law") || lower.includes("thota") || lower.includes("illegal") || lower.includes("legal")) return RAG_KNOWLEDGE_BASE.legal;
  if (lower.includes("blood bank") || lower.includes("find") || lower.includes("nearest") || lower.includes("emergency") || lower.includes("where")) return RAG_KNOWLEDGE_BASE.blood_banks;
  if (lower.includes("document") || lower.includes("aadhaar") || lower.includes("certificate") || lower.includes("papers")) return RAG_KNOWLEDGE_BASE.documents;
  if (lower.includes("feel") || lower.includes("sad") || lower.includes("scared") || lower.includes("worried") || lower.includes("support") || lower.includes("emotional") || lower.includes("fear")) return RAG_KNOWLEDGE_BASE.emotional;
  return RAG_KNOWLEDGE_BASE.default;
}

const QUICK_PROMPTS = [
  { icon: <UserCheck size={14} />, label: "How to register as organ donor?", category: "Registration" },
  { icon: <Droplets size={14} />, label: "Blood donation eligibility", category: "Blood" },
  { icon: <Scale size={14} />, label: "Is organ donation legal in India?", category: "Legal" },
  { icon: <MapPin size={14} />, label: "Find nearest blood bank", category: "Emergency" },
  { icon: <FileText size={14} />, label: "Documents needed for registration", category: "Docs" },
  { icon: <Heart size={14} />, label: "I need emotional support", category: "Support" },
];

export function SevaAIPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "assistant",
      text: RAG_KNOWLEDGE_BASE.default.text,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 800));
    const response = getResponse(text);
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString() + "r", role: "assistant", text: response.text, timestamp: new Date(), actionCards: response.actions },
    ]);
  };

  const clearChat = () => {
    setMessages([{ id: "greeting", role: "assistant", text: RAG_KNOWLEDGE_BASE.default.text, timestamp: new Date() }]);
  };

  return (
    <div className="min-h-screen" style={{ background: "#060d1f" }}>
      <div className="max-w-5xl mx-auto px-4 py-8 flex gap-6">

        {/* Left Sidebar — Info Panel */}
        <div className="hidden lg:flex flex-col gap-4 w-72 flex-shrink-0">
          {/* Seva Identity Card */}
          <div className="rounded-3xl p-5"
            style={{ background: "linear-gradient(135deg, rgba(30,64,175,0.3), rgba(37,99,235,0.15))", border: "1px solid rgba(37,99,235,0.25)" }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}>
              <Sparkles size={22} color="white" />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "4px" }}>Seva AI</h3>
            <p style={{ fontSize: "12px", color: "#93c5fd", marginBottom: "8px" }}>Powered by RAG Framework</p>
            <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.8)", lineHeight: 1.5 }}>
              Trained on NOTTO guidelines, THOTA legislation, and verified Indian medical protocols.
            </p>
            <div className="flex items-center gap-2 mt-3 px-2.5 py-1.5 rounded-lg"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span style={{ fontSize: "11px", color: "#6ee7b7" }}>Online · Available 24/7</span>
            </div>
          </div>

          {/* Quick Topic Cards */}
          <div className="rounded-3xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "10px" }}>
              QUICK TOPICS
            </p>
            <div className="flex flex-col gap-2">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => sendMessage(p.label)}
                  className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all hover:bg-white/8 group"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">{p.icon}</span>
                  <div>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.3 }}>{p.label}</span>
                  </div>
                  <ArrowRight size={12} className="ml-auto text-white/20 group-hover:text-white/50 flex-shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="rounded-3xl p-4"
            style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Phone size={14} className="text-red-400" />
              <p style={{ fontSize: "11px", color: "#fca5a5", fontWeight: 600, letterSpacing: "0.08em" }}>EMERGENCY HELPLINES</p>
            </div>
            {[
              { label: "NOTTO Helpline", number: "1800-11-NOTTO" },
              { label: "National Ambulance", number: "108" },
              { label: "Blood Emergency", number: "1910" },
            ].map((h) => (
              <div key={h.label} className="flex justify-between items-center mb-2">
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{h.label}</span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#fca5a5" }}>{h.number}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
          {/* Chat Header */}
          <div
            className="flex items-center justify-between px-5 py-4 rounded-t-3xl flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}>
                <Sparkles size={18} color="white" />
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>Seva AI</p>
                <p style={{ fontSize: "11px", color: isTyping ? "#60a5fa" : "#6ee7b7" }}>
                  {isTyping ? "Thinking..." : "● Active · RAG-powered Medical AI"}
                </p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/8 transition-all"
              style={{ fontSize: "12px", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <RefreshCw size={12} />
              New Chat
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderTop: "none",
              borderBottom: "none",
              scrollbarWidth: "none",
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1"
                    style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}>
                    <Sparkles size={13} color="white" />
                  </div>
                )}
                <div className="flex flex-col gap-2 max-w-[85%]">
                  <div
                    className={`rounded-2xl px-5 py-4 ${msg.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                    style={{
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #1e40af, #2563eb)"
                        : "rgba(255,255,255,0.06)",
                      border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.92)",
                        lineHeight: 1.7,
                        whiteSpace: "pre-line",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: msg.text
                          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:white;font-weight:700">$1</strong>')
                          .replace(/✅/g, '<span style="color:#6ee7b7">✅</span>')
                          .replace(/❌/g, '<span style="color:#fca5a5">❌</span>')
                      }}
                    />
                  </div>
                  {/* Action Cards */}
                  {msg.actionCards && msg.actionCards.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {msg.actionCards.map((card) => (
                        <Link
                          key={card.label}
                          to={card.href}
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-white font-semibold transition-all hover:opacity-90 hover:scale-105"
                          style={{ background: `linear-gradient(135deg, ${card.color}cc, ${card.color})`, fontSize: "12px" }}
                        >
                          {card.icon}
                          {card.label}
                          <ArrowRight size={12} />
                        </Link>
                      ))}
                    </div>
                  )}
                  <p style={{ fontSize: "10px", color: "rgba(148,163,184,0.4)", textAlign: msg.role === "user" ? "right" : "left" }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}>
                  <Sparkles size={13} color="white" />
                </div>
                <div className="rounded-2xl rounded-tl-sm px-5 py-4"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex gap-1.5 items-center h-5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-blue-400"
                        style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Mobile Quick Prompts */}
          <div
            className="lg:hidden flex gap-2 overflow-x-auto py-2 px-5 flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              scrollbarWidth: "none",
            }}
          >
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.label}
                onClick={() => sendMessage(p.label)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0 transition-all hover:opacity-80"
                style={{
                  background: "rgba(37,99,235,0.15)",
                  border: "1px solid rgba(37,99,235,0.3)",
                  fontSize: "12px",
                  color: "#93c5fd",
                  fontWeight: 500,
                }}
              >
                {p.icon}
                {p.category}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-b-3xl flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderTop: "none" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder={t("sevaAI.placeholder")}
              className="flex-1 bg-transparent outline-none text-white placeholder-white/25"
              style={{ fontSize: "14px" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}
            >
              <Send size={16} color="white" />
            </button>
          </div>

          <p className="text-center mt-2" style={{ fontSize: "11px", color: "rgba(148,163,184,0.3)" }}>
            Seva AI provides information only. For medical emergencies, call 108 or visit the nearest hospital.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
