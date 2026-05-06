import { Link } from "react-router";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useThemeStyles } from "../ThemeContext";

export function Footer() {
  const { t } = useTranslation();
  const styles = useThemeStyles();

  return (
    <footer style={{
      borderTop: `1px solid ${styles.footerBorder}`,
      padding: "20px 16px",
      paddingBottom: "calc(20px + env(safe-area-inset-bottom))",
      background: styles.pageBg,
    }}>
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {/* Top row: Brand + Emergency */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Heart size={16} fill="#dc2626" color="#dc2626" />
            <span style={{ fontSize: "14px", color: styles.footerText, fontWeight: 600 }}>
              JivanSetu · {t("footer.tagline") || "Bridge of Life"}
            </span>
          </div>

          {/* Emergency numbers — horizontal scroll on small phones */}
          <div className="w-full sm:w-auto overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            <div className="flex items-center gap-2 whitespace-nowrap pb-1">
              {[
                { label: "112", desc: "Emergency" },
                { label: "108", desc: "Ambulance" },
                { label: "NOTTO", desc: "1800-11" },
                { label: "104", desc: "Health" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg flex-shrink-0"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    fontSize: "12px",
                    color: "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  {item.label}
                  <span style={{ fontWeight: 500, opacity: 0.8 }}>{item.desc}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Disclaimer + Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p style={{ fontSize: "12px", color: styles.footerTextMuted, maxWidth: "400px", lineHeight: 1.5 }}>
            {t("footer.emergency") || "In case of medical emergency, always call 108 or your local hospital directly."}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Contact", href: "/contact" },
              { label: "NOTTO", href: "/notto-guide" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                style={{
                  fontSize: "13px",
                  color: styles.footerTextMuted,
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
