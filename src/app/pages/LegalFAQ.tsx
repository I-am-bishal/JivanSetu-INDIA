import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Scale, ChevronDown, ChevronUp, Shield, AlertTriangle,
  CheckCircle, HelpCircle, BookOpen, Phone, ArrowRight, Sparkles, Heart,
  XCircle, Users, Gavel, Building2, Clock
} from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
};

const FAQ_DATA: FAQItem[] = [
  {
    question: "What is the Transplantation of Human Organs and Tissues Act (THOTA)?",
    answer: "THOTA was enacted by the Indian Parliament in 1994 and amended in 2011. It is the principal law governing organ and tissue donation and transplantation in India. The Act provides for the regulation of removal, storage, and transplantation of human organs and tissues for therapeutic purposes, and for the prevention of commercial dealings in human organs and tissues.\n\nThe Act applies to:\n• Living donor transplants\n• Cadaveric (deceased/brain-death) donor transplants\n• Tissue donation (corneas, skin, bone, etc.)\n\nIt is applicable across all states that have adopted it.",
    icon: <Scale size={18} />,
    category: "Basics",
  },
  {
    question: "Who can legally donate organs in India?",
    answer: "Under THOTA, the following people can donate:\n\n✅ Living Donors (for specific organs like kidney, partial liver):\n• Near relatives: Spouse, son, daughter, father, mother, brother, sister, grandparents\n• Non-related donors: Only after approval by the hospital's Authorization Committee (to prevent organ trade)\n\n✅ Deceased Donors (Brain Death):\n• Any person who has been declared brain dead by a panel of 4 doctors\n• Family consent is required even if the deceased had pledged donation\n\n✅ Tissue Donors:\n• Can donate tissues (corneas, skin, bone) up to 6-12 hours after cardiac death\n\n❌ Minors cannot donate organs without parental consent\n❌ Mentally incapacitated individuals cannot consent to donation",
    icon: <Users size={18} />,
    category: "Eligibility",
  },
  {
    question: "What is the difference between living and cadaveric donation?",
    answer: "Living Donation:\n• The donor is alive and gives consent voluntarily\n• Only certain organs: one kidney, part of liver, part of lung, part of pancreas\n• Near relatives can donate directly; non-relatives need Authorization Committee approval\n• The donor undergoes medical evaluation to ensure safety\n\nCadaveric (Brain Death) Donation:\n• The donor has been declared brain dead while on ventilator support\n• All organs can be retrieved: heart, both kidneys, liver, lungs, pancreas, intestines\n• Corneas, skin, bone, heart valves can also be retrieved\n• One cadaveric donor can save up to 8 lives and help 50+ people through tissue donation\n• Brain death must be certified by a panel of 4 doctors including a neurologist",
    icon: <Heart size={18} />,
    category: "Types",
  },
  {
    question: "What is brain death? How is it certified?",
    answer: "Brain death is the irreversible cessation of all brain function, including the brain stem. The patient is legally dead even though the heart continues to beat with ventilator support.\n\nCertification Process (as per THOTA):\nA panel of 4 doctors must certify brain death:\n1. The treating doctor (RMP in charge of the hospital)\n2. An RMP nominated from the hospital panel\n3. A neurologist or neurosurgeon\n4. A government-nominated doctor (for government hospitals)\n\nTwo sets of tests are conducted 6 hours apart:\n• No pupillary response to light\n• No corneal reflex\n• No vestibulo-ocular reflex (caloric test)\n• No motor response within cranial nerve distribution\n• No gag reflex\n• No respiratory efforts (apnea test)\n\nBrain death certification is mandatory before organ retrieval.",
    icon: <Gavel size={18} />,
    category: "Medical",
  },
  {
    question: "Is organ trading illegal in India?",
    answer: "Yes, organ trading is strictly illegal under THOTA.\n\n⚖️ Penalties for organ trading:\n• Imprisonment: 5-10 years (increased from 2-7 years after 2011 amendment)\n• Fine: Up to ₹20 lakh (previously ₹10,000-₹20,000)\n\nThe law prohibits:\n❌ Buying or selling human organs\n❌ Advertising for organs for sale\n❌ Acting as a middleman/tout (organ broker)\n❌ Hospitals performing transplants without registration\n❌ Removing organs without proper authorization\n\nJivanSetu is a matching platform only — it does NOT facilitate organ trade. All organ allocations are routed through NOTTO's transparent waitlist system.",
    icon: <AlertTriangle size={18} />,
    category: "Legal",
  },
  {
    question: "Does my family need to consent even if I've pledged?",
    answer: "Yes. Under current Indian law, even if you have signed a donor pledge card, your family's consent is required before organs can be retrieved after brain death.\n\nThis is why it's critical to:\n✅ Inform your family about your decision to donate\n✅ Discuss your wishes with your spouse and children\n✅ Keep your donor card accessible\n✅ Register on the NOTTO portal (your pledge is recorded officially)\n\nIn practice, most families honor the deceased's wish when they know about it. The main reason for organ wastage is families being unaware of the deceased's pledge.\n\nJivanSetu strongly recommends having this conversation with your loved ones.",
    icon: <Users size={18} />,
    category: "Consent",
  },
  {
    question: "Is there an age limit for organ donation?",
    answer: "There is no strict upper age limit for organ donation in India.\n\n📋 General guidelines:\n• Living kidney donors: 18-65 years (varies by hospital)\n• Cadaveric donors: No strict age limit — medical suitability is assessed case by case\n• Cornea donation: Up to age 80 in many cases\n• Blood donation: 18-65 years, with weight ≥45 kg\n\n👶 For minors (below 18):\n• Living donation is generally not permitted\n• In cadaveric cases, parents/legal guardians must provide consent\n\nThe key factor is medical suitability, not age alone. A healthy 70-year-old's corneas may be perfectly suitable for transplant.",
    icon: <Clock size={18} />,
    category: "Eligibility",
  },
  {
    question: "What role does NOTTO play in organ allocation?",
    answer: "NOTTO (National Organ and Tissue Transplant Organization) is the apex body under the Ministry of Health & Family Welfare. Its roles:\n\n🔵 Organ Allocation:\n• Maintains the national waitlist for organs\n• Runs the computerized matching algorithm\n• Coordinates cross-state organ sharing when no local match is found\n\n🔵 Registry:\n• Maintains India's transplant registry\n• Tracks all transplants performed nationwide\n• Records donor pledges\n\n🔵 Oversight:\n• Registers hospitals for transplant procedures\n• Monitors compliance with THOTA\n• Investigates reports of organ trading\n\n🔵 Structure:\n• NOTTO → National level\n• ROTTO → Regional level (5 regions)\n• SOTTO → State level\n• ZTCC → Zonal (Mumbai, Chennai, etc.)\n\nAll organ matches on JivanSetu are routed through NOTTO.",
    icon: <Building2 size={18} />,
    category: "NOTTO",
  },
  {
    question: "What is Form 18 and when is it needed?",
    answer: "Form 18 is the official medical form used for organ transplant applications in India.\n\nIt contains:\n• Patient's complete medical history\n• Diagnosis and urgency assessment\n• Blood group and HLA typing results\n• Referring hospital's NOTTO registration number\n• Consent declaration\n• Doctor's recommendation\n\nWhen Form 18 is needed:\n✅ When a patient is added to the NOTTO waitlist\n✅ When a living donor is being evaluated\n✅ For cross-state organ allocation\n✅ For Authorization Committee approval (non-related donors)\n\nJivanSetu's Report Scanner feature can help extract key data from Form 18 to auto-fill your registration.",
    icon: <BookOpen size={18} />,
    category: "Documents",
  },
  {
    question: "Do any religions prohibit organ donation?",
    answer: "Most major religions practiced in India support or permit organ donation:\n\n🕉️ Hinduism: Supports donation as 'daan' (gift of life). The Bhagavad Gita speaks of the body as a garment — the soul transcends.\n\n☪️ Islam: The Muslim Law Board has pronounced in favor of organ donation as an act of merit (sawab). Saving a life is considered one of the highest acts.\n\n✝️ Christianity: Pope John Paul II called organ donation 'a genuine act of love'. Most denominations actively support it.\n\n🙏 Sikhism: Consistent with Sikh beliefs of selfless service (seva) and helping the needy.\n\n☸️ Buddhism: Donation as an act of compassion (karuna) aligns with Buddhist teachings.\n\n🕎 Jainism: While ahimsa (non-violence) is central, organ donation after death is viewed positively.\n\nNo major religion practiced in India prohibits organ donation.",
    icon: <HelpCircle size={18} />,
    category: "Faith",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(FAQ_DATA.map((f) => f.category)))];

export function LegalFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [catFilter, setCatFilter] = useState("All");

  const filtered = catFilter === "All" ? FAQ_DATA : FAQ_DATA.filter((f) => f.category === catFilter);

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "#060d1f", color: "white" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Scale size={14} className="text-amber-400" />
            <span style={{ fontSize: "12px", color: "#fde68a", fontWeight: 700, letterSpacing: "0.1em" }}>LEGAL FAQ</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
            Understanding{" "}
            <span style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              THOTA
            </span>
            {" "}in Simple Terms
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(148,163,184,0.8)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Everything you need to know about India's Transplantation of Human Organs & Tissues Act, explained clearly.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main FAQ */}
          <div className="flex-1">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => { setCatFilter(cat); setOpenIdx(null); }}
                  className="px-3.5 py-1.5 rounded-full transition-all"
                  style={{
                    fontSize: "12px", fontWeight: catFilter === cat ? 600 : 400,
                    background: catFilter === cat ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.04)",
                    border: catFilter === cat ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    color: catFilter === cat ? "#fde68a" : "rgba(255,255,255,0.5)",
                  }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ Accordion */}
            <div className="flex flex-col gap-2">
              {filtered.map((item, i) => {
                const isOpen = openIdx === i;
                return (
                  <motion.div key={item.question}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: isOpen ? "rgba(245,158,11,0.06)" : "rgba(255,255,255,0.03)", border: isOpen ? "1px solid rgba(245,158,11,0.15)" : "1px solid rgba(255,255,255,0.07)" }}>
                    <button onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="w-full flex items-start gap-3 px-5 py-4 text-left transition-all hover:bg-white/3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: isOpen ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.06)", color: isOpen ? "#fbbf24" : "rgba(255,255,255,0.3)" }}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <span className="px-2 py-0.5 rounded-md text-xs mb-1 inline-block"
                          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(148,163,184,0.6)", fontSize: "10px" }}>
                          {item.category}
                        </span>
                        <p style={{ fontSize: "15px", fontWeight: 600, color: "white", lineHeight: 1.4 }}>{item.question}</p>
                      </div>
                      {isOpen ? <ChevronUp size={18} className="text-amber-400 flex-shrink-0 mt-1" /> : <ChevronDown size={18} className="text-white/20 flex-shrink-0 mt-1" />}
                    </button>
                    {isOpen && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="px-5 pb-5 pl-17">
                        <div className="ml-12">
                          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, whiteSpace: "pre-line" }}
                            dangerouslySetInnerHTML={{
                              __html: item.answer
                                .replace(/✅/g, '<span style="color:#6ee7b7">✅</span>')
                                .replace(/❌/g, '<span style="color:#fca5a5">❌</span>')
                                .replace(/⚖️/g, '<span>⚖️</span>')
                                .replace(/\*\*(.*?)\*\*/g, '<strong style="color:white">$1</strong>')
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
            {/* Key Penalties */}
            <div className="rounded-3xl p-5" style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)" }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-red-400" />
                <span style={{ fontSize: "11px", color: "#fca5a5", fontWeight: 600, letterSpacing: "0.06em" }}>KEY PENALTIES</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { offense: "Organ Trading", penalty: "5-10 years + ₹20 lakh" },
                  { offense: "Unauthorized Removal", penalty: "5-10 years" },
                  { offense: "Organ Brokering", penalty: "3-5 years + ₹5 lakh" },
                  { offense: "Unregistered Hospital", penalty: "3-5 years + ₹5 lakh" },
                ].map((p) => (
                  <div key={p.offense} className="flex items-start gap-2">
                    <XCircle size={12} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p style={{ fontSize: "12px", color: "white", fontWeight: 600 }}>{p.offense}</p>
                      <p style={{ fontSize: "11px", color: "rgba(252,165,165,0.6)" }}>{p.penalty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-3xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "10px" }}>QUICK LINKS</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "NOTTO Portal", href: "/notto-guide" },
                  { label: "Register as Donor", href: "/register" },
                  { label: "Report Scanner", href: "/report-scanner" },
                  { label: "SOS Dashboard", href: "/urgency" },
                ].map((link) => (
                  <Link key={link.label} to={link.href}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl transition-all hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.06)", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                    {link.label}
                    <ArrowRight size={12} className="text-white/30" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="rounded-3xl p-5" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Phone size={14} className="text-blue-400" />
                <span style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 600, letterSpacing: "0.06em" }}>HELPLINES</span>
              </div>
              {[
                { label: "NOTTO Helpline", number: "1800-11-NOTTO" },
                { label: "National Ambulance", number: "108" },
                { label: "Blood Emergency", number: "1910" },
                { label: "iCall Mental Health", number: "9152987821" },
              ].map((h) => (
                <div key={h.label} className="flex justify-between items-center mb-1.5">
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{h.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#93c5fd" }}>{h.number}</span>
                </div>
              ))}
            </div>

            {/* Seva AI CTA */}
            <Link to="/seva-ai" className="block rounded-3xl p-5 transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(37,99,235,0.2)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-blue-400" />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>Still have questions?</span>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(147,197,253,0.7)", lineHeight: 1.5 }}>
                Ask Seva AI for personalized answers about organ donation laws and processes.
              </p>
              <div className="flex items-center gap-1.5 mt-3" style={{ fontSize: "12px", color: "#93c5fd", fontWeight: 600 }}>
                Chat with Seva AI <ArrowRight size={12} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
