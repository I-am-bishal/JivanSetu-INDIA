import { Link } from "react-router";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useThemeStyles } from "../ThemeContext";

export function Footer() {
  const { t } = useTranslation();
  const styles = useThemeStyles();

  return (
    <footer style={{ borderTop: `1px solid ${styles.footerBorder}`, padding: "24px 16px", background: styles.pageBg }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2 relative">
          <div className="flex items-center gap-2">
            <Heart size={16} fill="#dc2626" color="#dc2626" />
            <span style={{ fontSize: "14px", color: styles.footerText, fontWeight: 600 }}>
              JivanSetu · {t("footer.tagline") || "Bridge of Life"}
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-1">
             <p style={{ fontSize: "13px", color: "#ef4444", fontWeight: "bold" }}>
                Emergency: 112 (National) | 108 (Ambulance) | 1800-11-NOTTO (Organ) | 104 (Health Alert)
             </p>
          </div>
        </div>
        
        <p style={{ fontSize: "13px", color: styles.footerTextMuted, textAlign: "center", maxWidth: "400px" }}>
          {t("footer.emergency") || "In case of medical emergency, always call 108 or your local hospital directly."}
        </p>
        
        <div className="flex items-center gap-4">
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Contact", href: "/contact" },
            { label: "NOTTO", href: "/notto-guide" },
          ].map((item) => (
            <Link key={item.label} to={item.href} style={{ fontSize: "13px", color: styles.footerTextMuted }} className="hover:opacity-80 transition-opacity">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
