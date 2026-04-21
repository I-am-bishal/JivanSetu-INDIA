import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Heart, Droplets, MapPin, Award, ArrowRight, Filter, Quote, Star, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Story = {
  id: number;
  name: string;
  age: number;
  location: string;
  type: "organ" | "blood";
  organ?: string;
  title: string;
  story: string;
  quote: string;
  img: string;
  date: string;
  featured?: boolean;
};

const STORIES: Story[] = [
  {
    id: 1, name: "Rajesh Verma", age: 45, location: "Delhi",
    type: "organ", organ: "Kidney",
    title: "Six years on dialysis — then a miracle call from JivanSetu",
    story: "After 6 years of thrice-weekly dialysis sessions, Rajesh had almost given up hope. When he registered on JivanSetu, the NOTTO-integrated matching system found a compatible donor within 18 hours. Today, he runs a small business and coaches his son's cricket team.",
    quote: "JivanSetu gave me back my life. I went from surviving to truly living again.",
    img: "https://images.unsplash.com/photo-1622461828449-9cbb6d0b7d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    date: "March 2026", featured: true,
  },
  {
    id: 2, name: "Dr. Priya Nair", age: 38, location: "Kochi",
    type: "organ", organ: "Liver",
    title: "A transplant surgeon sees JivanSetu from the other side",
    story: "When her father needed an emergency liver transplant, Dr. Priya experienced the platform as a family member for the first time. The speed and transparency of the matching process, which she had praised professionally, now saved her own family.",
    quote: "As a surgeon, I trusted the platform. As a daughter, it became my lifeline.",
    img: "https://images.unsplash.com/photo-1623578981794-56753995d8f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    date: "February 2026",
  },
  {
    id: 3, name: "Sunita Patel", age: 52, location: "Ahmedabad",
    type: "blood",
    title: "12 blood donations and counting — the volunteer who saves regularly",
    story: "Sunita started donating blood after her neighbor needed emergency transfusions during childbirth. Through JivanSetu's proximity alerts, she now gets notified whenever a hospital near her needs her blood type. She's donated 12 times and recruited 30 donors.",
    quote: "Every time my phone buzzes with a JivanSetu alert, I know someone needs me. That feeling is priceless.",
    img: "https://images.unsplash.com/photo-1672075270227-ddf5cb181a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    date: "January 2026",
  },
  {
    id: 4, name: "Mohammad Irfan", age: 28, location: "Lucknow",
    type: "blood",
    title: "An auto driver who became his neighborhood's blood bank hero",
    story: "Irfan registered on JivanSetu after Seva AI explained the process in Hindi. Being O−, his blood is universally needed. He has responded to 8 emergency SOS alerts, once driving across the city at 2 AM to save a accident victim at King George's Hospital.",
    quote: "I drive an auto for a living, but saving lives is what makes me proud.",
    img: "https://images.unsplash.com/photo-1613799604496-90c66af2b53b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    date: "December 2025",
  },
  {
    id: 5, name: "Ananya Krishnan", age: 22, location: "Chennai",
    type: "organ", organ: "Cornea",
    title: "A college student pledges her corneas — inspires her entire campus",
    story: "After learning about corneal blindness in her medical ethics class, Ananya registered as a cornea donor on JivanSetu. She then organized an awareness drive on campus using JivanSetu's pledge wall feature, resulting in 200+ new registrations in a single week.",
    quote: "I can't cure blindness alone, but I can make sure my eyes help someone see after I'm gone.",
    img: "https://images.unsplash.com/photo-1622461828449-9cbb6d0b7d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    date: "November 2025",
  },
  {
    id: 6, name: "Gurpreet Singh", age: 60, location: "Chandigarh",
    type: "organ", organ: "Heart",
    title: "A retired soldier's heart beats on — in a 12-year-old's chest",
    story: "When Gurpreet suffered brain death after a stroke, his family honored his JivanSetu pledge. His heart was transported via green corridor to PGI Chandigarh, saving 12-year-old Harshita. His kidneys and liver saved two more.",
    quote: "Papa always said a soldier's duty doesn't end. His organs are still serving the nation. — Daughter Simran",
    img: "https://images.unsplash.com/photo-1613799604496-90c66af2b53b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    date: "October 2025", featured: true,
  },
  {
    id: 7, name: "Lakshmi Devi", age: 48, location: "Jaipur",
    type: "blood",
    title: "A mother's gratitude turns into a lifelong mission",
    story: "When Lakshmi's son needed rare AB− blood during surgery, JivanSetu found 3 donors within 45 minutes through proximity alerts. Overwhelmed with gratitude, she now volunteers at blood camps and has helped organize 15 donation drives in rural Rajasthan.",
    quote: "Strangers saved my son's life. Now I spend every day making sure no mother faces what I faced alone.",
    img: "https://images.unsplash.com/photo-1672075270227-ddf5cb181a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    date: "September 2025",
  },
  {
    id: 8, name: "Dr. Arvind Mehta", age: 55, location: "Mumbai",
    type: "organ", organ: "Kidney",
    title: "A nephrologist who built a bridge between patients and hope",
    story: "Dr. Mehta, a senior nephrologist at KEM Hospital, has used JivanSetu's Doctor Portal to verify and expedite over 50 transplant cases. He credits the platform's NOTTO integration for cutting average wait times by 60%.",
    quote: "For the first time, technology is matching the urgency that my patients face every day.",
    img: "https://images.unsplash.com/photo-1623578981794-56753995d8f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    date: "August 2025",
  },
];

const IMPACT_STATS = [
  { label: "Stories Shared", value: "500+", icon: <Quote size={18} />, color: "#3b82f6" },
  { label: "Lives Changed", value: "32,918", icon: <Heart size={18} />, color: "#dc2626" },
  { label: "Families United", value: "4,200+", icon: <Award size={18} />, color: "#f59e0b" },
  { label: "Cities Reached", value: "312", icon: <MapPin size={18} />, color: "#10b981" },
];

export function SuccessStories() {
  const [filter, setFilter] = useState<"all" | "organ" | "blood">("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = STORIES.filter((s) => filter === "all" || s.type === filter);
  const displayed = showAll ? filtered : filtered.slice(0, 6);
  const featuredStory = STORIES.find((s) => s.featured);

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p style={{ fontSize: "12px", color: "#93c5fd", letterSpacing: "0.1em", fontWeight: 600 }} className="mb-3">REAL STORIES · REAL LIVES</p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Stories of{" "}
            <span style={{ background: "linear-gradient(90deg, #dc2626, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Hope & Courage
            </span>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(148,163,184,0.8)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Every donor, every recipient, every family has a story. Read how JivanSetu is changing lives across India.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {IMPACT_STATS.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="rounded-2xl p-4 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ background: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <p style={{ fontSize: "22px", fontWeight: 800, color: "white" }}>{stat.value}</p>
              <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)" }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Story */}
        {featuredStory && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl overflow-hidden mb-10"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 h-48 md:h-auto relative">
                <ImageWithFallback src={featuredStory.img} alt={featuredStory.name}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.7) saturate(1.2)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 50%, rgba(6,13,31,0.95) 100%)" }} />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full"
                  style={{ fontSize: "10px", fontWeight: 700, background: "rgba(220,38,38,0.8)", color: "white" }}>
                  ⭐ FEATURED STORY
                </span>
              </div>
              <div className="md:w-3/5 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full"
                    style={{ fontSize: "10px", fontWeight: 700, background: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)" }}>
                    {featuredStory.organ} Recipient
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>{featuredStory.date}</span>
                </div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white", lineHeight: 1.3, marginBottom: "12px" }}>
                  {featuredStory.title}
                </h2>
                <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.75)", lineHeight: 1.8, marginBottom: "16px" }}>
                  {featuredStory.story}
                </p>
                <div className="flex items-start gap-2 px-4 py-3 rounded-xl" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <Quote size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <p style={{ fontSize: "13px", color: "#93c5fd", fontStyle: "italic", lineHeight: 1.5 }}>
                    "{featuredStory.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>{featuredStory.name}</span>
                  <span style={{ fontSize: "12px", color: "rgba(148,163,184,0.5)" }}>· {featuredStory.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { key: "all", label: "All Stories", icon: <Star size={13} /> },
            { key: "organ", label: "Organ Donation", icon: <Heart size={13} /> },
            { key: "blood", label: "Blood Donation", icon: <Droplets size={13} /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-all"
              style={{
                background: filter === tab.key ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.04)",
                border: filter === tab.key ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(255,255,255,0.08)",
                color: filter === tab.key ? "#93c5fd" : "rgba(255,255,255,0.5)",
                fontSize: "13px", fontWeight: 600,
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {displayed.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl overflow-hidden group"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="relative h-44 overflow-hidden">
                <ImageWithFallback src={story.img} alt={story.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "brightness(0.6) saturate(1.1)" }} />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full"
                    style={{
                      fontSize: "10px", fontWeight: 700,
                      background: story.type === "organ" ? "rgba(220,38,38,0.8)" : "rgba(234,88,12,0.8)",
                      color: "white",
                    }}>
                    {story.type === "organ" ? `${story.organ}` : "Blood Donation"}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "white", lineHeight: 1.4, marginBottom: "8px", minHeight: "40px" }}>
                  {story.title}
                </h3>
                <p style={{ fontSize: "12px", color: "rgba(148,163,184,0.65)", lineHeight: 1.6, marginBottom: "12px" }}
                  className="line-clamp-3">
                  {story.story}
                </p>
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg mb-3" style={{ background: "rgba(37,99,235,0.06)" }}>
                  <Quote size={10} className="text-blue-400 flex-shrink-0 mt-1" />
                  <p style={{ fontSize: "11px", color: "#93c5fd", fontStyle: "italic", lineHeight: 1.4 }}
                    className="line-clamp-2">
                    "{story.quote}"
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{story.name}, {story.age}</p>
                    <p className="flex items-center gap-1" style={{ fontSize: "11px", color: "rgba(148,163,184,0.5)" }}>
                      <MapPin size={10} /> {story.location} · {story.date}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array(5).fill(0).map((_, j) => <Star key={j} size={10} fill="#fbbf24" color="#fbbf24" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More */}
        {filtered.length > 6 && !showAll && (
          <div className="text-center mb-10">
            <button onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:bg-white/[0.06]"
              style={{ border: "1px solid rgba(255,255,255,0.12)", fontSize: "13px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
              Show More Stories <ChevronDown size={14} />
            </button>
          </div>
        )}

        {/* Submit Your Story CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(220,38,38,0.1), rgba(37,99,235,0.08))",
            border: "1px solid rgba(220,38,38,0.2)",
          }}
        >
          <Heart size={28} className="text-red-400 mx-auto mb-4" />
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "white", marginBottom: "8px" }}>Share Your Story</h2>
          <p style={{ fontSize: "14px", color: "rgba(148,163,184,0.75)", maxWidth: "450px", margin: "0 auto 20px", lineHeight: 1.7 }}>
            Has JivanSetu touched your life? Your story can inspire thousands to become donors and save lives.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #b91c1c, #dc2626)", boxShadow: "0 8px 25px rgba(220,38,38,0.3)", fontSize: "14px" }}>
              <Heart size={15} fill="white" /> Submit Your Story <ArrowRight size={14} />
            </Link>
            <Link to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:bg-white/[0.08]"
              style={{ border: "1px solid rgba(255,255,255,0.15)", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
              Become a Donor
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
