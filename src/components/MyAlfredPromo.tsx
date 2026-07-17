import React from "react";
import { Check, Star, ArrowRight, Sparkles, Smartphone, Download } from "lucide-react";

export const MyAlfredPromo: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200 overflow-hidden" id="myalfred-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: iPhone promo + Membership content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Official myAlfred High-Fidelity Mockup (Image 0) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative select-none">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/10 blur-3xl rounded-full"></div>
            
            <img
              src="/assets/myalfred-app-preview.png"
              alt="myAlfred App Premium Membership Mockup"
              className="max-w-full h-auto max-h-[500px] object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-300 relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right Column: Premium membership description & download buttons (Image 5 Style) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-xs font-bold text-blue-900">
                <Sparkles size={14} className="text-yellow-600 fill-yellow-600/10" />
                <span>Premium Client Privileges</span>
              </div>

              {/* Headline with custom myAlfred font branding */}
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight leading-none">
                Free <span className="text-blue-900 font-extrabold">myAlfred</span> Premium membership With Every Policy
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Save up to <span className="text-blue-900 font-bold">AED 8,000 yearly</span> across car services, health & wellness, home services, electronics, dining, and 150+ UAE brands. Built exclusively to reward the trust of our policyholders.
              </p>
            </div>

            {/* Brand partners row (Exactly from Image 5) */}
            <div className="space-y-3 border-t border-b border-slate-200/80 py-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Featured Privilege Partners:</span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {/* Careem */}
                <div className="flex items-center gap-1 font-bold text-slate-800 text-sm tracking-tighter">
                  <span className="w-2 h-2 rounded-full bg-[#00c53d]"></span>
                  <span className="font-extrabold text-[#00c53d] text-base">careem</span>
                </div>
                {/* Samsung */}
                <div className="font-extrabold text-slate-900 text-base tracking-widest uppercase font-sans">
                  SAMSUNG
                </div>
                {/* Prypco */}
                <div className="font-black text-slate-800 text-base tracking-tight italic uppercase">
                  PRYPCO
                </div>
                {/* Justlife */}
                <div className="font-bold text-[#00c4cf] text-base tracking-tighter flex items-center gap-0.5 lowercase">
                  <span className="text-slate-800 font-black">j</span>ustlife
                </div>
                {/* Zofeur */}
                <div className="flex flex-col items-start leading-none shrink-0">
                  <span className="font-black text-slate-800 text-sm tracking-widest uppercase">ZOFEUR</span>
                  <span className="text-[6px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">Your Car, Our Chauffeur</span>
                </div>
                
                {/* Count tag */}
                <span className="text-xs text-slate-400 font-bold shrink-0 bg-slate-200/50 px-2 py-1 rounded-md">
                  +150 UAE Brands
                </span>
              </div>
            </div>

            {/* App download badges */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Available for Instant Download:</span>
              <div className="flex flex-wrap gap-3">
                {/* App store */}
                <div className="bg-black text-white hover:bg-slate-900 px-3.5 py-1.5 rounded-xl flex items-center gap-2 border border-slate-800 cursor-pointer shadow-xs transition-colors shrink-0">
                  <Download size={16} className="text-white" />
                  <div className="text-left leading-none">
                    <p className="text-[7px] text-slate-400 uppercase font-bold">Download on the</p>
                    <p className="text-[10px] text-white font-extrabold mt-0.5">App Store</p>
                  </div>
                </div>

                {/* Google Play */}
                <div className="bg-black text-white hover:bg-slate-900 px-3.5 py-1.5 rounded-xl flex items-center gap-2 border border-slate-800 cursor-pointer shadow-xs transition-colors shrink-0">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M5 3.25c-.28 0-.53.11-.72.29l10.38 10.38 3.51-3.51L5.22 3.44c-.06-.03-.14-.06-.22-.06v-.13zm-1.63.94c-.07.21-.12.45-.12.72v14.18c0 .27.05.51.12.72l7.73-7.73-7.73-7.89zm8.79 6.83l-1.92 1.92 1.92 1.92 4.41-2.43c.27-.15.42-.42.42-.72s-.15-.57-.42-.72l-4.41-1.99zM5 20.75c.08 0 .16-.03.22-.06l12.95-6.97-3.51-3.51L4.28 20.47c.19.18.44.28.72.28z"/></svg>
                  <div className="text-left leading-none">
                    <p className="text-[7px] text-slate-400 uppercase font-bold">Get it on</p>
                    <p className="text-[10px] text-white font-extrabold mt-0.5">Google Play</p>
                  </div>
                </div>

                {/* AppGallery */}
                <div className="bg-black text-white hover:bg-slate-900 px-3.5 py-1.5 rounded-xl flex items-center gap-2 border border-slate-800 cursor-pointer shadow-xs transition-colors shrink-0">
                  <Smartphone size={16} className="text-[#ea4335]" />
                  <div className="text-left leading-none">
                    <p className="text-[7px] text-slate-400 uppercase font-bold">Explore it on</p>
                    <p className="text-[10px] text-white font-extrabold mt-0.5">AppGallery</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Kris Fade Testimonial block (Exactly from Image 5 & 6 Style) */}
        <div className="mt-16 relative overflow-hidden bg-white border border-slate-200/80 rounded-3xl shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row items-stretch justify-between">
          {/* Decorative side accent */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-900"></div>

          {/* Review Quote Section */}
          <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center space-y-4 text-left">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={15} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            
            <blockquote className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed italic relative">
              <span className="text-3xl text-blue-200 font-serif absolute -top-4 -left-3">“</span>
              <p className="relative z-10">
                For me, Alfred and InsuranceMarket.ae represent trust in the UAE. Their long-standing commitment and consistency make them the brand people turn to when they want service they can count on.
              </p>
            </blockquote>

            <div>
              <p className="text-sm font-black text-slate-900 leading-none">Kris Fade</p>
              <p className="text-[10px] font-black tracking-wider text-slate-400 uppercase mt-1">Brand Ambassador</p>
            </div>
          </div>

          {/* Kris Fade Mascot Graphics Overlay Section */}
          <div className="w-full md:w-80 bg-gradient-to-br from-slate-100 to-slate-50 relative overflow-hidden flex items-end justify-center border-t md:border-t-0 md:border-l border-slate-200 shrink-0 h-48 md:h-auto min-h-[160px]">
            {/* Ambient Background graphic elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 blur-xl rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-400/10 blur-md rounded-full"></div>

            {/* Kris Fade (stylized avatar graphic) & Alfred side-by-side (Image 6 style) */}
            <div className="flex items-end justify-center gap-2 relative z-10 w-full h-full px-6">
              
              {/* Kris Fade Avatar */}
              <div className="w-24 h-36 flex flex-col items-center justify-end relative">
                {/* Stylized Kris Fade SVG */}
                <svg viewBox="0 0 100 150" className="w-full h-full">
                  {/* Suit */}
                  <path d="M 15,115 C 15,95 25,90 50,90 C 75,90 85,95 85,115 L 87,150 L 13,150 Z" fill="#475569" />
                  
                  {/* Black Shirt */}
                  <polygon points="40,90 50,110 60,90" fill="#0f172a" />
                  
                  {/* Face & Neck */}
                  <rect x="42" y="78" width="16" height="15" rx="3" fill="#dfc09f" />
                  <circle cx="50" cy="58" r="24" fill="#dfc09f" />
                  
                  {/* Hair & Fade (pompadour beard look) */}
                  <path d="M 28,58 Q 28,34 50,34 Q 72,34 72,58 Q 66,38 50,38 Q 34,38 28,58 Z" fill="#1e293b" />
                  {/* Beard outline */}
                  <path d="M 28,54 Q 28,78 50,82 Q 72,78 72,54 Q 68,64 64,66 Q 50,72 36,66 Q 32,64 28,54 Z" fill="#0f172a" />
                  {/* Sharp Mustache */}
                  <path d="M 40,68 Q 50,65 60,68 Q 50,71 40,68" fill="#0f172a" />

                  {/* Eyebrows */}
                  <path d="M 33,48 Q 40,44 45,47" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 67,48 Q 60,44 55,47" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Dark eyes */}
                  <circle cx="40" cy="52" r="3" fill="#0f172a" />
                  <circle cx="60" cy="52" r="3" fill="#0f172a" />

                  {/* Nose */}
                  <ellipse cx="50" cy="58" rx="4" ry="2.5" fill="#ca8a04" />

                  {/* Friendly smile */}
                  <path d="M 42,65 Q 50,74 58,65" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 42,65 Q 50,74 58,65 Z" fill="#ffffff" />
                </svg>
              </div>

              {/* Alfred (Mascot Avatar) */}
              <div className="w-20 h-32 flex flex-col items-center justify-end relative">
                <svg viewBox="0 0 100 150" className="w-full h-full">
                  {/* Suit */}
                  <path d="M 15,100 C 15,85 25,80 50,80 C 75,80 85,85 85,100 L 87,150 L 13,150 Z" fill="#1e293b" />
                  {/* White collar */}
                  <polygon points="40,80 50,95 60,80 50,82" fill="#ffffff" />
                  <polygon points="42,80 50,87 58,80" fill="#ffffff" />
                  {/* Blue tie */}
                  <polygon points="48,85 52,85 54,105 50,110 46,105" fill="#0284c7" />

                  {/* Face & Neck */}
                  <rect x="43" y="68" width="14" height="15" rx="3" fill="#fed7aa" />
                  <circle cx="50" cy="50" r="23" fill="#fed7aa" />
                  
                  {/* Side black hair */}
                  <path d="M 27,50 C 27,40 33,35 40,33 Q 35,42 32,51 Z" fill="#0f172a" />
                  <path d="M 73,50 C 73,40 67,35 60,33 Q 65,42 68,51 Z" fill="#0f172a" />

                  {/* Glasses */}
                  <circle cx="39" cy="46" r="11" fill="none" stroke="#0f172a" strokeWidth="3.5" />
                  <circle cx="61" cy="46" r="11" fill="none" stroke="#0f172a" strokeWidth="3.5" />
                  <line x1="49" y1="46" x2="51" y2="46" stroke="#0f172a" strokeWidth="3.5" />
                  
                  {/* Eyes */}
                  <circle cx="39" cy="46" r="3" fill="#0284c7" />
                  <circle cx="61" cy="46" r="3" fill="#0284c7" />

                  {/* Smile */}
                  <path d="M 38,58 Q 50,68 62,58" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 38,58 Q 50,68 62,58 Z" fill="#ffffff" />

                  {/* Nose */}
                  <ellipse cx="50" cy="52" rx="5" ry="3.5" fill="#fda4af" />
                </svg>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
