import React from "react";
import { InsuranceProduct, LeadFormState } from "../types";
import { JourneyStepper } from "./JourneyStepper";
import {
  ArrowLeft, ArrowRight, ShieldCheck, Check, Building2, User, Mail, Phone, MapPin
} from "lucide-react";

interface ProceedOptionsViewProps {
  lead: LeadFormState;
  onBack: () => void;
  onSelectOnlineFill?: () => void;
  onCompleteFlow: (meetingDetails?: string, uploadedFiles?: string[]) => void;
}

/**
 * Step 2 — Coverage Details.
 * A light confirmation screen: the applicant reviews the coverages they selected
 * (and their business/contact summary) and then continues to Step 3 (Application
 * Form) where the detailed per-cover underwriting forms are completed.
 */
export const ProceedOptionsView: React.FC<ProceedOptionsViewProps> = ({
  lead,
  onBack,
  onSelectOnlineFill,
}) => {
  const selectedProducts =
    lead.selectedProducts && lead.selectedProducts.length > 0
      ? lead.selectedProducts
      : [InsuranceProduct.BusinessInsurance];

  const summaryItems = [
    { icon: Building2, label: "Company", value: lead.companyName },
    { icon: User, label: "Contact", value: lead.contactName },
    { icon: Mail, label: "Email", value: lead.contactEmail },
    { icon: Phone, label: "Mobile", value: lead.contactMobile },
    { icon: MapPin, label: "Emirate", value: lead.emirate },
  ].filter((i) => !!i.value);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 sm:py-14 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Horizontal Stepper Indicator (Consistent through flow) */}
        <JourneyStepper currentStep={2} />

        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Edit business &amp; contact details</span>
        </button>

        {/* Page Titles */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <ShieldCheck className="text-blue-900" size={28} />
            Your Coverage Details
          </h1>
          <p className="text-slate-500 text-sm">
            Here are the coverages you selected. Review them below, then continue to complete your application.
          </p>
        </div>

        {/* Selected Coverages */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm p-6 sm:p-8 space-y-5 text-left">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
            Your Selected Insurance Coverages
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedProducts.map((p) => (
              <div
                key={p}
                className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5"
              >
                <span className="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </span>
                <span className="text-xs font-black text-slate-800 flex-1">{p}</span>
                <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0">
                  <Check size={11} className="stroke-[3]" />
                </span>
              </div>
            ))}
          </div>

          {/* Business & Contact Summary */}
          {summaryItems.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Business &amp; Contact Summary
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {summaryItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <item.icon size={14} className="text-slate-400 shrink-0" />
                    <span className="text-[11px] font-bold text-slate-400 w-16 shrink-0">{item.label}</span>
                    <span className="text-xs font-black text-slate-800 truncate">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Continue */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400 font-semibold">
            You'll fill the detailed proposal for each cover on the next step.
          </p>
          <button
            type="button"
            onClick={() => onSelectOnlineFill?.()}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-sm py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-yellow-400/20 cursor-pointer transition-colors"
          >
            <span>Continue to Application Form</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
