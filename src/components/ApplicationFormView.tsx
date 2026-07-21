import React, { useState } from "react";
import { InsuranceProduct, LeadFormState } from "../types";
import {
  ArrowLeft, CheckCircle, FileText, ChevronRight, Check, Sparkles, Building2,
  MapPin, AlertCircle, FileDown, UploadCloud, Loader2, DollarSign, Users, Award,
  Shield, Landmark, HelpCircle, Map, Trash2, Calendar, Plus, Image as ImageIcon
} from "lucide-react";

interface ApplicationFormViewProps {
  lead: LeadFormState;
  onBack: () => void;
  onCompleteFlow: (formType: string, submittedData: any) => void;
}

// Public Liability: occupancy classifications and geographical cover options
const PL_OCCUPANCY_OPTIONS = [
  "Office - Building Location",
  "Office - Warehouse Location",
  "Clinics",
  "Restaurant - Alcohol, Shisha, BBQ",
  "Retail Shop (Excludes Jewelry)",
  "Salon/Barbershop",
  "Warehouse - Direct Referral",
  "Educational Centers",
  "Kiosk (Indoor)",
  "Kiosk (Outdoor)",
  "Others"
];

const PL_GEOGRAPHICAL_LIMITS = ["UAE", "GCC", "Worldwide excl. US and Canada", "Worldwide inc. US & Canada"];

interface PLLocation {
  id: string;
  address: string;
  limitOfIndemnity: string;
  occupancy: string;
  occupancyOtherDetails: string;
  claimsHistoryLast5Years: "yes" | "no";
  claimsDetails: string;
}

const createEmptyPLLocation = (id: string): PLLocation => ({
  id,
  address: "",
  limitOfIndemnity: "",
  occupancy: "Office - Building Location",
  occupancyOtherDetails: "",
  claimsHistoryLast5Years: "no",
  claimsDetails: ""
});

export const ApplicationFormView: React.FC<ApplicationFormViewProps> = ({
  lead,
  onBack,
  onCompleteFlow
}) => {
  // Determine default form type based on selected products
  const [selectedFormType, setSelectedFormType] = useState<"SME" | "PL" | "DO" | "Offline">("SME");
  const [activeTab, setActiveTab] = useState<number>(1);

  // SME Form is always displayed as the primary underwriting form on the screen.
  // Standalone Public Liability (PL) and Directors & Officers (D&O) can be toggled as supplementary sections.
  const [showPLForm, setShowPLForm] = useState(() => {
    const prods = lead.selectedProducts || [];
    return prods.includes(InsuranceProduct.PublicLiability) || prods.includes(InsuranceProduct.PublicLiabilitySelect);
  });
  const [showDOForm, setShowDOForm] = useState(() => {
    const prods = lead.selectedProducts || [];
    return prods.includes(InsuranceProduct.DirectorsOfficers) || prods.includes(InsuranceProduct.DirectorsOfficersSelect);
  });
  const [showOfflineUpload, setShowOfflineUpload] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const vc = lead.verifiedCompany;

  // Track which fields are auto-filled
  const isFieldAutoFilled = (fieldName: string) => {
    if (fieldName === "companyName") return !!lead.companyName;
    if (fieldName === "tradeLicense") return !!lead.tradeLicense;
    if (fieldName === "emirate" || fieldName === "city") return !!lead.emirate;
    if (fieldName === "address" || fieldName === "officeAddress") return !!vc?.address;
    if (fieldName === "natureOfBusiness" || fieldName === "operationsDescription") return !!(lead.businessDescription || lead.businessActivity || (vc?.activities && vc.activities.length > 0));
    if (fieldName === "proposerName") return !!lead.contactName;
    return false;
  };

  // Helper component to render an auto-fill indicator badge
  const AutoFillBadge = () => (
    <span className="inline-flex items-center gap-1 bg-green-50 text-[9px] text-green-700 font-bold px-1.5 py-0.5 rounded border border-green-200">
      <Sparkles size={8} className="fill-green-700/10" />
      <span>Auto-filled</span>
    </span>
  );

  // Form State 1: SME Multi-cover Package Form
  const [smeForm, setSmeForm] = useState(() => {
    return {
      productType: "", // blank, do not assume
      companyName: lead.companyName || "",
      natureOfBusiness: lead.businessDescription || lead.businessActivity || (vc?.activities && vc.activities.join(", ")) || "",
      address: vc?.address || "",
      city: lead.emirate || "",
      poBox: "",
      area: "",

      // Assets (Property All Risks)
      buildingSumInsured: "",
      contentsSumInsured: "",
      stockInTradeSumInsured: "",
      fixedEquipmentSumInsured: "",
      portableEquipmentSumInsured: "",
      medicalEquipmentSumInsured: "",
      breakageGlassSumInsured: "",

      // Profits (Business Continuity)
      annualGrossProfit: "",
      annualRent: "",
      increasedCostOfWorking: "",

      // Liability (Public Liability)
      publicLiabilityLimit: "",
      publicLiabilityOtherLimit: "",
      numberOfStudents: "",
      hasStudents: "",

      // Employees (Workmen's compensation)
      employeesAdminCount: "",
      employeesAdminSalaries: "",
      employeesManualCount: "",
      employeesManualSalaries: "",
      employersLiabilityLimit: "",
      is24HrPersonalAccidentRequired: "",

      // Cash (Money)
      cashClosedSafe: "",
      cashClosedNotSafe: "",
      cashOpenAttended: "",
      cashSafeLossDamage: "",
      cashInDwelling: "",
      cashTransitAnnualCarrying: "",
      cashTransitLimitPerCarrying: "",

      // Additional Covers - Equipment Breakdown
      equipBreakdownFixed: "",
      equipBreakdownPortable: "",
      equipBreakdownMedical: "",

      // Additional Covers - Personal Accident
      paEmployeesCount: "",
      paAccidentalDeath: "",
      paMedicalExpenses: "",

      // Additional Covers - Employee Dishonesty
      dishonestyEmployeesCount: "",
      dishonestyLimitPerEmployee: "",

      // Additional Covers - Inland Transit
      transitLimitPerShipment: "",
      transitAnnualShipment: "",

      // Risk Assessment - Fire Protection
      fireSprinklers: false,
      fireExtinguishers: false,
      fireHoseReel: false,
      fireAlarm: false,
      fireSmokeDetectors: false,
      fireNone: false,
      fireOther: false,
      fireOtherSpecify: "",

      // Risk Assessment - Security Measures
      securityGrills: false,
      security24Hr: false,
      securityBurglarAlarm: false,
      securityNone: false,
      securityOther: false,
      securityOtherSpecify: "",

      // Risk Details
      isWarehousingUsed: "",
      warehouseArea: "",
      warehouseStockType: "",
      warehouseMethodology: "",
      warehousePileHeight: "",
      warehouseCeilingHeight: "",

      isManufacturingEngaged: "",
      manufacturingArea: "",
      manufacturingGoodsDescription: "",
      manufacturingHotWorks: "",
      manufacturingProcessDescription: "",

      isRCCConstruction: "",
      nonRCCWalls: "",
      nonRCCRoof: "",

      buildingYearOfConstruction: "",
      buildingNumberOfFloors: "",

      surroundingLeft: "",
      surroundingRight: "",
      surroundingFront: "",
      surroundingBack: "",

      hasDeclinedProposal: "",
      hasClaimsHistory4Years: "",
      claimsHistoryDetails: "",

      // Declaration
      proposerName: lead.contactName || "",
      proposerPosition: "",
      dateCompleted: new Date().toISOString().split("T")[0],
      desiredEffectiveDate: "",

      totalLocationsCount: "",
      locationsList: [
        { address: "", city: "", area: "", nature: "", building: "", contents: "", equipment: "", stock: "", grossProfit: "", rent: "", publicLiability: "" },
        { address: "", city: "", area: "", nature: "", building: "", contents: "", equipment: "", stock: "", grossProfit: "", rent: "", publicLiability: "" },
        { address: "", city: "", area: "", nature: "", building: "", contents: "", equipment: "", stock: "", grossProfit: "", rent: "", publicLiability: "" },
        { address: "", city: "", area: "", nature: "", building: "", contents: "", equipment: "", stock: "", grossProfit: "", rent: "", publicLiability: "" },
        { address: "", city: "", area: "", nature: "", building: "", contents: "", equipment: "", stock: "", grossProfit: "", rent: "", publicLiability: "" }
      ],

      agreedToDeclaration: false
    };
  });

  // Calculate SME Asset Total
  const getSmeAssetTotal = () => {
    const val = (s: string) => parseFloat(s.replace(/,/g, "")) || 0;
    return (
      val(smeForm.buildingSumInsured) +
      val(smeForm.contentsSumInsured) +
      val(smeForm.stockInTradeSumInsured) +
      val(smeForm.fixedEquipmentSumInsured) +
      val(smeForm.portableEquipmentSumInsured) +
      val(smeForm.medicalEquipmentSumInsured) +
      val(smeForm.breakageGlassSumInsured)
    );
  };

  // Calculate SME Profits Total
  const getSmeProfitTotal = () => {
    const val = (s: string) => parseFloat(s.replace(/,/g, "")) || 0;
    return (
      val(smeForm.annualGrossProfit) +
      val(smeForm.annualRent) +
      val(smeForm.increasedCostOfWorking)
    );
  };

  // Form State 2: Standalone Public Liability Form
  // 5-step flow: Company Details -> Risk Locations -> Off-site & Extensions -> Uploads -> Review & Sign
  const [plForm, setPlForm] = useState(() => {
    return {
      companyName: lead.companyName || "",
      tradeLicenseNumber: lead.tradeLicense || "",
      businessDescription: lead.businessDescription || lead.businessActivity || (vc?.activities && vc.activities.join(", ")) || "",
      contactPerson: lead.contactName || "",
      contactEmail: lead.contactEmail || "",
      contactPhone: lead.contactMobile || "",

      numberOfLocations: 1,
      locations: [{ ...createEmptyPLLocation("1"), address: vc?.address || "" }] as PLLocation[],

      offsiteCoverRequired: "no" as "yes" | "no",
      offsiteLocation: "",
      offsiteLimitOfIndemnity: "",
      offsiteGeographicalLimit: "UAE",
      offsiteManualWorkEmployees: "no" as "yes" | "no",
      offsiteAnnualTurnover: "",
      offsiteTurnoverSplitDetails: "",
      offsiteEstimatedProjects: "",
      offsiteNumberOfEmployees: "",
      offsiteSubcontractedWork: "no" as "yes" | "no",
      offsiteSubcontractedServices: "",
      offsiteSubcontractedPercentage: "",

      extPropertyBeingWorkedUpon: false,
      extPropertyUnderCareCustodyControl: false,
      extPrincipalsExistingProperty: false,

      tradeLicenseFile: "",
      sitePhotos: [] as string[],

      signatureName: lead.contactName || "",
      signatureDate: new Date().toISOString().split("T")[0],

      agreedToDeclaration: false
    };
  });

  const handlePlLocationCountChange = (newNum: number) => {
    let updated = [...plForm.locations];
    if (newNum > updated.length) {
      for (let i = updated.length; i < newNum; i++) updated.push(createEmptyPLLocation((i + 1).toString()));
    } else if (newNum < updated.length) {
      updated = updated.slice(0, newNum);
    }
    setPlForm({ ...plForm, numberOfLocations: newNum, locations: updated });
  };

  const handlePlLocationChange = (index: number, key: keyof PLLocation, value: any) => {
    const updated = plForm.locations.map((loc, idx) => (idx === index ? { ...loc, [key]: value } : loc));
    setPlForm({ ...plForm, locations: updated });
  };

  const handlePlSimUpload = (type: "license" | "photo") => {
    if (type === "license") {
      setPlForm({ ...plForm, tradeLicenseFile: "Trade_License_Scan.pdf" });
    } else {
      setPlForm({ ...plForm, sitePhotos: [...plForm.sitePhotos, `Site_Photo_${plForm.sitePhotos.length + 1}.jpg`] });
    }
  };

  // Form State 3: Directors & Officers (D&O) Liability Form
  const [doForm, setDoForm] = useState(() => {
    return {
      companyName: lead.companyName || "",
      tradeLicense: lead.tradeLicense || "",
      authority: vc?.authority || "",
      incorporatedYear: vc?.issueDate ? vc.issueDate.substring(0, 4) : "",
      paidUpCapital: "",
      hasSubsidiaries: "",
      totalAssets: "",
      annualTurnover: "",
      netProfit: "",
      listedStatus: vc?.licenseType || "",
      numberOfDirectors: "",
      hasPastClaims: "",
      pastClaimsDetail: "",
      agreedToDeclaration: false
    };
  });

  // Offline upload simulator state
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [isFilledFromUpload, setIsFilledFromUpload] = useState(false);

  const handleFileUploadSim = () => {
    setUploading(true);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadedFiles(prevFiles => [...prevFiles, "Completed_Underwriting_Proposal.pdf"]);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      if (selectedFormType === "DO") {
        onCompleteFlow("Directors & Officers Liability Digital Proposal", doForm);
      } else if (selectedFormType === "SME") {
        onCompleteFlow("SME Package Digital Proposal", smeForm);
      } else if (selectedFormType === "PL") {
        onCompleteFlow("Public Liability Digital Proposal", plForm);
      } else {
        onCompleteFlow("Offline Proposal Upload", { uploadedFiles });
      }
    }, 1200);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
        
        {/* Horizontal Stepper (Steps 1 & 2 are completed, Step 3 is active) */}
        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs flex items-center justify-between overflow-x-auto max-w-4xl mx-auto">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white font-black flex items-center justify-center text-xs">
              <Check size={14} className="stroke-[3]" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-green-600 font-bold leading-none uppercase">Completed</p>
              <p className="text-xs font-black text-slate-800">Business & Contact</p>
            </div>
          </div>
          <ChevronRight className="text-slate-200 hidden sm:block shrink-0" size={16} />

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white font-black flex items-center justify-center text-xs">
              <Check size={14} className="stroke-[3]" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-green-600 font-bold leading-none uppercase">Completed</p>
              <p className="text-xs font-black text-slate-800">Coverage Details</p>
            </div>
          </div>
          <ChevronRight className="text-slate-200 hidden sm:block shrink-0" size={16} />

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-yellow-400 text-blue-950 font-black flex items-center justify-center text-xs shadow-md shadow-yellow-400/20 animate-pulse">
              3
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-bold leading-none uppercase">Step 3</p>
              <p className="text-xs font-black text-slate-800">Digital Form Filling</p>
            </div>
          </div>
          <ChevronRight className="text-slate-200 hidden sm:block shrink-0" size={16} />

          <div className="flex items-center gap-2.5 shrink-0 opacity-40">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-black flex items-center justify-center text-xs">
              4
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-bold leading-none uppercase">Step 4</p>
              <p className="text-xs font-bold text-slate-600">Confirmation</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Change submission method</span>
        </button>

        {/* Dynamic Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {selectedFormType === "SME" && "SME Proposal Form"}
            {selectedFormType === "PL" && "Public Liability Proposal Form"}
            {selectedFormType === "DO" && "Directors & Officers (D&O) Proposal Form"}
            {selectedFormType === "Offline" && "Custom Underwriting Upload"}
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Fill out your insurance details online. Available corporate data is auto-filled for your convenience, and any missing values have been left strictly blank for your accurate inputs.
          </p>
        </div>

        {/* Form Selector Tabs (Makes all forms available online) */}
        <div className="bg-slate-200/60 p-1.5 rounded-2xl max-w-3xl mx-auto flex flex-wrap gap-1 border border-slate-200">
          {[
            { id: "SME", label: "SME Package Form" },
            { id: "PL", label: "Public Liability Form" },
            { id: "DO", label: "D&O Liability Form" },
            { id: "Offline", label: "Manual Document Upload" }
          ].map((formOpt) => (
            <button
              key={formOpt.id}
              type="button"
              onClick={() => {
                setSelectedFormType(formOpt.id as any);
                setActiveTab(1);
              }}
              className={`flex-1 min-w-[130px] py-2.5 px-3 text-xs font-extrabold rounded-xl text-center transition-all cursor-pointer ${
                selectedFormType === formOpt.id
                  ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                  : "text-slate-600 hover:bg-slate-300/30 hover:text-slate-900"
              }`}
            >
              {formOpt.label}
            </button>
          ))}
        </div>

        {/* Main Interactive Form Card */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
          
          {/* Form Top Banner */}
          <div className="bg-blue-900 text-white px-6 sm:px-8 py-4 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles size={16} className="text-yellow-400 fill-yellow-400/10" />
              <div className="text-left">
                <span className="text-xs font-black block leading-none">Invest in Dubai Registry Connected</span>
                <span className="text-[10px] text-blue-200">Pre-filled values automatically synchronized & green-bordered</span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="bg-green-500/20 text-green-300 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-green-500/30">
                100% Accurate
              </span>
              <span className="bg-blue-800 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-700">
                Secure SSL
              </span>
            </div>
          </div>

          {/* ======================= FORM 1: SME PROPOSAL FORM ======================= */}
          {selectedFormType === "SME" && (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              {isFilledFromUpload && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between gap-4 text-green-900 animate-in slide-in-from-top-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-green-600 mt-1 shrink-0 animate-pulse" size={18} />
                    <div className="space-y-0.5 text-left">
                      <h4 className="text-xs font-black">AI Auto-population Completed!</h4>
                      <p className="text-[11px] text-green-700 leading-relaxed">
                        The fields below have been pre-filled directly from your uploaded SME proposal. Verify the details across all 4 sections before final submission.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFilledFromUpload(false)}
                    className="text-green-600 hover:text-green-800 text-xs font-bold shrink-0 underline"
                  >
                    Clear Accent
                  </button>
                </div>
              )}

              {/* SME Section 1: Business Details */}
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-900 flex items-center gap-2">
                    <Building2 size={16} />
                    <span>1. General Business Details</span>
                  </h3>
                </div>
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Primary Product Select</span>
                      <p className="text-xs font-black text-slate-800">SME Proposal (Office / Retail / F&B / Clinics / Educare Package)</p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Specific Product Segment</label>
                      <select
                        value={smeForm.productType}
                        onChange={(e) => setSmeForm({ ...smeForm, productType: e.target.value })}
                        className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold outline-none text-slate-800 focus:border-blue-950"
                      >
                        <option value="">-- Choose Segment (Required) --</option>
                        <option value="Office">Office</option>
                        <option value="Retail">Retail</option>
                        <option value="Food & Beverage">Food & Beverage</option>
                        <option value="Educare">Educare (Schools / Learning)</option>
                        <option value="Personal Care">Personal Care (Spas / Salons)</option>
                        <option value="Clinicare">Clinicare (Clinics / Diagnostic)</option>
                        <option value="Property Owners">Property Owners</option>
                        <option value="Employee Protector">Employee Protector</option>
                        <option value="Other">Other / Select Custom</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700">Company Name to Insure</label>
                        {isFieldAutoFilled("companyName") && <AutoFillBadge />}
                      </div>
                      <input 
                        type="text" 
                        value={smeForm.companyName} 
                        onChange={(e) => setSmeForm({ ...smeForm, companyName: e.target.value })}
                        placeholder="Company name as in trade license"
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold outline-none transition-all ${
                          isFieldAutoFilled("companyName")
                            ? "bg-green-50/20 border-2 border-green-300 text-slate-800"
                            : "bg-white border border-slate-200 text-slate-800 focus:border-blue-950"
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700">Nature of Business Activities</label>
                        {isFieldAutoFilled("natureOfBusiness") && <AutoFillBadge />}
                      </div>
                      <input 
                        type="text" 
                        value={smeForm.natureOfBusiness} 
                        onChange={(e) => setSmeForm({ ...smeForm, natureOfBusiness: e.target.value })}
                        placeholder="Describe exact business operations"
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold outline-none transition-all ${
                          isFieldAutoFilled("natureOfBusiness")
                            ? "bg-green-50/20 border-2 border-green-300 text-slate-800"
                            : "bg-white border border-slate-200 text-slate-800 focus:border-blue-950"
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700">Insured Premises Physical Address</label>
                        {isFieldAutoFilled("address") && <AutoFillBadge />}
                      </div>
                      <input 
                        type="text" 
                        value={smeForm.address} 
                        onChange={(e) => setSmeForm({ ...smeForm, address: e.target.value })}
                        placeholder="Suite/Floor, Building Name, Street name"
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold outline-none transition-all ${
                          isFieldAutoFilled("address")
                            ? "bg-green-50/20 border-2 border-green-300 text-slate-800"
                            : "bg-white border border-slate-200 text-slate-800 focus:border-blue-950"
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700">Emirate / City</label>
                        {isFieldAutoFilled("city") && <AutoFillBadge />}
                      </div>
                      <input 
                        type="text" 
                        value={smeForm.city} 
                        onChange={(e) => setSmeForm({ ...smeForm, city: e.target.value })}
                        placeholder="Dubai / Abu Dhabi / Sharjah etc."
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold outline-none transition-all ${
                          isFieldAutoFilled("city")
                            ? "bg-green-50/20 border-2 border-green-300 text-slate-800"
                            : "bg-white border border-slate-200 text-slate-800 focus:border-blue-950"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-slate-700">P.O. Box</label>
                        <input 
                          type="text" 
                          value={smeForm.poBox} 
                          onChange={(e) => setSmeForm({ ...smeForm, poBox: e.target.value })}
                          placeholder="e.g. 12345"
                          className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold outline-none focus:border-blue-950 text-slate-800" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-extrabold text-slate-700">Area</label>
                        <input 
                          type="text" 
                          value={smeForm.area} 
                          onChange={(e) => setSmeForm({ ...smeForm, area: e.target.value })}
                          placeholder="e.g. Marina / Al Quoz"
                          className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold outline-none focus:border-blue-950 text-slate-800" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SME Section 2: Core Cover Sums */}
              <div className="space-y-8 pt-6 border-t border-slate-100">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-900 flex items-center gap-2">
                    <Building2 size={16} />
                    <span>2. Core Cover Sums</span>
                  </h3>
                </div>
                <div className="space-y-8 animate-in fade-in duration-150">
                  {/* Your Assets */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-blue-950 border-b border-slate-100 pb-2 flex items-center gap-2">
                      <Building2 size={16} />
                      <span>Your Assets (Property All Risks Coverage)</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { key: "buildingSumInsured", label: "Building (AED)" },
                        { key: "contentsSumInsured", label: "Contents, Furniture, Fittings (AED)" },
                        { key: "stockInTradeSumInsured", label: "Stock in Trade (AED)" },
                        { key: "fixedEquipmentSumInsured", label: "Fixed Equipment (AED)" },
                        { key: "portableEquipmentSumInsured", label: "Portable Equipment (AED)" },
                        { key: "medicalEquipmentSumInsured", label: "Medical Equipment (AED)" },
                        { key: "breakageGlassSumInsured", label: "Breakage of Fixed Glass (AED)" }
                      ].map((item) => (
                        <div key={item.key} className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600">{item.label}</label>
                          <input 
                            type="text" 
                            value={(smeForm as any)[item.key]} 
                            onChange={(e) => setSmeForm({ ...smeForm, [item.key]: e.target.value })}
                            placeholder="0.00"
                            className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold outline-none focus:border-blue-950 text-slate-800" 
                          />
                        </div>
                      ))}
                      <div className="bg-slate-50 p-4 rounded-xl flex flex-col justify-center border border-slate-100 sm:col-span-2 md:col-span-1">
                        <span className="text-[10px] text-slate-400 font-extrabold uppercase">Calculated Asset Total</span>
                        <span className="text-md font-black text-blue-950">
                          AED {getSmeAssetTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Your Profits */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-blue-950 border-b border-slate-100 pb-2 flex items-center gap-2">
                      <Landmark size={16} />
                      <span>Your Profits (Business Continuity Coverage)</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { key: "annualGrossProfit", label: "Annual Gross Profit (AED)" },
                        { key: "annualRent", label: "Annual Rent of Premises (AED)" },
                        { key: "increasedCostOfWorking", label: "Increased Cost of Working (AED)" }
                      ].map((item) => (
                        <div key={item.key} className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600">{item.label}</label>
                          <input 
                            type="text" 
                            value={(smeForm as any)[item.key]} 
                            onChange={(e) => setSmeForm({ ...smeForm, [item.key]: e.target.value })}
                            placeholder="0.00"
                            className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold outline-none focus:border-blue-950 text-slate-800" 
                          />
                        </div>
                      ))}
                      <div className="bg-slate-50 p-4 rounded-xl flex flex-col justify-center border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-extrabold uppercase">Calculated Profits Total</span>
                        <span className="text-md font-black text-blue-950">
                          AED {getSmeProfitTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Your Liability & Employees */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Your Liability */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-blue-950 border-b border-slate-100 pb-2">Your Liability (Public Liability)</h3>
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-extrabold text-slate-700">Requested Limit of Indemnity</label>
                          <select 
                            value={smeForm.publicLiabilityLimit}
                            onChange={(e) => setSmeForm({ ...smeForm, publicLiabilityLimit: e.target.value })}
                            className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold outline-none focus:border-blue-950 text-slate-800"
                          >
                            <option value="">-- Choose Limit --</option>
                            <option value="AED 500,000">AED 500,000</option>
                            <option value="AED 1,000,000">AED 1,000,000</option>
                            <option value="AED 2,000,000">AED 2,000,000</option>
                            <option value="AED 2,500,000">AED 2,500,000</option>
                            <option value="AED 3,000,000">AED 3,000,000</option>
                            <option value="AED 4,000,000">AED 4,000,000</option>
                            <option value="AED 5,000,000">AED 5,000,000</option>
                            <option value="Other">Other (Specify below)</option>
                          </select>
                        </div>
                        {smeForm.publicLiabilityLimit === "Other" && (
                          <div className="space-y-1.5 animate-in slide-in-from-top-1">
                            <label className="text-xs font-bold text-slate-600">Please Specify Other Limit (AED)</label>
                            <input 
                              type="text" 
                              value={smeForm.publicLiabilityOtherLimit} 
                              onChange={(e) => setSmeForm({ ...smeForm, publicLiabilityOtherLimit: e.target.value })}
                              placeholder="e.g. 10,000,000"
                              className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold outline-none focus:border-blue-950 text-slate-800" 
                            />
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-600">For Learning Institutions</label>
                            <select 
                              value={smeForm.hasStudents}
                              onChange={(e) => setSmeForm({ ...smeForm, hasStudents: e.target.value })}
                              className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold outline-none focus:border-blue-950 text-slate-800"
                            >
                              <option value="">-- Apply students? --</option>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                          {smeForm.hasStudents === "Yes" && (
                            <div className="space-y-1.5 animate-in slide-in-from-left-2">
                              <label className="text-xs font-bold text-slate-600">No. of Students</label>
                              <input 
                                type="number" 
                                value={smeForm.numberOfStudents} 
                                onChange={(e) => setSmeForm({ ...smeForm, numberOfStudents: e.target.value })}
                                placeholder="Total Students"
                                className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold outline-none focus:border-blue-950 text-slate-800" 
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Workmen's Compensation */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-blue-950 border-b border-slate-100 pb-2">Your Employees (Workmen's Compensation)</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-600 uppercase">Admin / Non-Manual Count</label>
                            <input 
                              type="number" 
                              value={smeForm.employeesAdminCount} 
                              onChange={(e) => setSmeForm({ ...smeForm, employeesAdminCount: e.target.value })}
                              className="w-full bg-white border border-slate-200 py-2 px-3 rounded-xl text-xs font-bold outline-none text-slate-800" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-600 uppercase">Est. Annual Salaries (AED)</label>
                            <input 
                              type="text" 
                              value={smeForm.employeesAdminSalaries} 
                              onChange={(e) => setSmeForm({ ...smeForm, employeesAdminSalaries: e.target.value })}
                              placeholder="Total admin salaries"
                              className="w-full bg-white border border-slate-200 py-2 px-3 rounded-xl text-xs font-bold outline-none text-slate-800" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-600 uppercase">Manual Employees Count</label>
                            <input 
                              type="number" 
                              value={smeForm.employeesManualCount} 
                              onChange={(e) => setSmeForm({ ...smeForm, employeesManualCount: e.target.value })}
                              className="w-full bg-white border border-slate-200 py-2 px-3 rounded-xl text-xs font-bold outline-none text-slate-800" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-600 uppercase">Est. Annual Salaries (AED)</label>
                            <input 
                              type="text" 
                              value={smeForm.employeesManualSalaries} 
                              onChange={(e) => setSmeForm({ ...smeForm, employeesManualSalaries: e.target.value })}
                              placeholder="Total manual salaries"
                              className="w-full bg-white border border-slate-200 py-2 px-3 rounded-xl text-xs font-bold outline-none text-slate-800" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-1">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-600 uppercase">Employer's Liability Limit</label>
                            <input 
                              type="text" 
                              value={smeForm.employersLiabilityLimit} 
                              onChange={(e) => setSmeForm({ ...smeForm, employersLiabilityLimit: e.target.value })}
                              placeholder="e.g. 1,000,000"
                              className="w-full bg-white border border-slate-200 py-2 px-3 rounded-xl text-xs font-bold outline-none text-slate-800" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-600 uppercase">24Hr Personal Accident?</label>
                            <select 
                              value={smeForm.is24HrPersonalAccidentRequired}
                              onChange={(e) => setSmeForm({ ...smeForm, is24HrPersonalAccidentRequired: e.target.value })}
                              className="w-full bg-white border border-slate-200 py-2 px-3 rounded-xl text-xs font-bold outline-none text-slate-800"
                            >
                              <option value="">-- Select --</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Your Cash */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-blue-950 border-b border-slate-100 pb-2">Your Cash (Money Coverage)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">In Locked Safe (AED)</label>
                        <input type="text" value={smeForm.cashClosedSafe} onChange={(e) => setSmeForm({ ...smeForm, cashClosedSafe: e.target.value })} className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800" placeholder="Closed & Unattended" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">Not in Locked Safe (AED)</label>
                        <input type="text" value={smeForm.cashClosedNotSafe} onChange={(e) => setSmeForm({ ...smeForm, cashClosedNotSafe: e.target.value })} className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800" placeholder="Closed & Unattended" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">Open Premises (AED)</label>
                        <input type="text" value={smeForm.cashOpenAttended} onChange={(e) => setSmeForm({ ...smeForm, cashOpenAttended: e.target.value })} className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800" placeholder="Open & Attended" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">Safe Damage Limit (AED)</label>
                        <input type="text" value={smeForm.cashSafeLossDamage} onChange={(e) => setSmeForm({ ...smeForm, cashSafeLossDamage: e.target.value })} className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800" placeholder="Safe Repair/Replacement" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">In Dwelling of Insured (AED)</label>
                        <input type="text" value={smeForm.cashInDwelling} onChange={(e) => setSmeForm({ ...smeForm, cashInDwelling: e.target.value })} className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">Transit Annual carrying (AED)</label>
                        <input type="text" value={smeForm.cashTransitAnnualCarrying} onChange={(e) => setSmeForm({ ...smeForm, cashTransitAnnualCarrying: e.target.value })} className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800" />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase">Transit Limit Per carrying (AED)</label>
                        <input type="text" value={smeForm.cashTransitLimitPerCarrying} onChange={(e) => setSmeForm({ ...smeForm, cashTransitLimitPerCarrying: e.target.value })} className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SME Section 3: Additional Covers & Risks */}
              <div className="space-y-8 pt-6 border-t border-slate-100">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-900 flex items-center gap-2">
                    <Shield size={16} />
                    <span>3. Additional Covers & Risks</span>
                  </h3>
                </div>
                <div className="space-y-8 animate-in fade-in duration-150">
                  
                  {/* Additional Cover limits */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-blue-950 border-b border-slate-100 pb-2">Additional Underwriting Covers (Sum Insured/Limits)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Equipment Breakdown */}
                      <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs font-black text-slate-800 block border-b pb-1">Equipment Breakdown</p>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Fixed Equip (AED)</label>
                          <input type="text" value={smeForm.equipBreakdownFixed} onChange={(e) => setSmeForm({ ...smeForm, equipBreakdownFixed: e.target.value })} className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-bold text-slate-800" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Portable Equip (AED)</label>
                          <input type="text" value={smeForm.equipBreakdownPortable} onChange={(e) => setSmeForm({ ...smeForm, equipBreakdownPortable: e.target.value })} className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-bold text-slate-800" />
                        </div>
                      </div>

                      {/* Personal Accident */}
                      <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs font-black text-slate-800 block border-b pb-1">Personal Accident</p>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">No. of Employees</label>
                          <input type="number" value={smeForm.paEmployeesCount} onChange={(e) => setSmeForm({ ...smeForm, paEmployeesCount: e.target.value })} className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-bold text-slate-800" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Death Limit (AED)</label>
                          <input type="text" value={smeForm.paAccidentalDeath} onChange={(e) => setSmeForm({ ...smeForm, paAccidentalDeath: e.target.value })} className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-bold text-slate-800" />
                        </div>
                      </div>

                      {/* Employee Dishonesty */}
                      <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs font-black text-slate-800 block border-b pb-1">Employee Dishonesty</p>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">No. of Employees</label>
                          <input type="number" value={smeForm.dishonestyEmployeesCount} onChange={(e) => setSmeForm({ ...smeForm, dishonestyEmployeesCount: e.target.value })} className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-bold text-slate-800" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Limit per Staff (AED)</label>
                          <input type="text" value={smeForm.dishonestyLimitPerEmployee} onChange={(e) => setSmeForm({ ...smeForm, dishonestyLimitPerEmployee: e.target.value })} className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-bold text-slate-800" />
                        </div>
                      </div>

                      {/* Inland Transit */}
                      <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs font-black text-slate-800 block border-b pb-1">Inland Transit</p>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Limit / Shipment (AED)</label>
                          <input type="text" value={smeForm.transitLimitPerShipment} onChange={(e) => setSmeForm({ ...smeForm, transitLimitPerShipment: e.target.value })} className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-bold text-slate-800" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">Annual Shipment (AED)</label>
                          <input type="text" value={smeForm.transitAnnualShipment} onChange={(e) => setSmeForm({ ...smeForm, transitAnnualShipment: e.target.value })} className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-xs font-bold text-slate-800" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Protection Measures checklists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                      <p className="text-xs font-black text-blue-950 uppercase tracking-wider">Fire Protection Measures (Select all that apply)</p>
                      <div className="grid grid-cols-2 gap-3.5">
                        {[
                          { key: "fireSprinklers", label: "Sprinklers" },
                          { key: "fireExtinguishers", label: "Extinguishers" },
                          { key: "fireHoseReel", label: "Hose Reel" },
                          { key: "fireAlarm", label: "Alarm System" },
                          { key: "fireSmokeDetectors", label: "Smoke Detectors" },
                          { key: "fireNone", label: "None of these" }
                        ].map((chk) => (
                          <label key={chk.key} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={(smeForm as any)[chk.key]} 
                              onChange={(e) => setSmeForm({ ...smeForm, [chk.key]: e.target.checked })}
                              className="rounded border-slate-300 text-blue-900 focus:ring-blue-900" 
                            />
                            <span>{chk.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                      <p className="text-xs font-black text-blue-950 uppercase tracking-wider">Security Measures (Select all that apply)</p>
                      <div className="grid grid-cols-2 gap-3.5">
                        {[
                          { key: "securityGrills", label: "Grills / Roller Shutters" },
                          { key: "security24Hr", label: "24-Hour Active Security" },
                          { key: "securityBurglarAlarm", label: "Burglar Alarm" },
                          { key: "securityNone", label: "None of these" }
                        ].map((chk) => (
                          <label key={chk.key} className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={(smeForm as any)[chk.key]} 
                              onChange={(e) => setSmeForm({ ...smeForm, [chk.key]: e.target.checked })}
                              className="rounded border-slate-300 text-blue-900 focus:ring-blue-900" 
                            />
                            <span>{chk.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Warehousing and Manufacturing Details */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-blue-950 border-b border-slate-100 pb-2">Insured Risk Assessment Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Warehousing */}
                      <div className="space-y-3 p-5 rounded-2xl border border-slate-200 bg-white">
                        <label className="text-xs font-extrabold text-slate-800 block">1. Is premises used for warehousing/storage purposes?</label>
                        <select 
                          value={smeForm.isWarehousingUsed} 
                          onChange={(e) => setSmeForm({ ...smeForm, isWarehousingUsed: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-xs font-bold text-slate-800"
                        >
                          <option value="">-- Select --</option>
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                        {smeForm.isWarehousingUsed === "Yes" && (
                          <div className="space-y-2 pt-2 animate-in slide-in-from-top-2">
                            <input type="text" placeholder="Area of Warehouse sq/ft" value={smeForm.warehouseArea} onChange={(e) => setSmeForm({ ...smeForm, warehouseArea: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-lg text-xs font-semibold" />
                            <input type="text" placeholder="Type of stock stored" value={smeForm.warehouseStockType} onChange={(e) => setSmeForm({ ...smeForm, warehouseStockType: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-lg text-xs font-semibold" />
                            <input type="text" placeholder="Height of pile (meters)" value={smeForm.warehousePileHeight} onChange={(e) => setSmeForm({ ...smeForm, warehousePileHeight: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-lg text-xs font-semibold" />
                          </div>
                        )}
                      </div>

                      {/* Manufacturing */}
                      <div className="space-y-3 p-5 rounded-2xl border border-slate-200 bg-white">
                        <label className="text-xs font-extrabold text-slate-800 block">2. Is premises used for manufacturing activities?</label>
                        <select 
                          value={smeForm.isManufacturingEngaged} 
                          onChange={(e) => setSmeForm({ ...smeForm, isManufacturingEngaged: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-lg text-xs font-bold text-slate-800"
                        >
                          <option value="">-- Select --</option>
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                        {smeForm.isManufacturingEngaged === "Yes" && (
                          <div className="space-y-2 pt-2 animate-in slide-in-from-top-2">
                            <input type="text" placeholder="Area of Plant" value={smeForm.manufacturingArea} onChange={(e) => setSmeForm({ ...smeForm, manufacturingArea: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-lg text-xs font-semibold" />
                            <input type="text" placeholder="Description of goods" value={smeForm.manufacturingGoodsDescription} onChange={(e) => setSmeForm({ ...smeForm, manufacturingGoodsDescription: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-lg text-xs font-semibold" />
                            <select value={smeForm.manufacturingHotWorks} onChange={(e) => setSmeForm({ ...smeForm, manufacturingHotWorks: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-lg text-xs font-semibold">
                              <option value="">Are Hot Works involved?</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SME Section 4: Locations & Proposer Declaration */}
              <div className="space-y-8 pt-6 border-t border-slate-100">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-900 flex items-center gap-2">
                    <Map size={16} />
                    <span>4. Locations & Proposer Declaration</span>
                  </h3>
                </div>
                <div className="space-y-8 animate-in fade-in duration-150">
                  
                  {/* Additional Locations */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-blue-950 border-b border-slate-100 pb-2">Multi-Location Insurance (If more than one office/premises)</h3>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700">Total number of operational locations in UAE</label>
                      <input 
                        type="number" 
                        value={smeForm.totalLocationsCount} 
                        onChange={(e) => setSmeForm({ ...smeForm, totalLocationsCount: e.target.value })}
                        placeholder="e.g. 3"
                        className="max-w-[200px] block bg-white border border-slate-200 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800" 
                      />
                    </div>

                    {smeForm.totalLocationsCount && parseInt(smeForm.totalLocationsCount) > 1 && (
                      <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 font-extrabold text-slate-600">
                              <th className="p-3"># Location</th>
                              <th className="p-3">Full Address</th>
                              <th className="p-3">City / Emirate</th>
                              <th className="p-3">Building Value</th>
                              <th className="p-3">Contents Value</th>
                              <th className="p-3">Public Liability</th>
                            </tr>
                          </thead>
                          <tbody>
                            {smeForm.locationsList.slice(0, Math.min(5, parseInt(smeForm.totalLocationsCount) - 1)).map((row, idx) => (
                              <tr key={idx} className="border-b border-slate-100 font-semibold text-slate-800">
                                <td className="p-3 text-slate-500">Location {idx + 2}</td>
                                <td className="p-3">
                                  <input type="text" value={row.address} onChange={(e) => {
                                    const newList = [...smeForm.locationsList];
                                    newList[idx].address = e.target.value;
                                    setSmeForm({ ...smeForm, locationsList: newList });
                                  }} className="bg-white border border-slate-200 p-1 rounded-md text-xs font-medium w-48" placeholder="Address line" />
                                </td>
                                <td className="p-3">
                                  <input type="text" value={row.city} onChange={(e) => {
                                    const newList = [...smeForm.locationsList];
                                    newList[idx].city = e.target.value;
                                    setSmeForm({ ...smeForm, locationsList: newList });
                                  }} className="bg-white border border-slate-200 p-1 rounded-md text-xs font-medium w-32" placeholder="e.g. Abu Dhabi" />
                                </td>
                                <td className="p-3">
                                  <input type="text" value={row.building} onChange={(e) => {
                                    const newList = [...smeForm.locationsList];
                                    newList[idx].building = e.target.value;
                                    setSmeForm({ ...smeForm, locationsList: newList });
                                  }} className="bg-white border border-slate-200 p-1 rounded-md text-xs font-medium w-24" placeholder="AED" />
                                </td>
                                <td className="p-3">
                                  <input type="text" value={row.contents} onChange={(e) => {
                                    const newList = [...smeForm.locationsList];
                                    newList[idx].contents = e.target.value;
                                    setSmeForm({ ...smeForm, locationsList: newList });
                                  }} className="bg-white border border-slate-200 p-1 rounded-md text-xs font-medium w-24" placeholder="AED" />
                                </td>
                                <td className="p-3">
                                  <input type="text" value={row.publicLiability} onChange={(e) => {
                                    const newList = [...smeForm.locationsList];
                                    newList[idx].publicLiability = e.target.value;
                                    setSmeForm({ ...smeForm, locationsList: newList });
                                  }} className="bg-white border border-slate-200 p-1 rounded-md text-xs font-medium w-28" placeholder="AED Limit" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Proposer Declaration Signatures */}
                  <div className="space-y-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-150">
                    <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest">SME PROPOSER DECLARATION</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Authorized Proposer's Name</label>
                        <input type="text" value={smeForm.proposerName} onChange={(e) => setSmeForm({ ...smeForm, proposerName: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-xl text-xs font-bold" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Proposer's Position</label>
                        <input type="text" value={smeForm.proposerPosition} onChange={(e) => setSmeForm({ ...smeForm, proposerPosition: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-xl text-xs font-bold" placeholder="e.g. Owner / MD" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Date of Proposal</label>
                        <input type="date" value={smeForm.dateCompleted} onChange={(e) => setSmeForm({ ...smeForm, dateCompleted: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-xl text-xs font-bold" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Desired Policy Commencement</label>
                        <input type="date" value={smeForm.desiredEffectiveDate} onChange={(e) => setSmeForm({ ...smeForm, desiredEffectiveDate: e.target.value })} className="w-full bg-white border border-slate-200 p-2 rounded-xl text-xs font-bold" />
                      </div>
                    </div>

                    <div className="pt-3">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={smeForm.agreedToDeclaration}
                          onChange={(e) => setSmeForm({...smeForm, agreedToDeclaration: e.target.checked})}
                          className="w-4 h-4 rounded border-slate-300 mt-0.5 text-blue-900 focus:ring-blue-900 cursor-pointer" 
                        />
                        <span className="text-xs font-extrabold text-slate-800">
                          We confirm that all details provided in this SME Multi-Cover proposal are true and accurate. We agree that this digital submission is a legally binding proposal for insurance underwriting.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Master Submission Action */}
              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || !smeForm.agreedToDeclaration}
                  className={`font-black text-xs py-3.5 px-8 rounded-xl flex items-center gap-1.5 shadow-md ${
                    !smeForm.agreedToDeclaration || submitting
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-yellow-400 hover:bg-yellow-500 text-blue-950 shadow-yellow-400/10 cursor-pointer"
                  }`}
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Award size={14} />}
                  <span>Submit SME Insurance Application</span>
                </button>
              </div>
            </form>
          )}

          {/* ======================= FORM 2: PUBLIC LIABILITY PROPOSAL FORM ======================= */}
          {selectedFormType === "PL" && (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              {/* 5-Step Progress Tabs */}
              <div className="flex border-b border-slate-100 overflow-x-auto gap-4 scrollbar-none pb-0.5">
                {[
                  { id: 1, label: "1. Company Details" },
                  { id: 2, label: "2. Risk Locations" },
                  { id: 3, label: "3. Off-site & Extensions" },
                  { id: 4, label: "4. Uploads" },
                  { id: 5, label: "5. Review & Sign" }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={`py-3 px-1 border-b-2 font-black text-xs whitespace-nowrap cursor-pointer transition-all ${
                      activeTab === t.id
                        ? "border-blue-900 text-blue-900"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* STEP 1: Company Details */}
              {activeTab === 1 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest border-b pb-1">Company Profile</h3>
                  <p className="text-[11px] text-slate-500 -mt-3">
                    Provide your official registered corporate details to begin your Public Liability Insurance application.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700">Registered Company Name</label>
                        {isFieldAutoFilled("companyName") && <AutoFillBadge />}
                      </div>
                      <input
                        type="text"
                        value={plForm.companyName}
                        onChange={(e) => setPlForm({ ...plForm, companyName: e.target.value })}
                        placeholder="e.g. Acme Gulf Trading LLC"
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold outline-none transition-all ${
                          isFieldAutoFilled("companyName")
                            ? "bg-green-50/20 border-2 border-green-300 text-slate-800"
                            : "bg-white border border-slate-200 text-slate-800 focus:border-blue-950"
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Trade License Number</label>
                      <input
                        type="text"
                        value={plForm.tradeLicenseNumber}
                        onChange={(e) => setPlForm({ ...plForm, tradeLicenseNumber: e.target.value })}
                        placeholder="e.g. TL-123456-D"
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Primary Contact Person</label>
                      <input
                        type="text"
                        value={plForm.contactPerson}
                        onChange={(e) => setPlForm({ ...plForm, contactPerson: e.target.value })}
                        placeholder="e.g. Sarah Connor"
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Contact Email Address</label>
                      <input
                        type="email"
                        value={plForm.contactEmail}
                        onChange={(e) => setPlForm({ ...plForm, contactEmail: e.target.value })}
                        placeholder="e.g. contact@acmegulf.ae"
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Contact Phone Number</label>
                      <input
                        type="tel"
                        value={plForm.contactPhone}
                        onChange={(e) => setPlForm({ ...plForm, contactPhone: e.target.value })}
                        placeholder="e.g. +971 50 123 4567"
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700">Brief Business Operations Description</label>
                        {isFieldAutoFilled("operationsDescription") && <AutoFillBadge />}
                      </div>
                      <textarea
                        rows={3}
                        value={plForm.businessDescription}
                        onChange={(e) => setPlForm({ ...plForm, businessDescription: e.target.value })}
                        placeholder="Describe your core commercial activities, services, products sold, and general operations"
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold outline-none transition-all ${
                          isFieldAutoFilled("operationsDescription")
                            ? "bg-green-50/20 border-2 border-green-300 text-slate-800"
                            : "bg-white border border-slate-200 text-slate-800 focus:border-blue-950"
                        }`}
                      />
                      <p className="text-[10px] text-slate-400">This information assists underwriter verification of classification codes and risks.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Risk Locations */}
              {activeTab === 2 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest border-b pb-1">Location Risk Assessment</h3>
                  <p className="text-[11px] text-slate-500 -mt-3">
                    Specify risk details and limits required for each business location to be covered under the Public Liability policy.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-0.5">
                      <label className="text-xs font-black text-slate-800">Number of Locations to Cover</label>
                      <p className="text-[11px] text-slate-500">Select how many physical corporate addresses require direct coverage.</p>
                    </div>
                    <select
                      value={plForm.numberOfLocations}
                      onChange={(e) => handlePlLocationCountChange(parseInt(e.target.value, 10))}
                      className="bg-white border border-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold outline-none focus:border-blue-950 cursor-pointer w-full sm:w-48"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "Location" : "Locations"}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-6">
                    {plForm.locations.map((loc, idx) => (
                      <div key={loc.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-200 text-slate-700 text-[10px] font-black">{idx + 1}</span>
                            Location Details
                          </span>
                          {plForm.numberOfLocations > 1 && (
                            <button
                              type="button"
                              onClick={() => handlePlLocationCountChange(plForm.numberOfLocations - 1)}
                              className="text-slate-400 hover:text-rose-500 flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>

                        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[11px] font-extrabold text-slate-700">Full Physical Address</label>
                            <input
                              type="text"
                              value={loc.address}
                              onChange={(e) => handlePlLocationChange(idx, "address", e.target.value)}
                              placeholder="e.g. Unit 401, Level 4, Business Tower, Downtown, Dubai, UAE"
                              className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1.5">
                              <DollarSign size={13} className="text-slate-400" /> Limit of Indemnity Required (AED)
                            </label>
                            <input
                              type="text"
                              value={loc.limitOfIndemnity}
                              onChange={(e) => {
                                const clean = e.target.value.replace(/[^0-9]/g, "");
                                const formatted = clean ? Number(clean).toLocaleString("en-US") : "";
                                handlePlLocationChange(idx, "limitOfIndemnity", formatted);
                              }}
                              placeholder="e.g. 5,000,000"
                              className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950"
                            />
                            <p className="text-[10px] text-slate-400">Typical limits: 1,000,000 to 10,000,000 AED per location</p>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-extrabold text-slate-700">Location Occupancy Type</label>
                            <select
                              value={loc.occupancy}
                              onChange={(e) => handlePlLocationChange(idx, "occupancy", e.target.value)}
                              className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950 cursor-pointer"
                            >
                              {PL_OCCUPANCY_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>

                            {loc.occupancy === "Warehouse - Direct Referral" && (
                              <div className="flex gap-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[10px] mt-2 leading-relaxed">
                                <AlertCircle size={14} className="text-amber-600 shrink-0" />
                                <span><strong>Direct Referral Required:</strong> Warehouses have unique liability scopes. Our underwriters will contact you for a direct physical inspection.</span>
                              </div>
                            )}
                            {loc.occupancy === "Retail Shop (Excludes Jewelry)" && (
                              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-[10px] mt-2">
                                <strong>Note:</strong> Coverage explicitly excludes operations involving precious metal jewelry, watches, gems or coins.
                              </div>
                            )}
                            {loc.occupancy === "Restaurant - Alcohol, Shisha, BBQ" && (
                              <div className="p-2 bg-blue-50 border border-blue-100 rounded-lg text-blue-900 text-[10px] mt-2">
                                <strong>Note:</strong> Premium considers liability risks associated with alcohol, open BBQ fires, and waterpipe (shisha) smoking.
                              </div>
                            )}
                          </div>

                          {loc.occupancy === "Others" && (
                            <div className="md:col-span-2 space-y-1.5">
                              <label className="text-[11px] font-extrabold text-slate-700">Specify 'Others' Occupancy Details</label>
                              <input
                                type="text"
                                value={loc.occupancyOtherDetails}
                                onChange={(e) => handlePlLocationChange(idx, "occupancyOtherDetails", e.target.value)}
                                placeholder="e.g. Art Gallery, Private Gym, Photography Studio"
                                className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950"
                              />
                            </div>
                          )}

                          <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="space-y-0.5">
                                <span className="text-[11px] font-extrabold text-slate-700">Claims History (Last 5 Years)</span>
                                <p className="text-[10px] text-slate-500">Has this location experienced any liability claims or incidents in the last 5 years?</p>
                              </div>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" name={`pl-claims-${idx}`} checked={loc.claimsHistoryLast5Years === "no"} onChange={() => handlePlLocationChange(idx, "claimsHistoryLast5Years", "no")} className="w-4 h-4 text-blue-900 focus:ring-blue-900 border-slate-300" />
                                  <span className="text-xs font-bold text-slate-700">No</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" name={`pl-claims-${idx}`} checked={loc.claimsHistoryLast5Years === "yes"} onChange={() => handlePlLocationChange(idx, "claimsHistoryLast5Years", "yes")} className="w-4 h-4 text-blue-900 focus:ring-blue-900 border-slate-300" />
                                  <span className="text-xs font-bold text-slate-700">Yes</span>
                                </label>
                              </div>
                            </div>

                            {loc.claimsHistoryLast5Years === "yes" && (
                              <div className="space-y-1.5 border-t border-slate-200/60 pt-3">
                                <label className="text-[10px] font-extrabold text-slate-600">Provide claims details (dates, nature, resolution status, paid/outstanding amounts)</label>
                                <textarea
                                  rows={2}
                                  value={loc.claimsDetails}
                                  onChange={(e) => handlePlLocationChange(idx, "claimsDetails", e.target.value)}
                                  placeholder="e.g. Jan 2024: Customer slip and fall settled for AED 15,000. Safety grip mats installed immediately after."
                                  className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {plForm.numberOfLocations < 10 && (
                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => handlePlLocationCountChange(plForm.numberOfLocations + 1)}
                        className="flex items-center gap-2 text-xs text-blue-900 font-black px-4 py-2 border border-dashed border-blue-200 rounded-xl hover:border-blue-900 hover:bg-blue-50/40 transition-all cursor-pointer"
                      >
                        <Plus size={15} />
                        Add Another Business Location
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Off-site Operations & Liability Extensions */}
              {activeTab === 3 && (
                <div className="space-y-8 animate-in fade-in duration-150">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest border-b pb-1">Off-Site Operations</h3>
                    <p className="text-[11px] text-slate-500">
                      Indicate if you perform third-party site projects, installations, deliveries, or contract work outside your registered premises.
                    </p>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-0.5">
                        <label className="text-xs font-black text-slate-800">Do you have operations outside the registered address you want to cover?</label>
                        <p className="text-[11px] text-slate-500">Includes off-site service calls, client office visits, installations, and subcontracted projects.</p>
                      </div>
                      <div className="flex gap-4 shrink-0">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="pl-offsite" checked={plForm.offsiteCoverRequired === "no"} onChange={() => setPlForm({ ...plForm, offsiteCoverRequired: "no" })} className="w-4 h-4 text-blue-900 focus:ring-blue-900 border-slate-300" />
                          <span className="text-xs font-bold text-slate-700">No</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="pl-offsite" checked={plForm.offsiteCoverRequired === "yes"} onChange={() => setPlForm({ ...plForm, offsiteCoverRequired: "yes" })} className="w-4 h-4 text-blue-900 focus:ring-blue-900 border-slate-300" />
                          <span className="text-xs font-bold text-slate-700">Yes</span>
                        </label>
                      </div>
                    </div>

                    {plForm.offsiteCoverRequired === "yes" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50/40 p-5 rounded-2xl border border-slate-100">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-extrabold text-slate-700">Off-site Operations Locations</label>
                          <input type="text" value={plForm.offsiteLocation} onChange={(e) => setPlForm({ ...plForm, offsiteLocation: e.target.value })} placeholder="e.g. Client sites across UAE, or dynamic projects" className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950" />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-extrabold text-slate-700">Overall Limit of Indemnity Required (AED)</label>
                          <input
                            type="text"
                            value={plForm.offsiteLimitOfIndemnity}
                            onChange={(e) => {
                              const clean = e.target.value.replace(/[^0-9]/g, "");
                              setPlForm({ ...plForm, offsiteLimitOfIndemnity: clean ? Number(clean).toLocaleString("en-US") : "" });
                            }}
                            placeholder="e.g. 10,000,000"
                            className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1"><Map size={13} className="text-slate-400" /> Geographical Limit Required</label>
                          <select value={plForm.offsiteGeographicalLimit} onChange={(e) => setPlForm({ ...plForm, offsiteGeographicalLimit: e.target.value })} className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950 cursor-pointer">
                            {PL_GEOGRAPHICAL_LIMITS.map((limit) => (
                              <option key={limit} value={limit}>{limit}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-extrabold text-slate-700">Employees Doing Manual Work?</label>
                          <div className="flex gap-4 py-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="pl-manual" checked={plForm.offsiteManualWorkEmployees === "no"} onChange={() => setPlForm({ ...plForm, offsiteManualWorkEmployees: "no" })} className="w-4 h-4 text-blue-900 focus:ring-blue-900 border-slate-300" />
                              <span className="text-xs font-bold text-slate-700">No</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="pl-manual" checked={plForm.offsiteManualWorkEmployees === "yes"} onChange={() => setPlForm({ ...plForm, offsiteManualWorkEmployees: "yes" })} className="w-4 h-4 text-blue-900 focus:ring-blue-900 border-slate-300" />
                              <span className="text-xs font-bold text-slate-700">Yes</span>
                            </label>
                          </div>
                          {plForm.offsiteManualWorkEmployees === "yes" && (
                            <p className="text-[10px] text-blue-900 font-bold">Note: Premium will adjust for manual risk exposures such as heights, tools, or machinery.</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-extrabold text-slate-700">Annual Turnover (AED)</label>
                          <input
                            type="text"
                            value={plForm.offsiteAnnualTurnover}
                            onChange={(e) => {
                              const clean = e.target.value.replace(/[^0-9]/g, "");
                              setPlForm({ ...plForm, offsiteAnnualTurnover: clean ? Number(clean).toLocaleString("en-US") : "" });
                            }}
                            placeholder="Estimated yearly sales / revenue"
                            className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950"
                          />
                        </div>

                        {plForm.offsiteGeographicalLimit !== "UAE" && (
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[11px] font-extrabold text-slate-700">Annual Turnover Split per Country</label>
                            <textarea rows={2} value={plForm.offsiteTurnoverSplitDetails} onChange={(e) => setPlForm({ ...plForm, offsiteTurnoverSplitDetails: e.target.value })} placeholder="e.g. UAE: AED 3,000,000 | Saudi Arabia: AED 1,500,000 | Oman: AED 500,000" className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950" />
                          </div>
                        )}

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-extrabold text-slate-700">Estimated Number of Projects / Contracts</label>
                          <input type="number" min="0" value={plForm.offsiteEstimatedProjects} onChange={(e) => setPlForm({ ...plForm, offsiteEstimatedProjects: e.target.value })} placeholder="e.g. 15" className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950" />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1"><Users size={13} className="text-slate-400" /> Total Number of Employees</label>
                          <input type="number" min="1" value={plForm.offsiteNumberOfEmployees} onChange={(e) => setPlForm({ ...plForm, offsiteNumberOfEmployees: e.target.value })} placeholder="e.g. 45" className="w-full bg-white border border-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950" />
                        </div>

                        <div className="md:col-span-2 border-t border-slate-200/60 pt-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-y-0.5">
                              <label className="text-[11px] font-extrabold text-slate-700">Is any of your off-site work subcontracted?</label>
                              <p className="text-[10px] text-slate-500">Select yes if you assign works to independent third-party vendors or freelancers.</p>
                            </div>
                            <div className="flex gap-4 shrink-0">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="pl-subcontracted" checked={plForm.offsiteSubcontractedWork === "no"} onChange={() => setPlForm({ ...plForm, offsiteSubcontractedWork: "no" })} className="w-4 h-4 text-blue-900 focus:ring-blue-900 border-slate-300" />
                                <span className="text-xs font-bold text-slate-700">No</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="pl-subcontracted" checked={plForm.offsiteSubcontractedWork === "yes"} onChange={() => setPlForm({ ...plForm, offsiteSubcontractedWork: "yes" })} className="w-4 h-4 text-blue-900 focus:ring-blue-900 border-slate-300" />
                                <span className="text-xs font-bold text-slate-700">Yes</span>
                              </label>
                            </div>
                          </div>

                          {plForm.offsiteSubcontractedWork === "yes" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-white p-4 rounded-xl border border-slate-100">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-extrabold text-slate-600">Subcontracted Services (Optional)</label>
                                <input type="text" value={plForm.offsiteSubcontractedServices} onChange={(e) => setPlForm({ ...plForm, offsiteSubcontractedServices: e.target.value })} placeholder="e.g. Electrical wiring, plumbing, HVAC install" className="w-full bg-slate-50/40 border border-slate-200 py-2 px-3 rounded-lg text-xs font-bold text-slate-800 outline-none focus:border-blue-950" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-extrabold text-slate-600">% of Subcontracted Work on Turnover (Optional)</label>
                                <input type="number" min="0" max="100" value={plForm.offsiteSubcontractedPercentage} onChange={(e) => setPlForm({ ...plForm, offsiteSubcontractedPercentage: e.target.value })} placeholder="e.g. 15" className="w-full bg-slate-50/40 border border-slate-200 py-2 px-3 rounded-lg text-xs font-bold text-slate-800 outline-none focus:border-blue-950" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest">Liability Extensions Required</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Select additional coverage extensions for specialized assets or principal protection.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { key: "extPropertyBeingWorkedUpon", title: "A. Property being worked upon / Contract works and materials", desc: "Covers liability for physical damage caused directly to third-party contract materials or structural projects on which your employees are actively performing labor." },
                        { key: "extPropertyUnderCareCustodyControl", title: "B. Property under care, custody and control", desc: "Extends coverage to physical damage or loss occurring to third-party assets left directly under your custody or supervision for maintenance, holding, or storage." },
                        { key: "extPrincipalsExistingProperty", title: "C. Principal's existing and surrounding property", desc: "Protects against accidental damages to preexisting structural facilities or adjacent lands owned by the client/principal on whose site your company is working." }
                      ].map((ext) => {
                        const checked = (plForm as any)[ext.key] as boolean;
                        return (
                          <div
                            key={ext.key}
                            onClick={() => setPlForm({ ...plForm, [ext.key]: !checked })}
                            className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${
                              checked ? "border-blue-900 bg-blue-50/30" : "border-slate-100 bg-white hover:border-slate-200"
                            }`}
                          >
                            <div className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center border shrink-0 ${checked ? "border-blue-900 bg-blue-900 text-white" : "border-slate-300 bg-white"}`}>
                              {checked && <Check size={13} className="stroke-[3]" />}
                            </div>
                            <div>
                              <span className="text-xs font-black text-slate-800 block">{ext.title}</span>
                              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{ext.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Uploads */}
              {activeTab === 4 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest border-b pb-1">Document & Asset Uploads</h3>
                  <p className="text-[11px] text-slate-500 -mt-3">
                    Attach a copy of your valid Trade License and site/location photos to expedite insurance underwriter validation.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5"><FileText size={14} className="text-slate-400" /> Corporate Trade License</label>
                        {plForm.tradeLicenseFile && (
                          <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                            <CheckCircle size={11} /> Ready
                          </span>
                        )}
                      </div>
                      <div
                        onClick={() => handlePlSimUpload("license")}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[140px] ${
                          plForm.tradeLicenseFile ? "border-green-300 bg-green-50/10" : "border-slate-200 hover:border-blue-900 hover:bg-slate-50/50"
                        }`}
                      >
                        {plForm.tradeLicenseFile ? (
                          <div className="space-y-2">
                            <div className="p-3 bg-green-100 text-green-700 rounded-lg inline-block"><FileText size={26} /></div>
                            <p className="text-xs font-bold text-slate-800">{plForm.tradeLicenseFile}</p>
                            <button type="button" onClick={(e) => { e.stopPropagation(); setPlForm({ ...plForm, tradeLicenseFile: "" }); }} className="text-[11px] font-bold text-rose-500 inline-flex items-center gap-1 px-3 py-1 bg-rose-50 border border-rose-100 rounded-md">
                              <Trash2 size={12} /> Remove file
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="p-3 bg-slate-100 text-slate-400 rounded-lg inline-block"><UploadCloud size={22} /></div>
                            <p className="text-xs font-bold text-slate-800">Click to simulate upload</p>
                            <p className="text-[10px] text-slate-400">Supports PDF, PNG, JPG (Max 10MB)</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5"><ImageIcon size={14} className="text-slate-400" /> Site / Location Photos</label>
                        {plForm.sitePhotos.length > 0 && (
                          <span className="text-[10px] font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">{plForm.sitePhotos.length} {plForm.sitePhotos.length === 1 ? "Photo" : "Photos"}</span>
                        )}
                      </div>
                      <div
                        onClick={() => handlePlSimUpload("photo")}
                        className="border-2 border-dashed border-slate-200 hover:border-blue-900 hover:bg-slate-50/50 rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[140px]"
                      >
                        <div className="space-y-2">
                          <div className="p-3 bg-slate-100 text-slate-400 rounded-lg inline-block"><ImageIcon size={22} /></div>
                          <p className="text-xs font-bold text-slate-800">Click to add a photo</p>
                          <p className="text-[10px] text-slate-400">Supports JPG, PNG (multiple)</p>
                        </div>
                      </div>
                      {plForm.sitePhotos.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {plForm.sitePhotos.map((name, i) => (
                            <span key={i} className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg flex items-center gap-1.5">
                              {name}
                              <button type="button" onClick={() => setPlForm({ ...plForm, sitePhotos: plForm.sitePhotos.filter((_, idx) => idx !== i) })} className="text-slate-400 hover:text-rose-500">
                                <Trash2 size={11} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Sign */}
              {activeTab === 5 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest border-b pb-1">Review & Sign</h3>

                  <div className="space-y-5 text-xs">
                    <div className="border border-slate-200 rounded-2xl p-4 space-y-1.5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Company & Contact</p>
                      <p className="font-bold text-slate-800">{plForm.companyName || "--"} &middot; {plForm.tradeLicenseNumber || "--"}</p>
                      <p className="text-slate-600">{plForm.contactPerson || "--"} &middot; {plForm.contactEmail || "--"} &middot; {plForm.contactPhone || "--"}</p>
                    </div>

                    <div className="border border-slate-200 rounded-2xl p-4 space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Risk Locations ({plForm.locations.length})</p>
                      {plForm.locations.map((loc, idx) => (
                        <div key={loc.id} className="flex justify-between gap-4 border-b border-slate-100 last:border-0 pb-1.5 last:pb-0">
                          <span className="text-slate-600">#{idx + 1} {loc.address || "No address entered"} &middot; {loc.occupancy}</span>
                          <span className="font-black text-blue-900 shrink-0">{loc.limitOfIndemnity ? `AED ${loc.limitOfIndemnity}` : "--"}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border border-slate-200 rounded-2xl p-4 space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Off-site Operations</p>
                      {plForm.offsiteCoverRequired === "no" ? (
                        <p className="text-slate-500 italic">No offsite operations cover requested.</p>
                      ) : (
                        <p className="text-slate-600">{plForm.offsiteLocation || "--"} &middot; AED {plForm.offsiteLimitOfIndemnity || "--"} &middot; {plForm.offsiteGeographicalLimit}</p>
                      )}
                    </div>

                    <div className="border border-slate-200 rounded-2xl p-4 space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Liability Extensions</p>
                      <p className="text-slate-600">
                        {[
                          plForm.extPropertyBeingWorkedUpon && "Property being worked upon",
                          plForm.extPropertyUnderCareCustodyControl && "Property under care, custody and control",
                          plForm.extPrincipalsExistingProperty && "Principal's existing and surrounding property"
                        ].filter(Boolean).join(", ") || "None selected"}
                      </p>
                    </div>

                    <div className="border border-slate-200 rounded-2xl p-4 space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Attachments</p>
                      <p className="text-slate-600">{plForm.tradeLicenseFile || "No trade license uploaded"} &middot; {plForm.sitePhotos.length} photo(s)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Electronic Signature (Full Name)</label>
                      <input type="text" value={plForm.signatureName} onChange={(e) => setPlForm({ ...plForm, signatureName: e.target.value })} placeholder="Type your full name to sign" className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5"><Calendar size={13} className="text-slate-400" /> Date</label>
                      <input type="date" value={plForm.signatureDate} onChange={(e) => setPlForm({ ...plForm, signatureDate: e.target.value })} className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-blue-950" />
                    </div>
                  </div>

                  <div className="pt-3">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={plForm.agreedToDeclaration}
                        onChange={(e) => setPlForm({ ...plForm, agreedToDeclaration: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-300 mt-0.5 text-blue-900 focus:ring-blue-900 cursor-pointer"
                      />
                      <span className="text-xs font-extrabold text-slate-800">
                        I declare that all details in this Public Liability Proposal are accurate. I accept the policy underwriting conditions.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation button rows */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled={activeTab === 1}
                  onClick={() => setActiveTab(prev => Math.max(1, prev - 1))}
                  className={`py-2.5 px-5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    activeTab === 1
                      ? "border-slate-100 text-slate-300 cursor-not-allowed"
                      : "border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  Previous Section
                </button>

                {activeTab < 5 ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab(prev => Math.min(5, prev + 1))}
                    className="bg-blue-900 hover:bg-blue-800 text-white py-2.5 px-6 rounded-xl text-xs font-black cursor-pointer transition-colors"
                  >
                    Next Section
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting || !plForm.agreedToDeclaration}
                    className={`font-black text-xs py-3.5 px-8 rounded-xl flex items-center gap-1.5 shadow-md ${
                      !plForm.agreedToDeclaration || submitting
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                        : "bg-yellow-400 hover:bg-yellow-500 text-blue-950 shadow-yellow-400/10 cursor-pointer"
                    }`}
                  >
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : <Award size={14} />}
                    <span>Submit Public Liability Proposal</span>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* ======================= FORM 3: DIRECTORS & OFFICERS PROPOSAL FORM ======================= */}
          {selectedFormType === "DO" && (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              {/* Form Tabs Navigation */}
              <div className="flex border-b border-slate-100 overflow-x-auto gap-4 scrollbar-none pb-0.5">
                {[
                  { id: 1, label: "1. Corporate Setup" },
                  { id: 2, label: "2. Financial Risk Profile" },
                  { id: 3, label: "3. Management Board" },
                  { id: 4, label: "4. Loss History & Dec" }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id)}
                    className={`py-3 px-1 border-b-2 font-black text-xs whitespace-nowrap cursor-pointer transition-all ${
                      activeTab === t.id
                        ? "border-blue-900 text-blue-900"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Corporate Details */}
              {activeTab === 1 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700 font-sans">Legal Entity Name</label>
                        {isFieldAutoFilled("companyName") && <AutoFillBadge />}
                      </div>
                      <input 
                        type="text" 
                        value={doForm.companyName} 
                        onChange={(e) => setDoForm({ ...doForm, companyName: e.target.value })}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold outline-none transition-all ${
                          isFieldAutoFilled("companyName")
                            ? "bg-green-50/20 border-2 border-green-300 text-slate-800"
                            : "bg-white border border-slate-200 text-slate-800 focus:border-blue-950"
                        }`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700">Trade License Number</label>
                        {isFieldAutoFilled("tradeLicense") && <AutoFillBadge />}
                      </div>
                      <input 
                        type="text" 
                        value={doForm.tradeLicense} 
                        onChange={(e) => setDoForm({ ...doForm, tradeLicense: e.target.value })}
                        className={`w-full py-3 px-4 rounded-xl text-xs font-mono font-bold outline-none transition-all ${
                          isFieldAutoFilled("tradeLicense")
                            ? "bg-green-50/20 border-2 border-green-300 text-slate-800"
                            : "bg-white border border-slate-200 text-slate-800 focus:border-blue-950"
                        }`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-extrabold text-slate-700">Licensing Authority</label>
                        {vc?.authority && <AutoFillBadge />}
                      </div>
                      <input 
                        type="text" 
                        value={doForm.authority} 
                        onChange={(e) => setDoForm({ ...doForm, authority: e.target.value })}
                        placeholder="e.g. DET Dubai"
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold outline-none transition-all ${
                          vc?.authority
                            ? "bg-green-50/20 border-2 border-green-300 text-slate-800"
                            : "bg-white border border-slate-200 text-slate-800 focus:border-blue-950"
                        }`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Year of Original Incorporation</label>
                      <input 
                        type="text" 
                        value={doForm.incorporatedYear} 
                        onChange={(e) => setDoForm({...doForm, incorporatedYear: e.target.value})}
                        placeholder="e.g. 2018"
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none text-slate-800" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Financials */}
              {activeTab === 2 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Total Group Assets (AED)</label>
                      <input 
                        type="text" 
                        value={doForm.totalAssets} 
                        onChange={(e) => setDoForm({...doForm, totalAssets: e.target.value})}
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none text-slate-800" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Annual Turnover (Gross in AED)</label>
                      <input 
                        type="text" 
                        value={doForm.annualTurnover} 
                        onChange={(e) => setDoForm({...doForm, annualTurnover: e.target.value})}
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none text-slate-800" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Net Profit after Taxes (AED)</label>
                      <input 
                        type="text" 
                        value={doForm.netProfit} 
                        onChange={(e) => setDoForm({...doForm, netProfit: e.target.value})}
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none text-slate-800" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Listing/Shareholding Status</label>
                      <select 
                        value={doForm.listedStatus}
                        onChange={(e) => setDoForm({...doForm, listedStatus: e.target.value})}
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none text-slate-800"
                      >
                        <option value="">-- Select Status --</option>
                        <option>Private LLC</option>
                        <option>Public Joint Stock Company (PJSC)</option>
                        <option>Freezone Offshore Company</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Management */}
              {activeTab === 3 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Number of Sitting Directors</label>
                      <input 
                        type="number" 
                        value={doForm.numberOfDirectors} 
                        onChange={(e) => setDoForm({...doForm, numberOfDirectors: e.target.value})}
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none text-slate-800" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700">Does the company have active subsidiaries?</label>
                      <select 
                        value={doForm.hasSubsidiaries}
                        onChange={(e) => setDoForm({...doForm, hasSubsidiaries: e.target.value})}
                        className="w-full bg-white border border-slate-200 py-3 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none text-slate-800"
                      >
                        <option value="">-- Select option --</option>
                        <option>No</option>
                        <option>Yes (Local only)</option>
                        <option>Yes (Foreign / Overseas)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Declaration */}
              {activeTab === 4 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                      <p className="font-bold text-slate-800 mb-1.5">Declaration and Legal Binding Statement:</p>
                      I hereby declare that the particulars and answers given in this digital proposal are true, accurate, and complete, and that no material facts have been withheld or omitted. I agree that this proposal form shall be the basis of the contract between the company and the underwriters.
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={doForm.agreedToDeclaration}
                        onChange={(e) => setDoForm({...doForm, agreedToDeclaration: e.target.checked})}
                        className="w-4 h-4 rounded border-slate-200 mt-0.5 text-blue-900 focus:ring-blue-900 cursor-pointer" 
                      />
                      <span className="text-xs font-extrabold text-slate-800">
                        I accept the declaration and authorize corporate tender sourcing.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation button rows */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled={activeTab === 1}
                  onClick={() => setActiveTab(prev => Math.max(1, prev - 1))}
                  className={`py-2.5 px-5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    activeTab === 1 
                      ? "border-slate-100 text-slate-300 cursor-not-allowed" 
                      : "border-slate-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  Previous Section
                </button>

                {activeTab < 4 ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab(prev => Math.min(4, prev + 1))}
                    className="bg-blue-900 hover:bg-blue-800 text-white py-2.5 px-6 rounded-xl text-xs font-black cursor-pointer transition-colors"
                  >
                    Next Section
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting || !doForm.agreedToDeclaration}
                    className={`font-black text-xs py-3.5 px-8 rounded-xl flex items-center gap-1.5 shadow-md ${
                      !doForm.agreedToDeclaration || submitting
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                        : "bg-yellow-400 hover:bg-yellow-500 text-blue-950 shadow-yellow-400/10 cursor-pointer"
                    }`}
                  >
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : <Award size={14} />}
                    <span>Submit Complete D&O Application</span>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* ======================= OFFLINE ATTACHMENT PORTAL ======================= */}
          {selectedFormType === "Offline" && (
            <div className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3 text-amber-900">
                <AlertCircle className="shrink-0 mt-0.5 text-amber-600" size={18} />
                <div className="space-y-1">
                  <h4 className="text-xs font-black">Manual Underwriting Proposal Option</h4>
                  <p className="text-[11px] leading-relaxed">
                    If you prefer to fill out your physical underwriting proposal pack or have custom documents prepared by your legal team, you can directly upload them here. Our brokers will submit them straight to the underwriters.
                  </p>
                </div>
              </div>

              {/* Download Package */}
              <div className="space-y-2 max-w-md">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1. Download Corporate Underwriting Package</h4>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("Corporate Underwriting Template Pack downloaded!"); }}
                  className="flex items-center justify-between border border-blue-100 bg-blue-50/50 hover:bg-blue-50 p-4 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText size={16} className="text-blue-900" />
                    <span className="text-xs font-bold text-slate-800 font-sans">Underwriting_Proposal_Package.pdf</span>
                  </div>
                  <FileDown size={16} className="text-blue-900" />
                </a>
              </div>

              {/* Upload portal */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">2. Upload Completed Proposal & Documents</h4>
                <div
                  onClick={handleFileUploadSim}
                  disabled={uploading}
                  className="border-2 border-dashed border-slate-200 hover:border-blue-900 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <UploadCloud size={32} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-black text-slate-700">Click here to select and upload completed files</p>
                  <p className="text-[10px] text-slate-400 mt-1">Accepts completed PDF proposal or required trade licenses</p>
                </div>

                {uploading && (
                  <div className="bg-white border border-slate-100 p-3.5 rounded-xl space-y-2 animate-pulse">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <span>Uploading Completed_Underwriting_Proposal.pdf...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-900 h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                )}

                {uploadedFiles.length > 0 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Uploaded Documents:</h5>
                      {uploadedFiles.map((fn, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between animate-in slide-in-from-top-2 duration-150">
                          <div className="flex items-center gap-2.5">
                            <CheckCircle className="text-green-500 fill-green-50 shrink-0" size={16} />
                            <span className="text-xs font-extrabold text-slate-800">{fn}</span>
                          </div>
                          <span className="text-[9px] bg-green-100 text-green-800 font-extrabold px-2 py-0.5 rounded-full">Completed</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-green-50 border border-green-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left animate-in fade-in duration-200">
                      <div className="flex items-start gap-3">
                        <Sparkles className="text-green-600 mt-1 shrink-0 animate-pulse" size={18} />
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-black text-green-900">SME Underwriting Proposal Detected!</h4>
                          <p className="text-[11px] text-green-700 leading-relaxed">
                            Our AI has successfully scanned and parsed 42 fields from your uploaded PDF. You can immediately see and verify these fields on the interactive online form.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const nameVal = lead.companyName || vc?.companyName || "Al Ghurair Corporate Solutions LLC";
                          const descVal = lead.businessDescription || lead.businessActivity || (vc?.activities && vc.activities.join(", ")) || "Corporate Solutions Provider";
                          const addrVal = vc?.address || "Level 14, Al Ghurair Centre, Deira, Dubai, UAE";
                          const cityVal = lead.emirate || "Dubai";
                          const licVal = lead.tradeLicense || vc?.tradeLicenseNumber || "238534";
                          const authVal = vc?.authority || "DET Dubai Economy & Tourism";
                          const yrVal = vc?.issueDate ? vc.issueDate.substring(0, 4) : "2018";
                          const poBoxVal = addrVal.match(/PO\s*Box\s*(\d+)/i)?.[1] || "26423";
                          const areaVal = addrVal.includes("Deira") ? "Deira" : (addrVal.includes("Marina") ? "Dubai Marina" : (addrVal.includes("Bay") ? "Business Bay" : "Downtown Dubai"));

                          setSmeForm(prev => ({
                            ...prev,
                            productType: "Office",
                            companyName: nameVal,
                            natureOfBusiness: descVal,
                            address: addrVal,
                            city: cityVal,
                            poBox: poBoxVal,
                            area: areaVal,
                            buildingSumInsured: "2,500,000",
                            contentsSumInsured: "450,000",
                            stockInTradeSumInsured: "150,000",
                            fixedEquipmentSumInsured: "120,000",
                            portableEquipmentSumInsured: "65,000",
                            medicalEquipmentSumInsured: "0",
                            breakageGlassSumInsured: "25,000",
                            annualGrossProfit: "1,800,000",
                            annualRent: "220,000",
                            increasedCostOfWorking: "85,000",
                            publicLiabilityLimit: "AED 2,000,000",
                            hasStudents: "No",
                            employeesAdminCount: "12",
                            employeesAdminSalaries: "450,000",
                            employeesManualCount: "4",
                            employeesManualSalaries: "96,000",
                            employersLiabilityLimit: "AED 1,000,000",
                            is24HrPersonalAccidentRequired: "Yes",
                            cashClosedSafe: "35,000",
                            cashClosedNotSafe: "5,000",
                            cashOpenAttended: "20,000",
                            cashSafeLossDamage: "10,000",
                            cashInDwelling: "5,000",
                            cashTransitAnnualCarrying: "250,000",
                            cashTransitLimitPerCarrying: "15,000",
                            equipBreakdownFixed: "120,000",
                            equipBreakdownPortable: "65,000",
                            paEmployeesCount: "16",
                            paAccidentalDeath: "150,000",
                            paMedicalExpenses: "15,000",
                            dishonestyEmployeesCount: "4",
                            dishonestyLimitPerEmployee: "50,500",
                            transitLimitPerShipment: "25,000",
                            transitAnnualShipment: "150,000",
                            fireSprinklers: true,
                            fireExtinguishers: true,
                            fireHoseReel: true,
                            fireAlarm: true,
                            fireSmokeDetectors: true,
                            securityGrills: false,
                            security24Hr: true,
                            securityBurglarAlarm: true,
                            isWarehousingUsed: "No",
                            isManufacturingEngaged: "No",
                            isRCCConstruction: "Yes",
                            buildingYearOfConstruction: yrVal,
                            buildingNumberOfFloors: "14",
                            proposerName: lead.contactName || "Managing Director",
                            proposerPosition: "Managing Director",
                            agreedToDeclaration: true
                          }));

                          setPlForm(prev => ({
                            ...prev,
                            companyName: nameVal,
                            officeAddress: addrVal,
                            operationsDescription: descVal,
                            employeesPremisesPast12Count: "12",
                            employeesPremisesPast12Wages: "450,000",
                            employeesPremisesNext12Count: "16",
                            employeesPremisesNext12Wages: "520,000",
                            turnoverUAENextEstimate: "1,800,000",
                            turnoverUAECurrentProjected: "1,500,000",
                            turnoverUAEPreviousYear: "1,200,000",
                            proposerName: lead.contactName || "Managing Director",
                            proposerPosition: "Managing Director",
                            agreedToDeclaration: true
                          }));

                          setDoForm(prev => ({
                            ...prev,
                            companyName: nameVal,
                            tradeLicense: licVal,
                            authority: authVal,
                            incorporatedYear: yrVal,
                            paidUpCapital: "1,000,000",
                            hasSubsidiaries: "No",
                            totalAssets: "4,500,000",
                            annualTurnover: "1,800,000",
                            netProfit: "350,000",
                            listedStatus: "Private Company",
                            numberOfDirectors: "3",
                            hasPastClaims: "No",
                            agreedToDeclaration: true
                          }));

                          setIsFilledFromUpload(true);
                          if (selectedFormType === "Offline") {
                            setSelectedFormType("SME");
                          }
                          setActiveTab(1);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs font-black py-2 px-4 rounded-xl flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer shadow-sm hover:shadow-md"
                      >
                        <Sparkles size={13} className="fill-green-200/20" />
                        <span>Review Extracted Fields</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit portal action */}
              <div className="pt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled={uploadedFiles.length === 0 || submitting}
                  onClick={handleSubmit}
                  className={`w-full font-black text-xs py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                    uploadedFiles.length === 0 || submitting
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-blue-950 shadow-lg shadow-yellow-400/10 cursor-pointer"
                  }`}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Submitting Underwriting File...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={15} className="fill-blue-950 text-yellow-400" />
                      <span>Submit Completed Offline Documents</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
