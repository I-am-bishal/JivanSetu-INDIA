import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Sparkles, MapPin, FileText, UserCheck, Loader } from "lucide-react";
import { useThemeStyles } from "../ThemeContext";
import { LanguageSelector } from "./LanguageSelector";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
};

function getSevaResponse(input: string, t: any): string {
  // Check exact suggestion matches
  const suggestions = t("sevaAI.suggestions", { returnObjects: true });
  if (Array.isArray(suggestions)) {
    if (input === suggestions[0]) return t("sevaAI.answers.register");
    if (input === suggestions[1]) return t("sevaAI.answers.document");
    if (input === suggestions[2]) return t("sevaAI.answers.blood");
    if (input === suggestions[3]) return t("sevaAI.answers.legal");
  }

  // Check chips matches
  if (input === t("sevaAI.chips.bloodBank", "Find Blood Bank") || input === "Find Blood Bank") return t("sevaAI.answers.blood");
  if (input === t("sevaAI.chips.registerDonor", "Register Donor") || input === "Register Donor") return t("sevaAI.answers.register");
  if (input === t("sevaAI.chips.documents", "Documents") || input === "Documents") return t("sevaAI.answers.document");

  // Fallback keyword matching
  const lower = input.toLowerCase();
  if (lower.includes("register") || lower.includes("sign up") || lower.includes("how to") || lower.includes("पंजीकरण")) return t("sevaAI.answers.register");
  if (lower.includes("organ") && !lower.includes("legal") || lower.includes("अंग")) return t("sevaAI.answers.organ");
  if (lower.includes("legal") || lower.includes("law") || lower.includes("illegal") || lower.includes("thota") || lower.includes("कानूनी")) return t("sevaAI.answers.legal");
  if (lower.includes("blood") || lower.includes("bank") || lower.includes("रक्त")) return t("sevaAI.answers.blood");
  if (lower.includes("document") || lower.includes("certificate") || lower.includes("aadhaar") || lower.includes("दस्तावेज")) return t("sevaAI.answers.document");
  if (lower.includes("notto") || lower.includes("government") || lower.includes("official") || lower.includes("सरकार")) return t("sevaAI.answers.notto");
  return t("sevaAI.answers.default");
}

export function SevaAIWidget() {
  const { t } = useTranslation();
  const styles = useThemeStyles();
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
    const reply = getSevaResponse(text, t);
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
              <span style={{ fontSize: "15px", fontWeight: 700, lineHeight: 1.1 }}>Seva AI</span>
              <span style={{ fontSize: "12px", opacity: 0.8, lineHeight: 1 }}>Ask me anything</span>
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
              width: "min(500px, calc(100vw - 24px))",
              height: "min(700px, calc(100vh - 100px))",
              background: styles.dropdownBg,
              backdropFilter: "blur(20px)",
              border: `1px solid ${styles.dropdownBorder}`,
              boxShadow: styles.dropdownShadow,
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
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "white", lineHeight: 1.2 }}>
                    {t("sevaAI.name")}
                  </p>
                  <p style={{ fontSize: "13px", color: "rgba(147,197,253,0.9)", lineHeight: 1 }}>
                    {isTyping ? t("sevaAI.typing") : "● Online · Powered by RAG AI"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSelector />
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
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
                          : styles.inputBg,
                      border: msg.role === "assistant" ? `1px solid ${styles.cardBorder}` : "none",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                        color: msg.role === "user" ? "white" : styles.textPrimary,
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
                    style={{ background: styles.inputBg, border: `1px solid ${styles.cardBorder}` }}
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
              {messages.length === 1 && !isTyping && !input.trim() && (
                <div className="flex flex-col gap-2 mt-1">
                  <p style={{ fontSize: "13px", color: styles.textMuted, textAlign: "center" }}>
                    Quick questions
                  </p>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s)}
                      className="text-left px-3.5 py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: styles.cardBg,
                        border: `1px solid ${styles.cardBorder}`,
                        fontSize: "14px",
                        color: styles.textSecondary,
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
                { icon: <MapPin size={11} />, label: t("sevaAI.chips.bloodBank", "Find Blood Bank") },
                { icon: <UserCheck size={11} />, label: t("sevaAI.chips.registerDonor", "Register Donor") },
                { icon: <FileText size={11} />, label: t("sevaAI.chips.documents", "Documents") },
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => sendMessage(chip.label)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0 transition-all hover:opacity-80"
                  style={{
                    background: "rgba(37,99,235,0.1)",
                    border: "1px solid rgba(37,99,235,0.3)",
                    fontSize: "13px",
                    color: styles.isDark ? "#93c5fd" : "#2563eb",
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
              style={{ borderTop: `1px solid ${styles.cardBorder}` }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder={t("sevaAI.placeholder")}
                className="flex-1 bg-transparent outline-none"
                style={{ fontSize: "15px", color: styles.textPrimary }}
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
