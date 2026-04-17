import { useEffect, useRef, useState } from "react";
import { AlertCircle, Droplets, Heart } from "lucide-react";

const SOS_ALERTS = [
  { id: 1, type: "blood", name: "Arjun S.", bloodType: "O−", location: "AIIMS Delhi", timeAgo: "2 min ago", severity: "critical" },
  { id: 2, type: "organ", name: "Meera P.", organ: "Kidney", location: "KEM Hospital, Mumbai", timeAgo: "8 min ago", severity: "critical" },
  { id: 3, type: "blood", name: "Suresh K.", bloodType: "AB+", location: "Apollo, Chennai", timeAgo: "15 min ago", severity: "high" },
  { id: 4, type: "organ", name: "Fatima B.", organ: "Liver", location: "Narayana Health, Bangalore", timeAgo: "22 min ago", severity: "high" },
  { id: 5, type: "blood", name: "Priya N.", bloodType: "B−", location: "PGI Chandigarh", timeAgo: "31 min ago", severity: "critical" },
  { id: 6, type: "organ", name: "Rajan M.", organ: "Cornea", location: "Sankara Nethralaya, Chennai", timeAgo: "45 min ago", severity: "moderate" },
  { id: 7, type: "blood", name: "Ananya T.", bloodType: "A+", location: "Tata Memorial, Mumbai", timeAgo: "1 hr ago", severity: "high" },
  { id: 8, type: "organ", name: "Krishnan V.", organ: "Heart", location: "SCTIMST, Trivandrum", timeAgo: "1.5 hrs ago", severity: "critical" },
];

export function SOSTicker() {
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)",
        borderBottom: "1px solid rgba(239,68,68,0.3)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center">
        {/* Static Label */}
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-1.5 bg-red-700 border-r border-red-500/50 z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-100"></span>
          </span>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "white" }}>
            LIVE SOS
          </span>
        </div>

        {/* Scrolling content */}
        <div className="overflow-hidden flex-1 py-1.5">
          <div
            ref={scrollRef}
            className="flex gap-8 whitespace-nowrap"
            style={{
              animation: paused ? "none" : "tickerScroll 40s linear infinite",
            }}
          >
            {[...SOS_ALERTS, ...SOS_ALERTS].map((alert, idx) => (
              <div key={`${alert.id}-${idx}`} className="flex items-center gap-2 flex-shrink-0">
                {alert.type === "blood" ? (
                  <Droplets size={12} className="text-red-200" />
                ) : (
                  <Heart size={12} className="text-red-200" />
                )}
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.95)", fontWeight: 500 }}>
                  {alert.name} needs
                  {alert.type === "blood" ? ` ${alert.bloodType} blood` : ` ${alert.organ}`}
                </span>
                <span style={{ fontSize: "12px", color: "rgba(255,200,200,0.8)" }}>
                  @ {alert.location}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: "9999px",
                    background: alert.severity === "critical" ? "rgba(239,68,68,0.4)" : "rgba(234,179,8,0.4)",
                    color: alert.severity === "critical" ? "#fca5a5" : "#fde68a",
                    border: `1px solid ${alert.severity === "critical" ? "rgba(239,68,68,0.5)" : "rgba(234,179,8,0.5)"}`,
                    letterSpacing: "0.05em",
                  }}
                >
                  {alert.severity.toUpperCase()}
                </span>
                <span style={{ fontSize: "11px", color: "rgba(255,200,200,0.6)" }}>{alert.timeAgo}</span>
                <span style={{ color: "rgba(255,100,100,0.4)", marginLeft: "8px" }}>◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
