import React from "react";
import { Star, ArrowRight, ChevronRight, Award, Users2, Briefcase, LayoutGrid } from "lucide-react";
import { InsuranceProduct } from "../types";
import { getBusinessIcon } from "../data/businessIcons";

interface HeroProps {
  onSelectProduct: (product: InsuranceProduct) => void;
  onSelectPersonalProduct: (productName: string) => void;
  onViewMoreProducts: () => void;
}

const PERSONAL_LOB_ITEMS = [
  { label: "Car", icon: "/assets/lob/car.png" },
  { label: "Health", icon: "/assets/lob/health.png" },
  { label: "Home", icon: "/assets/lob/home.png" },
  { label: "Life", icon: "/assets/lob/life.png" },
  { label: "Travel", icon: "/assets/lob/travel.png" },
  { label: "Savings", icon: "/assets/lob/savings.png" },
  { label: "Pet", icon: "/assets/lob/pet.png" },
  { label: "Bike", icon: "/assets/lob/bike.png" },
  { label: "Yacht", icon: "/assets/lob/yacht.png" },
  { label: "Job Loss", icon: null },
];

const BUSINESS_LOB_ITEMS = [
  { id: InsuranceProduct.GroupHealth, label: "Group Health" },
  { id: InsuranceProduct.Sme, label: "SME Insurance" },
  { id: InsuranceProduct.ProfessionalIndemnity, label: "Professional Indemnity" },
  { id: InsuranceProduct.PublicLiability, label: "Public Liability" },
  { id: InsuranceProduct.WorkmenCompensation, label: "Workmen Compensation" },
  { id: InsuranceProduct.ContractorAllRisk, label: "Contractors All Risks" },
  { id: InsuranceProduct.Property, label: "Property Insurance" },
  { id: InsuranceProduct.MarineCargo, label: "Marine Cargo" },
];

export const Hero: React.FC<HeroProps> = ({ onSelectProduct, onSelectPersonalProduct, onViewMoreProducts }) => {
  return (
    <section className="relative overflow-hidden bg-[#e0f2fe] text-slate-800 pt-16 pb-12 border-b border-sky-100">

      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 blur-[130px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Mascot with speech bubbles & trust tags */}
          <div className="lg:col-span-4 flex flex-col items-center text-center lg:sticky lg:top-24">

            {/* Mascot Container */}
            <div className="relative w-full max-w-sm h-72 sm:h-[360px] flex items-center justify-center overflow-visible select-none">
              <img
                src="/assets/alfred-mascot.png"
                alt="Alfred Mascot with Floating Coverages"
                className="max-h-full max-w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Call 800 Alfred button */}
            <a
              href="tel:8002537333"
              className="inline-flex items-center gap-2 bg-[#fe7434] hover:bg-[#d8632c] text-white font-extrabold text-xs tracking-wider uppercase py-3 px-6 rounded-2xl shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
            >
              <span>Call 800 Alfred</span>
              <ArrowRight size={13} />
            </a>

            {/* Google Rating Banner */}
            <div className="mt-4 w-full max-w-xs flex items-center justify-center gap-2 bg-white border border-slate-100/50 rounded-xl shadow-xs px-4 py-2.5">
              <img src="/assets/google.svg" alt="Google" className="w-7 h-7 shrink-0" referrerPolicy="no-referrer" />
              <div className="text-left leading-none">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-black text-slate-800">4.8</span>
                  <span className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={11} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">from 30,000+ reviews</p>
              </div>
            </div>

            {/* Trust badge chips */}
            <div className="mt-3 w-full max-w-xs flex items-center gap-2">
              <div className="flex-1 flex items-center gap-1.5 bg-white border border-slate-100/50 rounded-xl shadow-xs px-2.5 py-2">
                <Award size={14} className="text-blue-900 shrink-0" />
                <span className="text-[10px] font-bold text-slate-600 leading-tight">Highest rated insurance platform</span>
              </div>
              <div className="flex-1 flex items-center gap-1.5 bg-white border border-slate-100/50 rounded-xl shadow-xs px-2.5 py-2">
                <Users2 size={14} className="text-blue-900 shrink-0" />
                <span className="text-[10px] font-bold text-slate-600 leading-tight">Simple and fast claims process</span>
              </div>
            </div>

          </div>

          {/* Right Column: Title + Metro Station illustration + Category grid */}
          <div className="lg:col-span-8 space-y-6 text-left">

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-blue-950 leading-none">
                Alfred Simplifies Insurance
              </h1>

              <p className="text-lg font-black text-slate-600 leading-tight">
                Experience excellence with the UAE's largest platform
              </p>
            </div>

            {/* Dubai Metro Station Custom illustration */}
            <div className="space-y-3 group">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-md">
                <img
                  src="/assets/metro-station.png"
                  alt="Dubai Metro Station sponsored by InsuranceMarket.ae"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium text-left">
                InsuranceMarket.ae is honoured to be recognised with the naming of the <span className="text-blue-900 font-extrabold">InsuranceMarket Metro Station</span>, located between Mall of the Emirates and Dubai Internet City. This milestone firmly places Alfred on the map of Dubai.
              </p>
            </div>

            {/* Personal & Business Insurance — always visible, no toggle */}
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-md p-5 sm:p-6 space-y-8" id="explore-section">

              {/* Personal Insurance section */}
              <div className="space-y-6">
                <div className="border-t border-slate-200 pt-6 -mt-6">
                  <h2 className="text-center text-base sm:text-lg font-black text-slate-800">Personal Insurance</h2>
                </div>
                <div className="flex flex-nowrap justify-between overflow-x-auto gap-x-3 pb-1">
                  {PERSONAL_LOB_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => onSelectPersonalProduct(item.label)}
                      className="flex flex-col items-center text-center gap-1.5 cursor-pointer group shrink-0 w-16 sm:w-auto"
                    >
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-contain group-hover:scale-110 transition-transform duration-200"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                          <Briefcase size={30} className="text-blue-900 group-hover:scale-110 transition-transform duration-200" />
                        </div>
                      )}
                      <span className="text-[11px] sm:text-xs font-bold text-blue-900 flex items-center justify-center gap-0.5 leading-tight">
                        {item.label}
                        <ChevronRight size={11} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Insurance section */}
              <div className="space-y-6">
                <div className="border-t border-slate-200 pt-6">
                  <h2 className="text-center text-base sm:text-lg font-black text-slate-800">Business Insurance</h2>
                </div>
                <div className="flex flex-nowrap justify-between overflow-x-auto gap-x-3 pb-1">
                  {BUSINESS_LOB_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelectProduct(item.id)}
                      className="flex flex-col items-center text-center gap-1.5 cursor-pointer group shrink-0 w-16 sm:w-auto"
                    >
                      <img
                        src={getBusinessIcon(item.id)}
                        alt={item.label}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover object-top rounded-lg group-hover:scale-110 transition-transform duration-200"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[11px] sm:text-xs font-bold text-blue-900 flex items-center justify-center gap-0.5 leading-tight">
                        {item.label}
                        <ChevronRight size={11} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={onViewMoreProducts}
                    className="inline-flex items-center gap-2 bg-[#fe7434] hover:bg-[#d8632c] text-white font-extrabold text-xs tracking-wider uppercase py-3 px-6 rounded-2xl shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                  >
                    <span>View all business products</span>
                    <LayoutGrid size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Dubai Commercial Trust Statistics Strip */}
        <div className="mt-16 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">

            {/* Stat 1 */}
            <div className="space-y-1 md:px-4 flex flex-col justify-center text-center items-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Trusted by</p>
              <p className="text-2xl sm:text-3xl font-black text-blue-950 mt-1">
                200,000+ <span className="text-xs sm:text-sm font-bold text-slate-500 block sm:inline">policyholders</span>
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1 md:px-4 pt-4 md:pt-0 flex flex-col justify-center text-center items-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">UAE Insurance Experience</p>
              <p className="text-2xl sm:text-3xl font-black text-[#fe7434] mt-1">
                Over 30 <span className="text-xs sm:text-sm font-bold text-slate-500 block sm:inline">years of service</span>
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1 md:px-4 pt-4 md:pt-0 flex flex-col justify-center text-center items-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Partner Network</p>
              <p className="text-2xl sm:text-3xl font-black text-blue-950 mt-1">
                40+ <span className="text-xs sm:text-sm font-bold text-slate-500 block sm:inline">insurance companies</span>
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
