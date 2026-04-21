import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { TrendingUp, Users, Heart, Activity, Globe, MapPin, Droplets, Award } from "lucide-react";

const STATE_DATA = [
  { state: "Tamil Nadu", donors: 4250, color: "#3b82f6" },
  { state: "Telangana", donors: 3800, color: "#2563eb" },
  { state: "Maharashtra", donors: 3500, color: "#1d4ed8" },
  { state: "Karnataka", donors: 3200, color: "#6366f1" },
  { state: "Kerala", donors: 2900, color: "#7c3aed" },
  { state: "Gujarat", donors: 2600, color: "#8b5cf6" },
  { state: "Delhi", donors: 2400, color: "#a855f7" },
  { state: "Rajasthan", donors: 2100, color: "#c084fc" },
  { state: "West Bengal", donors: 1800, color: "#d8b4fe" },
  { state: "UP", donors: 1500, color: "#e9d5ff" },
];

const YEARLY_GROWTH = [
  { year: "2019", donors: 42000, transplants: 12500, livesSaved: 18000 },
  { year: "2020", donors: 38000, transplants: 9800, livesSaved: 14000 },
  { year: "2021", donors: 51000, transplants: 15200, livesSaved: 22000 },
  { year: "2022", donors: 68000, transplants: 21000, livesSaved: 31000 },
  { year: "2023", donors: 85000, transplants: 28500, livesSaved: 42000 },
  { year: "2024", donors: 102000, transplants: 35000, livesSaved: 52000 },
  { year: "2025", donors: 118000, transplants: 40200, livesSaved: 60000 },
  { year: "2026", donors: 128471, transplants: 44100, livesSaved: 66000 },
];

const ORGAN_WAITING = [
  { name: "Kidney", value: 200000, color: "#3b82f6" },
  { name: "Liver", value: 50000, color: "#10b981" },
  { name: "Heart", value: 50000, color: "#dc2626" },
  { name: "Cornea", value: 150000, color: "#f59e0b" },
  { name: "Lung", value: 20000, color: "#a855f7" },
  { name: "Pancreas", value: 10000, color: "#ec4899" },
];

const MONTHLY_REG = [
  { month: "Jan", blood: 4200, organ: 1800 },
  { month: "Feb", blood: 3900, organ: 1600 },
  { month: "Mar", blood: 5100, organ: 2200 },
  { month: "Apr", blood: 4800, organ: 2000 },
  { month: "May", blood: 5500, organ: 2400 },
  { month: "Jun", blood: 6200, organ: 2800 },
  { month: "Jul", blood: 5800, organ: 2600 },
  { month: "Aug", blood: 6800, organ: 3100 },
  { month: "Sep", blood: 7200, organ: 3400 },
  { month: "Oct", blood: 6500, organ: 3000 },
  { month: "Nov", blood: 7800, organ: 3600 },
  { month: "Dec", blood: 8200, organ: 3900 },
];

const GLOBAL_COMPARISON = [
  { country: "Spain", rate: 49.6, color: "#10b981" },
  { country: "Croatia", rate: 38.6, color: "#059669" },
  { country: "USA", rate: 36.9, color: "#3b82f6" },
  { country: "France", rate: 33.4, color: "#6366f1" },
  { country: "Brazil", rate: 17.8, color: "#a855f7" },
  { country: "China", rate: 4.7, color: "#f59e0b" },
  { country: "India", rate: 0.86, color: "#dc2626" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count.toLocaleString("en-IN")}{suffix}</>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: "rgba(12,20,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
      <p style={{ fontSize: "12px", fontWeight: 700, color: "white", marginBottom: "6px" }}>{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ fontSize: "11px", color: entry.color, marginBottom: "2px" }}>
          {entry.name}: <strong>{entry.value.toLocaleString("en-IN")}</strong>
        </p>
      ))}
    </div>
  );
};

export function Statistics() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p style={{ fontSize: "12px", color: "#93c5fd", letterSpacing: "0.1em", fontWeight: 600 }} className="mb-3">DATA & INSIGHTS</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Organ & Blood Donation{" "}
            <span style={{ background: "linear-gradient(90deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Statistics
            </span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(148,163,184,0.8)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Real-time data visualization of India's organ and blood donation landscape. Numbers that tell the story of lives saved.
          </p>
        </motion.div>

        {/* Hero Stats */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Registered Donors", value: 128471, icon: <Users size={20} />, color: "#3b82f6", gradient: "linear-gradient(135deg, #1e3a8a, #2563eb)" },
            { label: "Lives Saved", value: 32918, icon: <Heart size={20} />, color: "#dc2626", gradient: "linear-gradient(135deg, #7f1d1d, #dc2626)" },
            { label: "Partner Hospitals", value: 847, icon: <Activity size={20} />, color: "#10b981", gradient: "linear-gradient(135deg, #064e3b, #059669)" },
            { label: "Cities Active", value: 312, icon: <MapPin size={20} />, color: "#f59e0b", gradient: "linear-gradient(135deg, #78350f, #d97706)" },
          ].map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.gradient }}>
                <span style={{ color: "white" }}>{stat.icon}</span>
              </div>
              <p style={{ fontSize: "28px", fontWeight: 800, color: "white", lineHeight: 1 }}>
                <AnimatedCounter target={stat.value} />
              </p>
              <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.6)", marginTop: "4px" }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Bar Chart: State-wise Donors */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2 mb-5">
              <MapPin size={14} className="text-blue-400" />
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>Top States by Donor Count</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={STATE_DATA} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: "rgba(148,163,184,0.5)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} />
                <YAxis type="category" dataKey="state" tick={{ fill: "rgba(148,163,184,0.7)", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="donors" name="Donors" radius={[0, 6, 6, 0]} barSize={20}>
                  {STATE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart: Organ Waiting List */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2 mb-5">
              <Heart size={14} className="text-red-400" />
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>Organ-wise Waiting List (India)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={ORGAN_WAITING} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                  {ORGAN_WAITING.map((entry, i) => <Cell key={i} fill={entry.color} stroke="transparent" />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Line Chart: Year-over-Year Growth */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-6 lg:col-span-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={14} className="text-green-400" />
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>Year-over-Year Growth</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={YEARLY_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: "rgba(148,163,184,0.6)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} />
                <YAxis tick={{ fill: "rgba(148,163,184,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>{value}</span>} />
                <Line type="monotone" dataKey="donors" name="Donors" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: "#3b82f6" }} />
                <Line type="monotone" dataKey="transplants" name="Transplants" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981" }} />
                <Line type="monotone" dataKey="livesSaved" name="Lives Saved" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: "#f59e0b" }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Area Chart: Monthly Registrations */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2 mb-5">
              <Droplets size={14} className="text-orange-400" />
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>Monthly Registrations (2025)</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={MONTHLY_REG}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(148,163,184,0.6)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} />
                <YAxis tick={{ fill: "rgba(148,163,184,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="blood" name="Blood Donors" stroke="#dc2626" fill="rgba(220,38,38,0.15)" strokeWidth={2} />
                <Area type="monotone" dataKey="organ" name="Organ Donors" stroke="#3b82f6" fill="rgba(37,99,235,0.15)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Global Comparison */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2 mb-5">
              <Globe size={14} className="text-purple-400" />
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>Organ Donors per Million Population</h3>
            </div>
            <div className="flex flex-col gap-3">
              {GLOBAL_COMPARISON.map((country) => (
                <div key={country.country}>
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontSize: "13px", fontWeight: country.country === "India" ? 700 : 500, color: country.country === "India" ? "#fca5a5" : "rgba(255,255,255,0.7)" }}>
                      {country.country} {country.country === "India" && "🇮🇳"}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: country.color }}>{country.rate}</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(country.rate / 50) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: country.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2 mt-4 px-3 py-2.5 rounded-xl" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}>
              <Award size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p style={{ fontSize: "11px", color: "rgba(252,165,165,0.8)", lineHeight: 1.5 }}>
                India's rate of <strong>0.86</strong> donors per million is among the world's lowest. Every registration on JivanSetu helps close this gap.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Source Disclaimer */}
        <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)", lineHeight: 1.6 }}>
            <strong>Sources:</strong> Data aggregated from NOTTO Annual Reports, eRaktKosh, WHO Global Observatory on Donation and Transplantation, and JivanSetu internal metrics. Some figures are simulated for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
