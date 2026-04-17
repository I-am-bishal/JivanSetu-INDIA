import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Sparkles, MapPin, FileText, UserCheck, Loader } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
};

const SEVA_RESPONSES: Record<string, string> = {
  "register": "To register as an organ donor in India:\n\n1. You need a valid Aadhaar card\n2. Mobile number linked to Aadhaar\n3. Doctor's eligibility certificate (for receivers)\n\nClick on 'Donate an Organ' on the home page to begin your 5-minute registration. Your consent is completely voluntary and can be revoked at any time.",
  "organ": "In India, the organs that can be donated include:\n\n❤️ Heart\n🫁 Lungs (both)\n🫀 Kidneys (both)\n🧠 Liver\n👁️ Corneas\n🩺 Pancreas\n\nLiving donors can donate one kidney or a part of the liver. All other organs are donated after brain death (cadaveric donation), as certified by an NOTTO-registered hospital.",
  "legal": "Yes, organ donation is fully legal in India under:\n\n📋 **The Transplantation of Human Organs and Tissues Act (THOTA), 1994** (amended 2011)\n\nKey points:\n• Trading organs is illegal and punishable\n• Only voluntary donation is permitted\n• All transplants must be routed through NOTTO\n• JivanSetu is a matching platform, NOT a marketplace\n\nFor official information: notto.mohfw.gov.in",
  "blood": "To find blood donors near you:\n\n1. Share your location below\n2. Enter the required blood type\n3. We'll show you verified donors within 10km\n\nEmergency blood banks:\n• AIIMS Delhi: +91-11-26588500\n• PGI Chandigarh: +91-172-2755555\n• KEM Mumbai: +91-22-24107000\n\nFor national blood bank directory, visit eraktkosh.in",
  "document": "Documents required for organ donor registration:\n\n✅ Aadhaar card (identity proof)\n✅ Recent passport photo\n✅ Mobile number linked to Aadhaar\n\nFor organ receivers additionally:\n✅ Doctor's opinion letter (on hospital letterhead)\n✅ Medical fitness certificate\n✅ Referring hospital registration number\n\nAll documents can be uploaded digitally in PDF or JPG format.",
  "notto": "NOTTO (National Organ and Tissue Transplant Organization) is India's apex body for organ transplantation.\n\nWebsite: notto.mohfw.gov.in\nHelpline: 1800-11-NOTTO\n\nJivanSetu works in partnership with NOTTO to ensure:\n• All matches are medically verified\n• Transplants happen through authorized hospitals\n• Data privacy is maintained per PDPA 2023",
  "default": "I'm Seva, your compassionate guide on JivanSetu. I can help you with:\n\n🩺 Organ donation registration\n🩸 Finding blood donors nearby\n📋 Required documents\n⚖️ Legal information (THOTA/NOTTO)\n❤️ Emotional support & guidance\n\nWhat would you like help with today?",
};

function getSevaResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("register") || lower.includes("sign up") || lower.includes("how to")) return SEVA_RESPONSES.register;
  if (lower.includes("organ") && !lower.includes("legal")) return SEVA_RESPONSES.organ;
  if (lower.includes("legal") || lower.includes("law") || lower.includes("illegal") || lower.includes("thota")) return SEVA_RESPONSES.legal;
  if (lower.includes("blood") || lower.includes("bank")) return SEVA_RESPONSES.blood;
  if (lower.includes("document") || lower.includes("certificate") || lower.includes("aadhaar")) return SEVA_RESPONSES.document;
  if (lower.includes("notto") || lower.includes("government") || lower.includes("official")) return SEVA_RESPONSES.notto;
  return SEVA_RESPONSES.default;
}

export function SevaAIWidget() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "assistant",
      text: t("sevaAI.greeting"),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
    const reply = getSevaResponse(text);
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString() + "r", role: "assistant", text: reply, timestamp: new Date() },
    ]);
  };

  const suggestions = t("sevaAI.suggestions", { returnObjects: true }) as string[];

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl text-white shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #1e40af, #2563eb)",
              boxShadow: "0 8px 32px rgba(37,99,235,0.45), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            <div className="relative">
              <Sparkles size={18} />
              <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-blue-800"></span>
            </div>
            <div className="flex flex-col items-start">
              <span style={{ fontSize: "13px", fontWeight: 700, lineHeight: 1.1 }}>Seva AI</span>
              <span style={{ fontSize: "10px", opacity: 0.8, lineHeight: 1 }}>Ask me anything</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col rounded-3xl overflow-hidden"
            style={{
              width: "min(390px, calc(100vw - 24px))",
              height: "min(580px, calc(100vh - 100px))",
              background: "rgba(8, 16, 36, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,99,235,0.2)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(30,64,175,0.8), rgba(37,99,235,0.6))",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <Sparkles size={18} color="white" />
                </div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "white", lineHeight: 1.2 }}>
                    {t("sevaAI.name")}
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(147,197,253,0.9)", lineHeight: 1 }}>
                    {isTyping ? t("sevaAI.typing") : "● Online · Powered by RAG AI"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 mr-2 mt-1 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}
                    >
                      <Sparkles size={12} color="white" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[82%] ${
                      msg.role === "user"
                        ? "rounded-tr-sm"
                        : "rounded-tl-sm"
                    }`}
                    style={{
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg, #1e40af, #2563eb)"
                          : "rgba(255,255,255,0.07)",
                      border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "rgba(255,255,255,0.92)",
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}
                  >
                    <Sparkles size={12} color="white" />
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex gap-1.5 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-blue-400"
                          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Suggestions (show only on first message) */}
              {messages.length === 1 && !isTyping && (
                <div className="flex flex-col gap-2 mt-1">
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
                    Quick questions
                  </p>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="text-left px-3.5 py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: "12.5px",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto flex-shrink-0" style={{ scrollbarWidth: "none" }}>
              {[
                { icon: <MapPin size={11} />, label: "Find Blood Bank" },
                { icon: <UserCheck size={11} />, label: "Register Donor" },
                { icon: <FileText size={11} />, label: "Documents" },
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => sendMessage(chip.label)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0 transition-all hover:opacity-80"
                  style={{
                    background: "rgba(37,99,235,0.2)",
                    border: "1px solid rgba(37,99,235,0.4)",
                    fontSize: "11px",
                    color: "#93c5fd",
                    fontWeight: 500,
                  }}
                >
                  {chip.icon}
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder={t("sevaAI.placeholder")}
                className="flex-1 bg-transparent outline-none text-white placeholder-white/30"
                style={{ fontSize: "13.5px" }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #1e40af, #2563eb)" }}
              >
                <Send size={15} color="white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
