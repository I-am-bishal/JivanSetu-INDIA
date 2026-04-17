import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../i18n/config";
import { Globe, ChevronDown } from "lucide-react";

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white transition-all duration-200"
        style={{ fontFamily: "'Noto Sans', sans-serif" }}
      >
        <Globe size={14} />
        <span style={{ fontSize: "13px", fontWeight: 500 }}>{current.nativeLabel}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-50"
          style={{ background: "rgba(10, 20, 40, 0.95)", backdropFilter: "blur(20px)" }}>
          <div className="p-2 grid grid-cols-2 gap-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                className={`flex flex-col items-start px-3 py-2 rounded-xl transition-all duration-150 text-left ${
                  lang.code === i18n.language
                    ? "bg-blue-600 text-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
                dir={lang.rtl ? "rtl" : "ltr"}
              >
                <span style={{ fontSize: "14px", fontWeight: 600, fontFamily: "'Noto Sans', sans-serif" }}>
                  {lang.nativeLabel}
                </span>
                <span style={{ fontSize: "11px", opacity: 0.7, fontFamily: "sans-serif" }}>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
