import React, { useState, useEffect } from "react";
import { InsuranceProduct, LeadFormState } from "../types";
import { PRODUCT_DETAILS_MAP } from "../data/products";
import { getBusinessIcon } from "../data/businessIcons";
import { PRODUCT_CATEGORIES } from "./MultiSelectView";
import { JourneyStepper } from "./JourneyStepper";
import {
  ArrowLeft, Building2, Phone,
  User, Mail, Smartphone, Loader2, ArrowRight,
  Plus, Check, MapPin, AlignLeft, X
} from "lucide-react";

interface QuoteFormViewProps {
  preselectedProducts: InsuranceProduct[];
  onBack: () => void;
  onSubmitSuccess: (refId: string, lead: LeadFormState) => void;
}

// Popular UAE Business Activities mapped to recommendations
const POPULAR_ACTIVITIES = [
  "IT, Tech & Software Development",
  "Restaurant / Cafe / Food Business",
  "Construction, Civil & Engineering",
  "Medical Clinic / Healthcare",
  "Retail Shop / Trading / E-commerce",
  "Real Estate & Agencies",
  "Management / Business Consultancy",
  "Logistics, Shipping & Warehousing",
  "Beauty Salon / Spa",
  "General Education / Training School",
];

export const getActivityRecommendations = (activity: string): InsuranceProduct[] => {
  if (!activity) return [];
  switch (activity) {
    case "Restaurant / Cafe / Food Business":
      return [InsuranceProduct.GroupHealth, InsuranceProduct.WorkmenCompensation, InsuranceProduct.PublicLiability, InsuranceProduct.ProductLiability];
    case "IT, Tech & Software Development":
      return [InsuranceProduct.CyberSecurity, InsuranceProduct.ProfessionalIndemnity, InsuranceProduct.GroupHealth, InsuranceProduct.DirectorsOfficers];
    case "Construction, Civil & Engineering":
      return [InsuranceProduct.ContractorAllRisk, InsuranceProduct.WorkmenCompensation, InsuranceProduct.ContractorsPlant, InsuranceProduct.PublicLiability];
    case "Medical Clinic / Healthcare":
      return [InsuranceProduct.MedicalMalpractice, InsuranceProduct.GroupHealth, InsuranceProduct.WorkmenCompensation, InsuranceProduct.PublicLiability];
    case "Retail Shop / Trading / E-commerce":
      return [InsuranceProduct.Property, InsuranceProduct.PublicLiability, InsuranceProduct.FidelityGuarantee, InsuranceProduct.MoneyInsurance];
    case "Real Estate & Agencies":
      return [InsuranceProduct.ProfessionalIndemnity, InsuranceProduct.PublicLiability, InsuranceProduct.GroupHealth, InsuranceProduct.DirectorsOfficers];
    case "Management / Business Consultancy":
      return [InsuranceProduct.ProfessionalIndemnity, InsuranceProduct.PublicLiability, InsuranceProduct.GroupHealth, InsuranceProduct.DirectorsOfficers];
    case "Logistics, Shipping & Warehousing":
      return [InsuranceProduct.MarineCargo, InsuranceProduct.MotorFleet, InsuranceProduct.WorkmenCompensation, InsuranceProduct.TradeCredit];
    default:
      return [InsuranceProduct.GroupHealth, InsuranceProduct.WorkmenCompensation, InsuranceProduct.PublicLiability];
  }
};

export const QuoteFormView: React.FC<QuoteFormViewProps> = ({
  preselectedProducts,
  onBack,
  onSubmitSuccess
}) => {
  // Main form states
  const [form, setForm] = useState<LeadFormState>({
    companyName: "",
    companyLandline: "",
    tradeLicense: "",
    contactName: "",
    contactEmail: "",
    contactMobile: "",
    selectedProducts: preselectedProducts,
    emirate: "Dubai",
    businessActivity: "",
    businessDescription: ""
  });

  // UI state managers
  const [showAllProductsModal, setShowAllProductsModal] = useState(false);
  const [receivePromotions, setReceivePromotions] = useState(true);

  // Validation and submit states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Sync initial preselected products if they change
  useEffect(() => {
    setForm(prev => ({ ...prev, selectedProducts: preselectedProducts }));
  }, [preselectedProducts]);

  // Form input change handlers
  const handleInputChange = (field: keyof LeadFormState, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Toggle selected products
  const toggleProductSelection = (prod: InsuranceProduct) => {
    setForm(prev => {
      const isSelected = prev.selectedProducts.includes(prod);
      const updated = isSelected
        ? prev.selectedProducts.filter(p => p !== prod)
        : [...prev.selectedProducts, prod];
      return { ...prev, selectedProducts: updated };
    });
  };

  // Get current recommendations based on form activity state
  const currentRecommendations = getActivityRecommendations(form.businessActivity || "");
  const unselectedRecommendations = currentRecommendations.filter(
    rec => !form.selectedProducts.includes(rec)
  );

  // Validations
  const validateForm = (newErrors: Record<string, string>) => {
    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }
    if (!form.companyLandline.trim()) {
      newErrors.companyLandline = "Landline is required.";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(form.companyLandline)) {
      newErrors.companyLandline = "Please enter a valid landline number.";
    }
    if (!form.contactName.trim()) {
      newErrors.contactName = "Contact name is required.";
    }
    if (!form.contactEmail.trim()) {
      newErrors.contactEmail = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address.";
    }
    if (!form.contactMobile.trim()) {
      newErrors.contactMobile = "Mobile number is required.";
    } else if (!/^\+?[\d\s-]{9,15}$/.test(form.contactMobile)) {
      newErrors.contactMobile = "Please enter a valid UAE mobile number (+971 5x...).";
    }

    if (form.selectedProducts.length === 0) {
      newErrors.selectedProducts = "At least one insurance product must be selected.";
    }

    if (!form.businessActivity) {
      newErrors.businessActivity = "Please select the activity closest to your trade license.";
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    const isValid = validateForm(newErrors);
    setErrors(newErrors);

    if (!isValid) {
      const firstError = Object.keys(newErrors)[0];
      const element = document.getElementById(`field-${firstError}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);

    // Simulate API registration delay
    setTimeout(() => {
      setSubmitting(false);
      const generatedRefId = `OP-${Math.floor(100000 + Math.random() * 899999)}`;
      onSubmitSuccess(generatedRefId, form);
    }, 1200);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Horizontal Stepper Indicator (Consistent through flow) */}
        <JourneyStepper currentStep={1} />

        {/* Header Navigation Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to products</span>
        </button>

        {/* Single column form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">

          {/* SECTION 1: Tell Us About You And Your Business (contact + company, no search) */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <img src="/assets/alfred-mascot.png" alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Tell Us About You And Your Business
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Contact Name */}
              <div id="field-contactName" className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <span>Contact person full name</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    placeholder="e.g. Salim Al Mansoori"
                    className={`w-full bg-white border ${errors.contactName ? "border-red-400 focus:ring-red-400" : "border-slate-200 focus:ring-blue-900"} py-3 pl-10 pr-4 rounded-xl text-xs focus:outline-none focus:ring-2 font-semibold`}
                  />
                </div>
                {errors.contactName ? (
                  <p className="text-[10px] text-red-500 font-bold">{errors.contactName}</p>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium">Enter the name of the person we should speak to about your insurance</p>
                )}
              </div>

              {/* Email Address */}
              <div id="field-contactEmail" className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <span>Email address</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    placeholder="e.g. contact@firm.ae"
                    className={`w-full bg-white border ${errors.contactEmail ? "border-red-400 focus:ring-red-400" : "border-slate-200 focus:ring-blue-900"} py-3 pl-10 pr-4 rounded-xl text-xs focus:outline-none focus:ring-2 font-semibold`}
                  />
                </div>
                {errors.contactEmail ? (
                  <p className="text-[10px] text-red-500 font-bold">{errors.contactEmail}</p>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium">We will email your quotes and policy documents here</p>
                )}
              </div>

              {/* Mobile Number */}
              <div id="field-contactMobile" className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <span>Mobile number</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input
                    type="text"
                    value={form.contactMobile}
                    onChange={(e) => handleInputChange("contactMobile", e.target.value)}
                    placeholder="e.g. +971 50 123 4567"
                    className={`w-full bg-white border ${errors.contactMobile ? "border-red-400 focus:ring-red-400" : "border-slate-200 focus:ring-blue-900"} py-3 pl-10 pr-4 rounded-xl text-xs focus:outline-none focus:ring-2 font-semibold`}
                  />
                </div>
                {errors.contactMobile ? (
                  <p className="text-[10px] text-red-500 font-bold">{errors.contactMobile}</p>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium">We will only use this to discuss your quotes and policies</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Company Name */}
              <div id="field-companyName" className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <span>Company name</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Company name as per trade license"
                    className={`w-full bg-white border ${errors.companyName ? "border-red-400 focus:ring-red-400" : "border-slate-200 focus:ring-blue-900"} py-3 pl-10 pr-4 rounded-xl text-xs focus:outline-none focus:ring-2 font-semibold`}
                  />
                </div>
                {errors.companyName ? (
                  <p className="text-[10px] text-red-500 font-bold">{errors.companyName}</p>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium">Enter the full legal name as shown on your trade license</p>
                )}
              </div>

              {/* Company Landline */}
              <div id="field-companyLandline" className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <span>Company landline number</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input
                    type="text"
                    value={form.companyLandline}
                    onChange={(e) => handleInputChange("companyLandline", e.target.value)}
                    placeholder="e.g. +971 4 123 4567"
                    className={`w-full bg-white border ${errors.companyLandline ? "border-red-400 focus:ring-red-400" : "border-slate-200 focus:ring-blue-900"} py-3 pl-10 pr-4 rounded-xl text-xs focus:outline-none focus:ring-2 font-semibold`}
                  />
                </div>
                {errors.companyLandline && <p className="text-[10px] text-red-500 font-bold">{errors.companyLandline}</p>}
              </div>

              {/* Emirate on Trade License */}
              <div id="field-emirate" className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <span>Emirate on trade license</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <select
                    value={form.emirate}
                    onChange={(e) => handleInputChange("emirate", e.target.value)}
                    className="w-full bg-white border border-slate-200 py-3 pl-10 pr-4 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900 appearance-none"
                  >
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                  </select>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Select the Emirate where your company is registered on its trade license and/or main branch.</p>
              </div>
            </div>
          </div>

          {/* SECTION 2: Help Us Understand Your Business */}
          <div className="space-y-5 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-3">
              <img src="/assets/alfred-mascot.png" alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div>
                <h3 className="text-base font-black text-slate-900">Help Us Understand Your Business</h3>
                <p className="text-xs text-slate-500 font-medium">This helps us recommend suitable business insurance covers for your company.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Tell us about business description */}
              <div id="field-businessDescription" className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <span>Tell us about your business</span>
                </label>
                <div className="relative">
                  <AlignLeft className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <input
                    type="text"
                    value={form.businessDescription}
                    onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                    placeholder="Briefly describe what your business does, where you operate, and how many staff you have (e.g. IT consultancy in Dubai with 15 staff working from one office)"
                    className="w-full bg-white border border-slate-200 py-3 pl-10 pr-4 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Select Trade License Activity */}
              <div id="field-businessActivity" className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <span>Select the activity closest to your trade license</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                  <select
                    value={form.businessActivity}
                    onChange={(e) => handleInputChange("businessActivity", e.target.value)}
                    className={`w-full bg-white border ${errors.businessActivity ? "border-red-400 focus:ring-red-400" : "border-slate-200 focus:ring-blue-900"} py-3 pl-10 pr-4 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 appearance-none text-slate-800`}
                  >
                    <option value="">-- Please select the activity closest to your trade license --</option>
                    {POPULAR_ACTIVITIES.map((act) => (
                      <option key={act} value={act}>
                        {act}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.businessActivity ? (
                  <p className="text-[10px] text-red-500 font-bold">{errors.businessActivity}</p>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium">Choose the activity that best matches the description on your trade license</p>
                )}
              </div>
            </div>
          </div>

          {/* PART 4: Covers Selected + Recommendations — side by side, above the CTA */}
          <div className="border-t border-slate-100 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Covers Selected */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest">
                    Covers Selected ({form.selectedProducts.length})
                  </h3>
                  {errors.selectedProducts && (
                    <span className="text-[10px] text-red-500 font-bold">Required</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllProductsModal(true)}
                  className="w-full text-xs text-blue-900 hover:text-white font-black flex items-center justify-center gap-1.5 bg-blue-50/70 hover:bg-blue-900 py-2.5 px-4 rounded-xl border border-blue-200/50 transition-all duration-200 cursor-pointer"
                >
                  <span>+ View all products</span>
                </button>

                {form.selectedProducts.length === 0 ? (
                  <div className="text-center py-5 text-slate-400 text-xs font-semibold space-y-1 bg-white rounded-2xl border border-dashed border-slate-200">
                    <p>No covers selected.</p>
                    <p className="text-[10px] font-medium text-slate-400">Please choose from the recommendations.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {form.selectedProducts.map((p) => (
                      <div
                        key={p}
                        className="bg-white border border-blue-100 p-3 rounded-xl flex items-center justify-between group animate-in fade-in duration-100"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                            <Check size={11} className="stroke-[3]" />
                          </div>
                          <span className="text-xs font-bold text-slate-800 tracking-tight leading-tight">
                            {PRODUCT_DETAILS_MAP[p]?.title || p}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleProductSelection(p)}
                          className="text-xs font-bold text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer px-1.5 py-0.5 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommended For Your Business */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3.5 relative overflow-hidden">
                <div>
                  <span className="bg-yellow-400/10 text-yellow-800 text-[8px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-yellow-400/20 mb-1 inline-block">
                    Recommended
                  </span>
                  <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest">
                    Suited to your activity
                  </h3>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {unselectedRecommendations.length === 0 ? (
                    <div className="text-center py-5 bg-white rounded-2xl border border-slate-100">
                      <p className="text-xs text-slate-400 font-bold">You have selected all standard recommended covers!</p>
                    </div>
                  ) : (
                    unselectedRecommendations.map((rec) => {
                      const info = PRODUCT_DETAILS_MAP[rec];
                      if (!info) return null;
                      return (
                        <div
                          key={rec}
                          onClick={() => toggleProductSelection(rec)}
                          className="bg-white border border-slate-100 hover:border-blue-900 hover:bg-blue-50/20 p-3 rounded-xl cursor-pointer transition-all duration-150 flex items-start gap-3 group"
                        >
                          <div className="w-4 h-4 rounded-sm border border-slate-200 bg-white group-hover:border-blue-900 flex items-center justify-center mt-0.5 shrink-0 transition-colors">
                            <Plus size={10} className="text-slate-400 group-hover:text-blue-900 stroke-[3]" />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-black text-slate-800 group-hover:text-blue-900 transition-colors">
                              {info.title}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-medium leading-snug">
                              {info.tooltip || info.shortDescription}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Core Submit row */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={receivePromotions}
                onChange={(e) => setReceivePromotions(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 mt-0.5 text-blue-900 focus:ring-blue-900 cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-600">
                I would like to receive promotions and offers from InsuranceMarket.ae
              </span>
            </label>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full sm:w-auto font-black text-xs py-4 px-10 rounded-2xl flex items-center justify-center gap-2 transition-all duration-150 shadow-lg ${
                  submitting
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-yellow-400 hover:bg-yellow-500 text-blue-950 shadow-yellow-400/10 cursor-pointer"
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <>
                    <span>Next step</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-slate-400 font-medium text-center sm:text-right">
              By submitting this form you agree to InsuranceMarket.ae's privacy policy and terms &amp; conditions.
            </p>
          </div>

        </form>

      </div>

      {/* View All Products Modal */}
      {showAllProductsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-white border-b border-slate-100 py-4 px-6 flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-800 tracking-tight">
                  View and Select All Corporate Insurance Products
                </h2>
                <p className="text-[10px] text-slate-400 font-bold">Select any covers to add them to your commercial package.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllProductsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {PRODUCT_CATEGORIES.map((category, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="bg-blue-50 text-blue-900 font-black text-[10px] uppercase tracking-wider py-1.5 px-3.5 rounded-lg inline-block border border-blue-100">
                    {category.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {category.products.map((p) => {
                      const isSelected = form.selectedProducts.includes(p.id);
                      const details = PRODUCT_DETAILS_MAP[p.id];
                      return (
                        <div
                          key={p.id}
                          onClick={() => toggleProductSelection(p.id)}
                          className={`border rounded-2xl p-3.5 flex items-start gap-3 cursor-pointer transition-all duration-150 select-none ${
                            isSelected
                              ? "bg-blue-50/45 border-blue-900 ring-1 ring-blue-900/10 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-blue-50/60 shrink-0">
                            <img
                              src={getBusinessIcon(p.id)}
                              alt={p.label}
                              className="w-full h-full object-cover object-top"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="space-y-0.5 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-xs font-black text-slate-800 leading-tight">
                                {p.label}
                              </h4>
                              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                                isSelected ? "bg-blue-900 border-blue-900 text-white" : "border-slate-300 bg-white"
                              }`}>
                                {isSelected && <Check size={11} className="stroke-[3]" />}
                              </div>
                            </div>
                            {details?.tooltip && (
                              <p className="text-[10px] text-slate-400 font-medium leading-tight">
                                {details.tooltip}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-100 py-4 px-6 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Selected <span className="text-blue-900 font-extrabold">{form.selectedProducts.length}</span> corporate cover{form.selectedProducts.length !== 1 ? "s" : ""}
              </span>
              <button
                type="button"
                onClick={() => setShowAllProductsModal(false)}
                className="bg-blue-900 hover:bg-blue-950 text-white font-black text-xs py-2.5 px-6 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
