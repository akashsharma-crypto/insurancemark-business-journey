import React from "react";
import { Award, ShieldAlert, Star, Compass, Heart, Users, CheckCircle } from "lucide-react";

export const AwardsSection: React.FC = () => {
  const awards = [
    {
      title: "Superbrand Recognition",
      description: "Proud to be the region’s only insurance brand to earn this global distinction, voted by independent experts and industry leaders.",
      badgeColor: "from-amber-400 to-amber-500 text-amber-950",
      accentBg: "bg-amber-50",
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
          <polygon points="50,15 54,28 68,28 57,36 61,50 50,41 39,50 43,36 32,28 46,28" fill="#ca8a04" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="#d97706" strokeWidth="6" strokeDasharray="4,4" />
          <circle cx="50" cy="50" r="26" fill="none" stroke="#ca8a04" strokeWidth="3" />
          <path d="M 38,72 L 50,60 L 62,72 L 56,88 L 50,80 L 44,88 Z" fill="#b45309" />
          <text x="50" y="53" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="black" letterSpacing="0.5">SUPER</text>
          <text x="50" y="61" textAnchor="middle" fill="#78350f" fontSize="7" fontWeight="black">BRAND</text>
        </svg>
      )
    },
    {
      title: "Most Admired Companies",
      subtitle: "by Arabian Business 2024",
      description: "Proud to be listed among the UAE’s top 100 admired companies for our impact, excellence, and trusted customer relationships.",
      badgeColor: "from-slate-800 to-slate-950 text-white",
      accentBg: "bg-slate-50",
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
          {/* Bold 100 outline */}
          <rect x="18" y="25" width="64" height="50" rx="6" fill="#1e293b" />
          <text x="50" y="58" textAnchor="middle" fill="#f8fafc" fontSize="26" fontWeight="900" fontFamily="sans-serif">100</text>
          <text x="50" y="68" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="bold" letterSpacing="1">ADM_LIST</text>
        </svg>
      )
    },
    {
      title: "Inc. Arabia Leaders",
      subtitle: "of Tomorrow",
      description: "Honoured for driving innovation and delivering customer-first solutions that shape the future of insurance in the UAE.",
      badgeColor: "from-indigo-900 to-slate-900 text-indigo-200",
      accentBg: "bg-indigo-50/30",
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
          <circle cx="50" cy="50" r="30" fill="#312e81" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <path d="M 50,28 L 50,72 M 28,50 L 72,50" stroke="#f59e0b" strokeWidth="1.5" />
          <polygon points="50,34 54,44 64,44 56,52 60,62 50,56 40,62 44,52 36,44 46,44" fill="#fbbf24" transform="scale(0.5) translate(50,50)" />
          <text x="50" y="54" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="black" fontFamily="serif">Inc.</text>
        </svg>
      )
    },
    {
      title: "Great Place to Work",
      description: "Proud to build a workplace where our people feel valued, empowered, and inspired to make a difference every day.",
      badgeColor: "from-red-600 to-rose-600 text-white",
      accentBg: "bg-red-50/20",
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
          <rect x="20" y="20" width="60" height="60" rx="8" fill="#ef4444" />
          <circle cx="50" cy="45" r="14" fill="#ffffff" />
          <text x="50" y="49" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="black">GPTW</text>
          <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="black" letterSpacing="0.5">Certified</text>
          <text x="50" y="74" textAnchor="middle" fill="#ffffff" fontSize="5" fontWeight="bold">UAE 2025/2026</text>
        </svg>
      )
    },
    {
      title: "Best Workplaces UAE 2026",
      description: "Thrilled to be recognised among the UAE’s Best Workplaces for 2026, reflecting the strength of our culture, leadership, and team experience.",
      badgeColor: "from-blue-700 to-blue-900 text-white",
      accentBg: "bg-blue-50/20",
      icon: (
        <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
          <rect x="20" y="20" width="60" height="60" rx="8" fill="#1d4ed8" />
          <path d="M 38,40 H 62 V 55 C 62,65 50,72 50,72 C 50,72 38,65 38,55 Z" fill="#ffffff" />
          <polygon points="50,42 52,47 57,47 53,50 55,55 50,52 45,55 47,50 43,47 48,47" fill="#fbbf24" />
          <text x="50" y="74" textAnchor="middle" fill="#ffffff" fontSize="5" fontWeight="bold" letterSpacing="0.5">BEST WORKPLACES 2026</text>
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200 text-slate-800" id="awards-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading (Image 8 style) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-blue-900/10 text-blue-900 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full border border-blue-900/10">
            Award-Winning Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight mt-3">
            Recognised For Excellence
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Our commitment to compliance, customer satisfaction, and team culture makes us the UAE's most trusted insurance brokerage portal.
          </p>
        </div>

        {/* Layout Grid of Cards (Exactly matching Image 8 layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Row 1: 3 cards */}
          {awards.slice(0, 3).map((award, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-100/80 p-8 rounded-2xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Custom Badge SVG Icon */}
                <div className="w-14 h-14 flex items-center justify-center shrink-0">
                  {award.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight group-hover:text-blue-900 transition-colors duration-200">
                    {award.title}
                  </h3>
                  {award.subtitle && (
                    <p className="text-xs font-black text-slate-400 uppercase tracking-wider -mt-1">
                      {award.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 leading-relaxed pt-2">
                    {award.description}
                  </p>
                </div>
              </div>

              {/* Decorative accent dot */}
              <div className="flex items-center gap-1.5 mt-6 text-[10px] font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-900"></span>
                <span>Verified Awardee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          {awards.slice(3, 5).map((award, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-100/80 p-8 rounded-2xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Custom Badge SVG Icon */}
                <div className="w-14 h-14 flex items-center justify-center shrink-0">
                  {award.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight group-hover:text-blue-900 transition-colors duration-200">
                    {award.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed pt-2">
                    {award.description}
                  </p>
                </div>
              </div>

              {/* Decorative accent dot */}
              <div className="flex items-center gap-1.5 mt-6 text-[10px] font-bold text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-900"></span>
                <span>Verified Awardee</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
