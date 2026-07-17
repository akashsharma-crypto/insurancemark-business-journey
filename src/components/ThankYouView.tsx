import React, { useState } from "react";
import { InsuranceProduct, LeadFormState } from "../types";
import { PRODUCT_DETAILS_MAP } from "../data/products";
import { getActivityRecommendations } from "./QuoteFormView";
import { JourneyStepper } from "./JourneyStepper";
import {
  CheckCircle, ArrowRight, Phone, Mail,
  Plus, ThumbsUp
} from "lucide-react";

interface ThankYouViewProps {
  refId: string;
  lead: LeadFormState;
  onSeeOtherInsurance: () => void;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({
  refId,
  lead,
  onSeeOtherInsurance
}) => {
  const [addedRecommended, setAddedRecommended] = useState<InsuranceProduct[]>([]);

  // Get recommendations based on businessActivity
  const recs = getActivityRecommendations(lead.businessActivity || "");
  // Filter out those already selected in the lead form
  const unselectedRecs = recs.filter(r => !lead.selectedProducts.includes(r));

  const handleAddQuoteRequest = (prod: InsuranceProduct) => {
    if (addedRecommended.includes(prod)) return;
    setAddedRecommended(prev => [...prev, prod]);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 sm:py-14 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Horizontal Stepper Indicator (Consistent through flow) */}
        <JourneyStepper currentStep={3} />

        {/* SECTION 1: Enquiry Received + Reference ID + Assigned Specialist */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-lg max-w-5xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">

            {/* Left: Confirmation + Reference ID */}
            <div className="p-6 sm:p-10 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center shadow-md">
                <CheckCircle size={32} className="stroke-[2.5]" />
              </div>
              <span className="bg-green-50 text-green-800 text-[10px] font-black tracking-widest uppercase px-3.5 py-1 rounded-full border border-green-100">
                Enquiry Received
              </span>

              <div className="inline-block bg-slate-50 border border-slate-200/80 rounded-2xl py-3.5 px-8 text-center shadow-xs">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Your Reference ID</p>
                <p className="text-lg font-mono font-black text-blue-900 tracking-wider mt-1.5">{refId}</p>
              </div>
            </div>

            {/* Right: Assigned Specialist */}
            <div className="p-6 sm:p-10 space-y-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Your Assigned Specialist
              </h3>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0 border-2 border-amber-300 overflow-hidden shadow-xs">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="45" r="23" fill="#fed7aa" />
                    <circle cx="41" cy="43" r="8" fill="none" stroke="#1e293b" strokeWidth="3" />
                    <circle cx="59" cy="43" r="8" fill="none" stroke="#1e293b" strokeWidth="3" />
                    <line x1="49" y1="43" x2="51" y2="43" stroke="#1e293b" strokeWidth="3" />
                    <path d="M 30,80 C 30,68 40,64 50,64 C 60,64 70,68 70,80" fill="#0f172a" />
                    <path d="M 45,56 Q 50,60 55,56" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 leading-tight">Sara Al Hamdan</h4>
                  <p className="text-[11px] font-bold text-slate-400 leading-tight mt-0.5">Senior Business Insurance Advisor</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[9px] font-black text-green-600 uppercase tracking-wider">Assigned Online</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-100">
                  <Phone size={14} className="text-blue-900 shrink-0" />
                  <span className="font-bold text-slate-800">+971 4 123 4567</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-100">
                  <Mail size={14} className="text-blue-900 shrink-0" />
                  <span className="font-semibold text-slate-700">sara.alhamdan@insurancemarket.ae</span>
                </div>
              </div>

              <a
                href="https://wa.me/97141234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white py-2.5 px-4 rounded-xl text-xs font-black text-center block transition-colors shadow-md shadow-green-500/10 cursor-pointer"
              >
                Connect on WhatsApp
              </a>
            </div>

          </div>
        </div>

        {/* SECTION 2: Covers Requested + Recommended Covers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Covers Requested */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Covers Requested ({lead.selectedProducts.length}):
              </h3>
              <div className="flex flex-wrap gap-2">
                {lead.selectedProducts.map((p) => (
                  <span key={p} className="bg-blue-50/50 border border-blue-100 text-blue-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900"></span>
                    {PRODUCT_DETAILS_MAP[p]?.title || p}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={onSeeOtherInsurance}
                className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white text-xs font-black py-3.5 px-6 rounded-xl shadow-md cursor-pointer transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <span>See other business insurance</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Recommended Covers */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-lg space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 blur-lg rounded-full"></div>

            <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest border-b border-slate-100 pb-2">
              Recommended Covers
            </h3>

            <div className="space-y-3">
              {unselectedRecs.length === 0 ? (
                <div className="text-center py-4 text-slate-400 text-xs font-bold bg-slate-50 rounded-2xl">
                  You have requested quotes for all major recommendations!
                </div>
              ) : (
                unselectedRecs.map((rec) => {
                  const info = PRODUCT_DETAILS_MAP[rec];
                  if (!info) return null;
                  const isAdded = addedRecommended.includes(rec);
                  return (
                    <div
                      key={rec}
                      onClick={() => handleAddQuoteRequest(rec)}
                      className={`border p-3.5 rounded-2xl cursor-pointer transition-all duration-150 flex items-start justify-between gap-3 group ${
                        isAdded
                          ? "bg-green-50/50 border-green-200 cursor-default"
                          : "border-slate-100 hover:border-blue-900 hover:bg-blue-50/20"
                      }`}
                    >
                      <div className="space-y-1 truncate">
                        <h4 className={`text-xs font-black leading-tight ${isAdded ? "text-green-800" : "text-slate-800 group-hover:text-blue-900"}`}>
                          {info.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-medium truncate">
                          {info.tooltip || info.shortDescription}
                        </p>
                      </div>

                      <div className="shrink-0 mt-0.5">
                        {isAdded ? (
                          <span className="bg-green-100 text-green-800 text-[8px] font-black uppercase px-2 py-1 rounded-full border border-green-200 flex items-center gap-1">
                            <ThumbsUp size={10} />
                            <span>Added</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="text-[9px] bg-blue-50 group-hover:bg-blue-900 text-blue-900 group-hover:text-white font-black px-2.5 py-1 rounded-lg border border-blue-100 group-hover:border-blue-900 transition-colors flex items-center gap-0.5"
                          >
                            <Plus size={10} />
                            <span>Add Quote</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
