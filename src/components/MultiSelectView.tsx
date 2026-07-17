import React, { useState } from "react";
import { InsuranceProduct } from "../types";
import { X, HelpCircle, Check, Trash2 } from "lucide-react";
import { getBusinessIcon } from "../data/businessIcons";

interface MultiSelectViewProps {
  initialSelected: InsuranceProduct[];
  onBack: () => void;
  onContinue: (selected: InsuranceProduct[]) => void;
}

// Complete structured categories based on the user's specific 25 options
export const PRODUCT_CATEGORIES = [
  {
    title: "Package & Property Protection",
    products: [
      { id: InsuranceProduct.SmePackage, label: "SME Package Insurance" },
      { id: InsuranceProduct.HolidayHomes, label: "Holiday Homes Insurance" },
      { id: InsuranceProduct.FireAndAllied, label: "Fire & Allied Perils" },
      { id: InsuranceProduct.PropertyAllRisk, label: "Property All Risk" },
      { id: InsuranceProduct.PropertyAllRiskBI, label: "Property All Risk + Business Interruption" },
      { id: InsuranceProduct.BusinessInterruption, label: "Business Interruption Insurance" }
    ]
  },
  {
    title: "Liability Defense",
    products: [
      { id: InsuranceProduct.PublicLiabilitySelect, label: "Public Liability" },
      { id: InsuranceProduct.ProductLiabilitySelect, label: "Product Liability" },
      { id: InsuranceProduct.ProfessionalIndemnitySelect, label: "Professional Indemnity" },
      { id: InsuranceProduct.MedicalMalpracticeSelect, label: "Medical Malpractice" },
      { id: InsuranceProduct.DirectorsOfficersSelect, label: "Directors & Officers Liability" },
      { id: InsuranceProduct.CommercialGeneralLiability, label: "Commercial General Liability" }
    ]
  },
  {
    title: "Risk & Specialized Coverage",
    products: [
      { id: InsuranceProduct.CyberRisk, label: "Cyber Risk Insurance" },
      { id: InsuranceProduct.CommercialCrime, label: "Commercial Crime Insurance" },
      { id: InsuranceProduct.EventInsurance, label: "Event Insurance" },
      { id: InsuranceProduct.DroneInsurance, label: "Drone Insurance" }
    ]
  },
  {
    title: "Engineering & Construction",
    products: [
      { id: InsuranceProduct.ContractorAllRiskSelect, label: "Contractor's All Risk" },
      { id: InsuranceProduct.ErectionAllRiskSelect, label: "Erection All Risk" },
      { id: InsuranceProduct.MachineryBreakdownSelect, label: "Machinery Breakdown" },
      { id: InsuranceProduct.ContractorsPlantSelect, label: "Contractors Plant & Machinery" }
    ]
  },
  {
    title: "Marine & Yacht",
    products: [
      { id: InsuranceProduct.Marine, label: "Marine Insurance" },
      { id: InsuranceProduct.Yacht, label: "Yacht Insurance" }
    ]
  },
  {
    title: "Employee & Group Covers",
    products: [
      { id: InsuranceProduct.WorkmenCompensationSelect, label: "Workmen Compensation" },
      { id: InsuranceProduct.GroupTravelSelect, label: "Group Travel" },
      { id: InsuranceProduct.PoliticalViolenceSelect, label: "Political Violence" }
    ]
  }
];

export const MultiSelectView: React.FC<MultiSelectViewProps> = ({
  initialSelected,
  onBack,
  onContinue
}) => {
  const [selected, setSelected] = useState<InsuranceProduct[]>(initialSelected);

  const toggleProduct = (prod: InsuranceProduct) => {
    setSelected(prev =>
      prev.includes(prod) ? prev.filter(p => p !== prod) : [...prev, prod]
    );
  };

  const handleClear = () => {
    setSelected([]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-[#f8fafc] rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in duration-300">
      
      {/* Header Modal Bar */}
      <div className="bg-white border-b border-slate-100 py-5 px-6 sm:px-8 flex items-center justify-between">
        <h2 id="modal-title" className="text-base sm:text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
          <span>Click To Select Multiple Business Insurance Products</span>
        </h2>
        <button
          onClick={onBack}
          aria-label="Close panel"
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Container of Products */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10">
        
        {PRODUCT_CATEGORIES.map((category, catIdx) => (
          <div key={catIdx} className="space-y-4">
            {/* Category Header Bar */}
            <div className="bg-[#eff6ff] border border-[#dbeafe] text-blue-900 font-extrabold text-xs py-2 px-4 rounded-xl inline-block shadow-sm">
              {category.title}
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {category.products.map((p) => {
                const isChecked = selected.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => toggleProduct(p.id)}
                    className={`relative bg-white border rounded-2xl p-4 flex flex-col items-center justify-between text-center cursor-pointer select-none transition-all duration-200 group hover:-translate-y-0.5 ${
                      isChecked
                        ? "border-blue-800 ring-2 ring-blue-900/10 shadow-md scale-[1.01]"
                        : "border-slate-100 hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    {/* Checkbox selector inside card (Upper right) */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <div
                        className={`w-4.5 h-4.5 rounded-sm border flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-blue-800 border-blue-800 text-white"
                            : "border-slate-200 bg-white group-hover:border-slate-300"
                        }`}
                      >
                        {isChecked && <Check size={11} className="stroke-[3]" />}
                      </div>
                    </div>

                    {/* Alfred Illustration */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 shrink-0 rounded-xl overflow-hidden bg-blue-50/60">
                      <img
                        src={getBusinessIcon(p.id)}
                        alt={p.label}
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Product Label with caret */}
                    <div className="flex items-center justify-center gap-1 w-full px-1">
                      <span className="text-[11px] font-black text-blue-900 group-hover:text-blue-800 transition-colors border-b border-dashed border-blue-900/30 leading-snug">
                        {p.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="bg-white border-t border-slate-100 py-5 px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-inner">
        
        {/* Selection Status */}
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-500">
            You have selected <span className="text-blue-900 font-extrabold">{selected.length}</span> covers
          </p>
          <p className="text-[11px] text-slate-400">
            {selected.length === 0
              ? "No covers selected yet â€“ please choose one or more from the options above"
              : "Ready to proceed with your selected business covers"}
          </p>
        </div>

        {/* Form CTA Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {selected.length > 0 && (
            <button
              onClick={handleClear}
              className="flex-1 sm:flex-none border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-500 hover:text-red-600 font-bold text-xs py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 size={14} />
              <span>Clear</span>
            </button>
          )}

          <button
            disabled={selected.length === 0}
            onClick={() => onContinue(selected)}
            className={`flex-1 sm:flex-none font-black text-xs py-3.5 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all duration-150 shadow-md ${
              selected.length === 0
                ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                : "bg-yellow-400 hover:bg-yellow-500 text-blue-950 shadow-yellow-400/10 cursor-pointer"
            }`}
          >
            <span>Continue to Quote Form</span>
          </button>
        </div>

      </div>
    </div>
  );
};
