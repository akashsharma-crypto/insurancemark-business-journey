import React, { useState } from "react";
import { InsuranceProduct, LeadFormState } from "../types";
import { JourneyStepper } from "./JourneyStepper";
import {
  ArrowLeft, ArrowRight, MapPin, Plus, Trash2, DollarSign, Users, ChevronUp, ChevronDown, ShieldCheck
} from "lucide-react";

interface ProceedOptionsViewProps {
  lead: LeadFormState;
  onBack: () => void;
  onSelectOnlineFill?: () => void;
  onCompleteFlow: (meetingDetails?: string, uploadedFiles?: string[]) => void;
}

const OCCUPANCY_OPTIONS = [
  "Office",
  "Retail Shop",
  "Warehouse / Storage",
  "Restaurant / Café",
  "Clinic / Medical",
  "Showroom",
  "Factory / Workshop",
  "Salon / Spa",
  "School / Educare",
  "Other",
];

const TURNOVER_OPTIONS = [
  "Under AED 1M",
  "AED 1M – 5M",
  "AED 5M – 10M",
  "AED 10M – 25M",
  "AED 25M – 50M",
  "Over AED 50M",
];

interface BusinessLocation {
  id: string;
  occupancy: string;
  address: string;
}

/**
 * Step 2 — Coverage Details.
 * Collects the shared risk information (where the business operates, turnover,
 * and headcount) that applies across every selected cover, then continues to the
 * per-cover proposal forms on Step 3 (Application Form).
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

  const [locationOpen, setLocationOpen] = useState(true);
  const [locations, setLocations] = useState<BusinessLocation[]>([
    { id: "1", occupancy: "", address: lead.verifiedCompany?.address || "" },
  ]);
  const [annualTurnover, setAnnualTurnover] = useState("");
  const [totalEmployees, setTotalEmployees] = useState("");

  const addLocation = () =>
    setLocations((prev) => [...prev, { id: String(Date.now()), occupancy: "", address: "" }]);

  const removeLocation = (id: string) =>
    setLocations((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev));

  const updateLocation = (id: string, key: keyof BusinessLocation, value: string) =>
    setLocations((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l)));

  const handleContinue = () => {
    if (onSelectOnlineFill) onSelectOnlineFill();
  };

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

        {/* Selected coverages chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Covers selected:</span>
          {selectedProducts.map((p) => (
            <span key={p} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 text-[11px] font-black text-slate-700">
              <ShieldCheck size={12} className="text-blue-900" />
              {p}
            </span>
          ))}
        </div>

        {/* Page Titles */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Tell Us Where Is Your Business Located
          </h1>
          <p className="text-slate-500 text-sm">
            These details apply across all your selected covers and affect your cover and premium.
          </p>
        </div>

        {/* Location accordion */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setLocationOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-3 px-6 py-4 bg-blue-50/60 text-left cursor-pointer"
          >
            <span className="flex items-center gap-2 text-sm font-black text-slate-800">
              <MapPin size={16} className="text-blue-900" />
              Location
            </span>
            {locationOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
          </button>

          {locationOpen && (
            <div className="p-6 space-y-5 animate-in fade-in duration-150">
              {locations.map((loc, idx) => (
                <div key={loc.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <select
                      value={loc.occupancy}
                      onChange={(e) => updateLocation(loc.id, "occupancy", e.target.value)}
                      className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold outline-none text-slate-800 focus:border-blue-950"
                    >
                      <option value="">Type of occupancy</option>
                      {OCCUPANCY_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-400 leading-snug">
                      Select how you use this location (e.g. office, warehouse, retail shop, restaurant)
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={loc.address}
                        onChange={(e) => updateLocation(loc.id, "address", e.target.value)}
                        placeholder="Full address (e.g. office no., building, street, area, PO Box, emirate, UAE)"
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold outline-none text-slate-800 focus:border-blue-950"
                      />
                      {locations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLocation(loc.id)}
                          className="shrink-0 w-10 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 flex items-center justify-center cursor-pointer"
                          aria-label="Remove location"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">
                      Please enter the exact insured location – this affects your cover and premium.
                    </p>
                  </div>
                  {idx < locations.length - 1 && <div className="md:col-span-2 border-b border-slate-100" />}
                </div>
              ))}

              <button
                type="button"
                onClick={addLocation}
                className="inline-flex items-center gap-2 border-2 border-yellow-400 text-blue-950 hover:bg-yellow-50 font-black text-xs py-2.5 px-4 rounded-xl cursor-pointer transition-colors"
              >
                <Plus size={14} />
                Add location
              </button>
              <p className="text-[10px] text-slate-400">
                Add each insured location where you operate (branches, outlets, warehouses, etc.)
              </p>
            </div>
          )}
        </div>

        {/* Turnover + employees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2">
            <label className="flex items-center gap-2 text-xs font-black text-slate-700">
              <DollarSign size={14} className="text-blue-900" />
              Annual turnover
            </label>
            <select
              value={annualTurnover}
              onChange={(e) => setAnnualTurnover(e.target.value)}
              className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold outline-none text-slate-800 focus:border-blue-950"
            >
              <option value="">Select annual turnover</option>
              {TURNOVER_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400 leading-snug">
              Use your latest 12-month turnover figure in AED, including all UAE branches.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2">
            <label className="flex items-center gap-2 text-xs font-black text-slate-700">
              <Users size={14} className="text-blue-900" />
              Total number of employees
            </label>
            <input
              type="number"
              min={0}
              value={totalEmployees}
              onChange={(e) => setTotalEmployees(e.target.value)}
              placeholder="e.g. 25"
              className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold outline-none text-slate-800 focus:border-blue-950"
            />
            <p className="text-[10px] text-slate-400 leading-snug">
              Include all employees on your UAE payroll (full-time and part-time). Exclude contractors and freelancers.
            </p>
          </div>
        </div>

        {/* Continue */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black text-sm py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-yellow-400/20 cursor-pointer transition-colors"
          >
            <span>Save and continue</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
