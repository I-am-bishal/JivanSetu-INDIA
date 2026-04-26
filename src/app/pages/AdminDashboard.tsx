import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Search, Users, Droplets, Heart, MapPin, Edit, Trash2, Lock, User, ArrowRight, Download, Radio, Activity, CheckCircle, AlertTriangle, FileText } from "lucide-react";

type RegisteredUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "blood-donor" | "organ-donor" | "blood-receiver" | "organ-receiver";
  bloodGroup: string;
  city: string;
  status: "active" | "inactive" | "pending";
  registeredOn: string;
};

const MOCK_USERS: RegisteredUser[] = [
  { id: "USR-001", name: "Rahul Verma", email: "rahul.v@example.com", phone: "+91-9876543210", type: "blood-donor", bloodGroup: "O+", city: "Delhi", status: "active", registeredOn: "2026-04-12" },
  { id: "USR-002", name: "Priya Sharma", email: "priya.s@example.com", phone: "+91-8765432109", type: "organ-donor", bloodGroup: "A+", city: "Mumbai", status: "active", registeredOn: "2026-04-15" },
  { id: "USR-003", name: "Amit Kumar", email: "amit.k@example.com", phone: "+91-7654321098", type: "blood-receiver", bloodGroup: "AB-", city: "Bangalore", status: "pending", registeredOn: "2026-04-20" },
  { id: "USR-004", name: "Sunita Patel", email: "sunita.p@example.com", phone: "+91-6543210987", type: "organ-receiver", bloodGroup: "B+", city: "Ahmedabad", status: "active", registeredOn: "2026-04-22" },
  { id: "USR-005", name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91-5432109876", type: "blood-donor", bloodGroup: "O-", city: "Chennai", status: "inactive", registeredOn: "2026-04-25" },
  { id: "USR-006", name: "Arjun Das", email: "arjun.d@example.com", phone: "+91-4321098765", type: "organ-donor", bloodGroup: "B-", city: "Kolkata", status: "active", registeredOn: "2026-04-26" },
  { id: "USR-007", name: "Neha Gupta", email: "neha.g@example.com", phone: "+91-3210987654", type: "blood-receiver", bloodGroup: "A-", city: "Pune", status: "active", registeredOn: "2026-04-26" },
];

export function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<"directory" | "analytics" | "broadcast">("directory");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId === "admin" && password === "admin123") {
      setLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleExportCSV = () => {
    alert("Exporting User Directory to CSV...");
  };

  const handleBroadcast = () => {
    alert("Emergency Broadcast SOS sent to all active users!");
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#060d1f" }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl p-8"
          style={{ background: "linear-gradient(180deg, rgba(37,99,235,0.1), rgba(0,0,0,0))", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>

          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6)" }}>
              <Shield size={28} color="white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-sm text-center" style={{ color: "rgba(147,197,253,0.6)" }}>
              Secure portal for platform administrators
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                Invalid Admin ID or Password
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium pl-1" style={{ color: "rgba(147,197,253,0.8)" }}>Admin ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User size={16} className="text-white/40" />
                </div>
                <input type="text" value={adminId} onChange={(e) => setAdminId(e.target.value)} required
                  placeholder="Enter admin ID"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium pl-1" style={{ color: "rgba(147,197,253,0.8)" }}>Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={16} className="text-white/40" />
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }} />
              </div>
            </div>

            <button type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-white mt-6 flex items-center justify-center gap-2 group transition-all"
              style={{ background: "linear-gradient(135deg, #1e40af, #3b82f6)", boxShadow: "0 8px 20px rgba(59,130,246,0.25)" }}>
              Access Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="mt-6 text-center text-xs text-white/40">
            Hint: Use ID <strong className="text-white/70">admin</strong> and Password <strong className="text-white/70">admin123</strong>
          </div>
        </motion.div>
      </div>
    );
  }
  
  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase()) ||
                          user.id.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || user.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "active": return { color: "#10b981", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)" };
      case "pending": return { color: "#f59e0b", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)" };
      case "inactive": return { color: "#ef4444", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)" };
      default: return { color: "#94a3b8", bg: "rgba(148,163,184,0.15)", border: "rgba(148,163,184,0.3)" };
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes("blood")) return <Droplets size={14} className="text-red-400" />;
    return <Heart size={14} className="text-blue-400" />;
  };

  const getTypeLabel = (type: string) => {
    return type.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  const stats = [
    { label: "Total Users", value: MOCK_USERS.length, icon: <Users size={18} />, color: "#3b82f6" },
    { label: "Active Donors", value: MOCK_USERS.filter(u => u.type.includes("donor") && u.status === "active").length, icon: <Heart size={18} />, color: "#10b981" },
    { label: "Pending Verification", value: MOCK_USERS.filter(u => u.status === "pending").length, icon: <AlertTriangle size={18} />, color: "#f59e0b" },
    { label: "Critical Matches", value: 14, icon: <Activity size={18} />, color: "#ef4444" },
  ];

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#060d1f" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-blue-400" />
              <span style={{ fontSize: "12px", color: "#60a5fa", fontWeight: 700, letterSpacing: "0.1em" }}>ADMIN PORTAL</span>
            </div>
            <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, color: "white" }}>Platform Overview</h1>
            <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.7)" }}>Manage registered users, monitor analytics, and broadcast alerts.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
            >
              <Download size={16} /> Export Data
            </button>
            <button 
              onClick={handleBroadcast}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg shadow-red-500/20"
              style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}
            >
              <Radio size={16} /> Broadcast SOS
            </button>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-4"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.7)", fontWeight: 500 }}>{stat.label}</p>
              </div>
              <p style={{ fontSize: "28px", fontWeight: 800, color: "white" }}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
          {(["directory", "analytics", "broadcast"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors"
              style={{ 
                background: activeTab === tab ? "rgba(37,99,235,0.15)" : "transparent",
                color: activeTab === tab ? "#60a5fa" : "rgba(255,255,255,0.5)"
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content: Directory */}
        {activeTab === "directory" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Controls */}
            <div className="p-4 flex flex-col md:flex-row gap-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by name, email, or ID..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/40 outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-sm text-white outline-none cursor-pointer"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <option value="all" style={{ background: "#0f172a" }}>All Users</option>
                <option value="blood-donor" style={{ background: "#0f172a" }}>Blood Donors</option>
                <option value="organ-donor" style={{ background: "#0f172a" }}>Organ Donors</option>
                <option value="blood-receiver" style={{ background: "#0f172a" }}>Blood Receivers</option>
                <option value="organ-receiver" style={{ background: "#0f172a" }}>Organ Receivers</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="p-4 text-xs font-semibold text-white/60">USER INFO</th>
                    <th className="p-4 text-xs font-semibold text-white/60">TYPE</th>
                    <th className="p-4 text-xs font-semibold text-white/60">BLOOD GRP</th>
                    <th className="p-4 text-xs font-semibold text-white/60">LOCATION</th>
                    <th className="p-4 text-xs font-semibold text-white/60">STATUS</th>
                    <th className="p-4 text-xs font-semibold text-white/60">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? filteredUsers.map((user, i) => {
                    const statusStyle = getStatusColor(user.status);
                    return (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={user.id} 
                        className="border-b last:border-0 hover:bg-white/5 transition-colors"
                        style={{ borderColor: "rgba(255,255,255,0.05)" }}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white shrink-0">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{user.name}</p>
                              <p className="text-xs text-white/50">{user.id} · {user.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(user.type)}
                            <span className="text-sm text-white/80">{getTypeLabel(user.type)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20">
                            {user.bloodGroup}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-white/70">
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-white/40" /> {user.city}
                          </div>
                        </td>
                        <td className="p-4">
                          <span 
                            className="px-2.5 py-1 rounded-full text-xs font-bold capitalize"
                            style={{ background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}` }}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 rounded hover:bg-blue-500/20 text-blue-400 transition-colors" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button className="p-1.5 rounded hover:bg-red-500/20 text-red-400 transition-colors" title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-white/50">
                        No users found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Tab Content: Analytics (Placeholder) */}
        {activeTab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Activity size={48} className="mx-auto text-blue-500/50 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics Center</h3>
            <p className="text-white/50 text-sm max-w-md mx-auto">Detailed charts, regional heatmaps, and demographic breakdown of all JivanSetu users will be displayed here.</p>
          </motion.div>
        )}

        {/* Tab Content: Broadcast (Placeholder) */}
        {activeTab === "broadcast" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Radio size={48} className="mx-auto text-red-500/50 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Broadcast Emergency SOS</h3>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-6">Send immediate push notifications to matching donors in specific geographic regions.</p>
            <button className="px-6 py-2.5 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors">
              Create New Broadcast
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
