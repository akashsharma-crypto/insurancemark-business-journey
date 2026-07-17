import React, { useState, useEffect } from "react";
import { InsuranceProduct, LeadFormState } from "../types";
import { JourneyStepper } from "./JourneyStepper";
import {
  ArrowLeft, ArrowRight, Calendar, FileDown, UploadCloud, FileText, Check, CheckCircle,
  AlertCircle, Sparkles, Building2, User, PhoneCall, Loader2, DollarSign, Users, ShieldAlert,
  ChevronDown, ChevronUp, ShieldCheck, MapPin, Briefcase, Plus, Trash2, HelpCircle
} from "lucide-react";

interface ProceedOptionsViewProps {
  lead: LeadFormState;
  onBack: () => void;
  onSelectOnlineFill?: () => void;
  onCompleteFlow: (meetingDetails?: string, uploadedFiles?: string[]) => void;
}

export const ProceedOptionsView: React.FC<ProceedOptionsViewProps> = ({
  lead,
  onBack,
  onCompleteFlow
}) => {
  // Ensure we have at least some products to avoid errors
  const selectedProducts = lead.selectedProducts && lead.selectedProducts.length > 0 
    ? lead.selectedProducts 
    : [InsuranceProduct.BusinessInsurance];

  // Selected tab state (holds the index of selectedProducts)
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const activeProduct = selectedProducts[activeTabIdx];

  // Master completion loading state
  const [submitting, setSubmitting] = useState(false);

  // Sub-Wizard section index within each interactive form
  const [smeSubStep, setSmeSubStep] = useState(0);
  const [doSubStep, setDoSubStep] = useState(0);

  // --- COMPREHENSIVE INTERACTIVE SME FORM STATE (BASED EXACTLY ON PDF OCR) ---
  const [smeForm, setSmeForm] = useState({
    // Product Type Select
    productType: "Office", // Office, Retail, Food & Beverage, Educare, Personal Care, Clinicare, Property Owners, Employee Protector, Other

    // Business Details
    companyInsuredName: lead.companyName || "",
    natureOfBusiness: lead.businessActivity || "",
    addressOfPremises: lead.address || "",
    city: lead.emirate || "",
    poBox: "",
    area: lead.address ? lead.address.split(",").slice(-2)[0]?.trim() || "" : "",

    // Core Covers - Your Assets (Property All Risks)
    assetsBuilding: "",
    assetsContents: "",
    assetsStock: "",
    assetsFixedEquipment: "",
    assetsPortableEquipment: "",
    assetsMedicalEquipment: "",
    assetsGlassSignage: "",
    
    // Core Covers - Your Profits (Business Continuity)
    profitsAnnualGross: "",
    profitsAnnualRent: "",
    profitsIncreasedCost: "",

    // Core Covers - Your Liability (Public Liability)
    liabilityLimit: "", // AED 500,000, 1M, 2M, 2.5M, 3M, 4M, 5M
    liabilityLimitOther: "",
    numberOfStudents: "", // for educational institutions

    // Core Covers - Your Employees (Workmen's Compensation)
    employeesAdminCount: "",
    employeesAdminSalaries: "",
    employeesManualCount: "",
    employeesManualSalaries: "",
    employersLiabilityLimit: "",
    personalAccident24Hr: "No", // YES or NO

    // Core Covers - Your Cash (Money)
    cashClosedInSafe: "",
    cashClosedNotSafe: "",
    cashOpenHours: "",
    cashSafeDamage: "",
    cashInDwelling: "",
    cashTransitAnnual: "",
    cashTransitLimitPerCarrying: "",

    // Additional Covers - Equipment Breakdown
    eqBreakdownFixed: "",
    eqBreakdownPortable: "",
    eqBreakdownMedical: "",

    // Additional Covers - Personal Accident
    paEmployeeCount: "",
    paDeathDismemberment: "",
    paMedicalExpenses: "",

    // Additional Covers - Employee Dishonesty
    dishonestyEmployeeCount: "",
    dishonestyLimitPerEmployee: "",

    // Additional Covers - Inland Transit
    transitLimitPerShipment: "",
    transitEstimatedAnnual: "",

    // Risk Assessment - Fire & Security Measures
    fireSprinkler: false,
    fireExtinguisher: false,
    fireHoseReel: false,
    fireAlarm: false,
    fireSmokeDetectors: false,
    fireNone: false,
    fireOtherDetails: "",

    securityGrills: false,
    security24Hr: false,
    securityBurglarAlarm: false,
    securityNone: false,
    securityOtherDetails: "",

    // Risk Details
    usePremisesWarehousing: "No", // YES / NO
    warehouseAreaSqFt: "",
    warehouseStockType: "",
    warehouseStorageMethod: "",
    warehousePileHeight: "",
    warehouseCeilingHeight: "",

    usePremisesManufacturing: "No", // YES / NO
    mfgPlantAreaSqFt: "",
    mfgGoodsDescription: "",
    mfgHotWorksInvolved: "No",
    mfgProcessDescription: "",

    premisesFullyReinforcedConcrete: "Yes", // YES / NO
    premisesConstructionWalls: "",
    premisesConstructionRoof: "",

    buildingYearOfConstruction: "",
    buildingFloorsCount: "",

    // Surrounding Premise Risks
    surroundingLeft: "",
    surroundingRight: "",
    surroundingFront: "",
    surroundingBack: "",

    // Declined History & Claims History
    insuranceDeclinedHistory: "No", // YES / NO
    claimsPast4Years: "No", // YES / NO
    claimsPast4YearsDetails: "",

    // Additional Locations
    totalNumberOfLocations: "1",
    locationsList: [
      { id: 1, address: "", emirate: lead.emirate || "", area: "", natureOfBusiness: "", buildingVal: "0", contentsVal: "0", equipmentVal: "0", stockVal: "0", grossProfitVal: "0", annualRentVal: "0", publicLiabilityVal: "0" }
    ],

    // Declaration & Request Details
    proposerName: lead.contactName || "",
    proposerPosition: "",
    dateCompleted: new Date().toISOString().split("T")[0],
    desiredPolicyEffectiveDate: "",
    additionalRequestsDetails: "",
    agreedToDeclaration: false
  });
  const [smeFormSaved, setSmeFormSaved] = useState(false);

  // --- COMPREHENSIVE INTERACTIVE D&O FORM STATE (BASED EXACTLY ON PDF OCR) ---
  const [doForm, setDoForm] = useState({
    // Your Details
    entitiesToInsure: lead.companyName || "",
    principalAddress: lead.address || "",
    branchOfficesLocations: "None",
    countryOfRegistration: "United Arab Emirates",
    dateOfEstablishment: lead.issueDate || "2018-05-15",
    
    // Past 3 Years Changes
    nameChangedPast3Years: "No",
    mergerAcquisitionPast3Years: "No",
    subsidiarySoldPast3Years: "No",
    capitalStructureChangedPast3Years: "No",
    changesDetails: "",

    // Listing Status
    isPrivateCompany: "Yes",
    isPublicCompany: "No",
    isListedOnExchange: "No",
    listingExchangeCountryDetails: "",

    // Pending Corporate Transactions
    acquisitionsPending: "No",
    proposalsAwareForAcquisition: "No",
    intendingOfferingPublicDebt: "No",
    pendingTransactionsDetails: "",

    // North American Exposures
    assetsInNorthAmerica: "No",
    tradedDebtInNorthAmerica: "No",
    equitySecuritiesTradedInNorthAmerica: "No",
    northAmericaExposuresDetails: "",

    // Management & Staff
    totalNumberOfDirectors: "3",
    totalNumberOfShareholders: "2",
    totalPercentageOwnedByDirectors: "85%",
    
    // Shareholders holding >15%
    shareholdersList: [
      { name: lead.contactName || "Managing Owner", percentage: "85%", representedOnBoard: "Yes" },
      { name: "Executive Partner", percentage: "15%", representedOnBoard: "Yes" }
    ],

    // Subsidiaries List
    subsidiariesList: [] as { companyName: string; country: string; percentageOwned: string }[],

    // Covenants & Compliance Audits
    officersResignedPast12Months: "No",
    officersResignedDetails: "",
    interestInPartnershipsOrSPVs: "No",
    interestInPartnershipsDetails: "",
    auditingFirmChangedPast5Years: "No",
    auditingFirmChangedDetails: "",
    restatedFinancialResultsPast5Years: "No",
    restatedFinancialsDetails: "",
    revenueRecognitionApprovedByAuditors: "Yes",
    revenueRecognitionNotApprovedDetails: "",
    breachedDebtCovenantsPast12Months: "No",
    breachedCovenantsDetails: "",
    anticipateOneTimeChargeToEarnings: "No",
    anticipateOneTimeChargeDetails: "",
    hasStockTransactionPolicies: "No",
    hasInsuranceCaptiveOrCreditSub: "No",

    // Insurance & Claims History
    presentlyCarriesProfessionalIndemnity: "No",
    existingInsurer: "",
    existingExpiryDate: "",
    existingLimitOfIndemnity: "",
    existingDeductible: "",

    refusedOrCancelledDOInsurance: "No",
    refusedInsuranceDetails: "",
    subjectToDisciplinaryProceedings: "No",
    subjectToDisciplinaryDetails: "",
    subjectToFormalInvestigation: "No",
    subjectToFormalInvestigationDetails: "",
    claimsPast10Years: "No",
    claimsPast10YearsDetails: [] as { dateOfClaim: string; insurerName: string; claimantName: string; description: string; amountPaid: string; isFinalised: string; actionsTaken: string }[],
    unnotifiedCircumstancesPotentialClaims: "No",
    unnotifiedCircumstancesDetails: "",

    // Insurance Cover Requested
    limitOfIndemnityRequired: "AED 5,000,000",
    deductibleExcessRequired: "AED 25,000",
    continuityDateRequired: new Date().toISOString().split("T")[0],

    // Enclosures Checklist
    encloseAnnualReport: true,
    encloseInterimStatements: false,
    encloseListingParticulars: false,

    // Declaration
    proposerName: lead.contactName || "",
    proposerPosition: "Managing Director",
    companyNameDeclaring: lead.companyName || "",
    dateDeclared: new Date().toISOString().split("T")[0],
    agreedToDeclaration: true
  });
  const [doFormSaved, setDoFormSaved] = useState(false);

  // Sync details if trade license is loaded or changed (e.g. from fetched Invest in Dubai profiles)
  useEffect(() => {
    if (lead) {
      setSmeForm(prev => ({
        ...prev,
        companyInsuredName: lead.companyName || prev.companyInsuredName,
        natureOfBusiness: lead.businessActivity || prev.natureOfBusiness,
        addressOfPremises: lead.address || prev.addressOfPremises,
        city: lead.emirate || prev.city,
        proposerName: lead.contactName || prev.proposerName,
        area: lead.address ? lead.address.split(",").slice(-2)[0]?.trim() || "Deira" : "Deira"
      }));

      setDoForm(prev => ({
        ...prev,
        entitiesToInsure: lead.companyName || prev.entitiesToInsure,
        principalAddress: lead.address || prev.principalAddress,
        dateOfEstablishment: lead.issueDate || prev.dateOfEstablishment,
        proposerName: lead.contactName || prev.proposerName,
        companyNameDeclaring: lead.companyName || prev.companyNameDeclaring
      }));
    }
  }, [lead]);

  // --- DOWNLOAD/UPLOAD STATES ---
  // Store uploaded files per product ID
  const [uploadedFilesByProduct, setUploadedFilesByProduct] = useState<Record<string, { name: string; size: string }[]>>({});
  const [uploadingProduct, setUploadingProduct] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Simulator for file upload
  const handleSimulateUpload = (productId: string, docName: string, size: string) => {
    setUploadingProduct(productId);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadingProduct(null);
          setUploadedFilesByProduct(prevFiles => {
            const existing = prevFiles[productId] || [];
            if (existing.some(f => f.name === docName)) return prevFiles;
            return {
              ...prevFiles,
              [productId]: [...existing, { name: docName, size }]
            };
          });
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  const triggerUploadClick = (productId: string) => {
    const prefix = productId.split(" ")[0] || "Commercial";
    handleSimulateUpload(productId, `Completed_${prefix}_Underwriting_Form.pdf`, "1.6 MB");
  };

  // Check if a tab's requirements are satisfied
  const isSmeRelated = (p: InsuranceProduct) => {
    return [
      InsuranceProduct.Sme,
      InsuranceProduct.BusinessInsurance,
      InsuranceProduct.SmePackage,
      InsuranceProduct.WorkmenCompensation,
      InsuranceProduct.WorkmenCompensationSelect,
      InsuranceProduct.Property,
      InsuranceProduct.PropertyAllRisk,
      InsuranceProduct.PropertyAllRiskBI,
      InsuranceProduct.BusinessInterruption,
      InsuranceProduct.FireAndAllied,
      InsuranceProduct.PublicLiability,
      InsuranceProduct.PublicLiabilitySelect,
      InsuranceProduct.MoneyInsurance,
      InsuranceProduct.MachineryBreakdown,
      InsuranceProduct.MachineryBreakdownSelect
    ].includes(p);
  };

  const isTabSatisfied = (productId: InsuranceProduct) => {
    if (productId === InsuranceProduct.DirectorsOfficers) {
      return doFormSaved;
    }
    if (isSmeRelated(productId)) {
      return smeFormSaved;
    }
    return (uploadedFilesByProduct[productId] || []).length > 0;
  };

  const allTabsSatisfied = selectedProducts.every(p => isTabSatisfied(p));

  // Handle master submit
  const handleMasterSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const uploadList: string[] = [];
      Object.entries(uploadedFilesByProduct).forEach(([p, files]) => {
        if (Array.isArray(files)) {
          (files as { name: string; size: string }[]).forEach(f => uploadList.push(`${p}: ${f.name}`));
        }
      });
      if (smeFormSaved) {
        uploadList.push(`SME Underwriting: Fully Submitted (${smeForm.productType} Proposal Form)`);
      }
      if (doFormSaved) {
        uploadList.push(`D&O Liability Underwriting: Fully Submitted (Completed Proposal Form)`);
      }
      onCompleteFlow("Unified Digital Underwriting Portal Sourced", uploadList);
    }, 1500);
  };

  // Helper calculation for total asset sum
  const calculateTotalSmeAssets = () => {
    return (
      Number(smeForm.assetsBuilding || 0) +
      Number(smeForm.assetsContents || 0) +
      Number(smeForm.assetsStock || 0) +
      Number(smeForm.assetsFixedEquipment || 0) +
      Number(smeForm.assetsPortableEquipment || 0) +
      Number(smeForm.assetsMedicalEquipment || 0) +
      Number(smeForm.assetsGlassSignage || 0)
    ).toLocaleString();
  };

  // Helper calculation for total profits sum
  const calculateTotalSmeProfits = () => {
    return (
      Number(smeForm.profitsAnnualGross || 0) +
      Number(smeForm.profitsAnnualRent || 0) +
      Number(smeForm.profitsIncreasedCost || 0)
    ).toLocaleString();
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 sm:py-14 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Horizontal Stepper Indicator (Consistent through flow) */}
        <JourneyStepper currentStep={2} />

        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Edit Business Credentials</span>
        </button>

        {/* Page Titles */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <ShieldCheck className="text-blue-900" size={28} />
            Complete Your Insurance Application
          </h1>
          <p className="text-slate-500 text-sm">
            Provide the remaining details for each cover you selected so our underwriters can prepare your quotes.
          </p>
        </div>

        {/* Main Workspace */}
        <div className="max-w-4xl mx-auto space-y-6">

            {/* POLICY TABS NAVIGATION */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">Your Selected Insurance Coverages:</p>
              <div className="flex flex-wrap gap-2">
                {selectedProducts.map((p, idx) => {
                  const satisfied = isTabSatisfied(p);
                  const isDigital = p === InsuranceProduct.DirectorsOfficers || isSmeRelated(p);
                  
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setActiveTabIdx(idx);
                        // Reset sub-steps for smooth UX
                        setSmeSubStep(0);
                        setDoSubStep(0);
                      }}
                      className={`py-2.5 px-4 rounded-xl text-xs font-black flex items-center gap-2 transition-all border cursor-pointer ${
                        activeTabIdx === idx
                          ? "bg-blue-900 border-blue-950 text-white shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="truncate max-w-[150px] sm:max-w-none">{p}</span>
                      {satisfied && (
                        <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0">
                          <Check size={11} className="stroke-[3]" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TAB CONTENT BLOCK */}
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden text-left">
              
              {/* Product Header Banner */}
              <div className="bg-slate-900 text-white px-6 sm:px-8 py-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase text-yellow-500 tracking-widest">Active Section</p>
                  <h3 className="text-sm sm:text-base font-black text-white">{activeProduct}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {(activeProduct === InsuranceProduct.DirectorsOfficers || isSmeRelated(activeProduct)) ? (
                    <span className="bg-blue-950 text-blue-300 text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-blue-900/40 flex items-center gap-1">
                      <Sparkles size={11} className="fill-blue-300/10 text-blue-300" />
                      Auto-Filled Portal Match
                    </span>
                  ) : (
                    <span className="bg-emerald-950 text-emerald-300 text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-900/40 flex items-center gap-1">
                      <FileDown size={11} />
                      Download & Upload Required
                    </span>
                  )}
                </div>
              </div>

              {/* 1. D&O LIABILITY INTERACTIVE DIGITAL FORM */}
              {activeProduct === InsuranceProduct.DirectorsOfficers && (
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Sub-steps navigation within D&O Form */}
                  <div className="grid grid-cols-3 gap-1 border-b border-slate-100 pb-3">
                    {["1. Your Details & Entity", "2. Management & Staff", "3. Covenants & Cover"].map((step, idx) => (
                      <button
                        key={step}
                        type="button"
                        onClick={() => setDoSubStep(idx)}
                        className={`py-2 px-1 text-center text-[10px] sm:text-xs font-black border-b-2 transition-all cursor-pointer ${
                          doSubStep === idx 
                            ? "border-blue-900 text-blue-900 font-extrabold" 
                            : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>

                  {/* D&O SUB-STEP 1: YOUR DETAILS & ENTITY */}
                  {doSubStep === 0 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Part 1: Insured Corporate Details</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-500">Full Name of Insured Entities</label>
                          <input type="text" disabled value={doForm.entitiesToInsure} className="w-full bg-slate-50 border border-slate-200 text-slate-600 py-2.5 px-4 rounded-xl text-xs font-bold outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-500">Principal Trade Address</label>
                          <input type="text" disabled value={doForm.principalAddress} className="w-full bg-slate-50 border border-slate-200 text-slate-600 py-2.5 px-4 rounded-xl text-xs font-bold outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Address of Branch Offices / Overseas Locations</label>
                          <input 
                            type="text" 
                            value={doForm.branchOfficesLocations}
                            onChange={(e) => setDoForm({...doForm, branchOfficesLocations: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Country of Registration</label>
                          <input 
                            type="text" 
                            value={doForm.countryOfRegistration}
                            onChange={(e) => setDoForm({...doForm, countryOfRegistration: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Date of Establishment / Incorporation</label>
                          <input 
                            type="date" 
                            value={doForm.dateOfEstablishment}
                            onChange={(e) => setDoForm({...doForm, dateOfEstablishment: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Is the Company Private / Public / Listed?</label>
                          <div className="flex gap-2">
                            <label className="flex items-center gap-1.5 text-xs font-bold bg-slate-50 py-2.5 px-3 rounded-xl border border-slate-200 cursor-pointer flex-1 justify-center">
                              <input type="checkbox" checked={doForm.isPrivateCompany === "Yes"} onChange={(e) => setDoForm({...doForm, isPrivateCompany: e.target.checked ? "Yes" : "No"})} className="rounded text-blue-900" />
                              <span>Private</span>
                            </label>
                            <label className="flex items-center gap-1.5 text-xs font-bold bg-slate-50 py-2.5 px-3 rounded-xl border border-slate-200 cursor-pointer flex-1 justify-center">
                              <input type="checkbox" checked={doForm.isPublicCompany === "Yes"} onChange={(e) => setDoForm({...doForm, isPublicCompany: e.target.checked ? "Yes" : "No"})} className="rounded text-blue-900" />
                              <span>Public</span>
                            </label>
                            <label className="flex items-center gap-1.5 text-xs font-bold bg-slate-50 py-2.5 px-3 rounded-xl border border-slate-200 cursor-pointer flex-1 justify-center">
                              <input type="checkbox" checked={doForm.isListedOnExchange === "Yes"} onChange={(e) => setDoForm({...doForm, isListedOnExchange: e.target.checked ? "Yes" : "No"})} className="rounded text-blue-900" />
                              <span>Listed</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Past 3 Years Changes Checkboxes */}
                      <div className="space-y-3.5 pt-4 border-t border-slate-100">
                        <p className="text-xs font-black text-slate-800">During the past 3 years, has:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                            <span className="text-[11px] font-bold text-slate-600">The name of the company changed?</span>
                            <select value={doForm.nameChangedPast3Years} onChange={(e) => setDoForm({...doForm, nameChangedPast3Years: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2.5 rounded-lg outline-none cursor-pointer">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                            <span className="text-[11px] font-bold text-slate-600">Any merger or acquisition taken place?</span>
                            <select value={doForm.mergerAcquisitionPast3Years} onChange={(e) => setDoForm({...doForm, mergerAcquisitionPast3Years: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2.5 rounded-lg outline-none cursor-pointer">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                            <span className="text-[11px] font-bold text-slate-600">Any subsidiary been sold or ceased trading?</span>
                            <select value={doForm.subsidiarySoldPast3Years} onChange={(e) => setDoForm({...doForm, subsidiarySoldPast3Years: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2.5 rounded-lg outline-none cursor-pointer">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-xl">
                            <span className="text-[11px] font-bold text-slate-600">The capital structure of the company changed?</span>
                            <select value={doForm.capitalStructureChangedPast3Years} onChange={(e) => setDoForm({...doForm, capitalStructureChangedPast3Years: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2.5 rounded-lg outline-none cursor-pointer">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </div>
                        </div>
                        {(doForm.nameChangedPast3Years === "Yes" || doForm.mergerAcquisitionPast3Years === "Yes" || doForm.subsidiarySoldPast3Years === "Yes" || doForm.capitalStructureChangedPast3Years === "Yes") && (
                          <div className="space-y-1 animate-in slide-in-from-top-1">
                            <label className="text-[11px] font-black text-slate-700">Please provide full details of change:</label>
                            <textarea value={doForm.changesDetails} onChange={(e) => setDoForm({...doForm, changesDetails: e.target.value})} className="w-full bg-white border border-slate-200 text-xs p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-900" rows={2} placeholder="Explain dates, names, structural impacts..." />
                          </div>
                        )}
                      </div>

                      {/* North American Exposures */}
                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <p className="text-xs font-black text-slate-800">North American (USA/Canada) Corporate Exposures:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <label className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold cursor-pointer">
                            <span>Any NA Assets?</span>
                            <select value={doForm.assetsInNorthAmerica} onChange={(e) => setDoForm({...doForm, assetsInNorthAmerica: e.target.value})} className="bg-white border text-[10px] font-black py-0.5 px-1.5 rounded-md">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </label>
                          <label className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold cursor-pointer">
                            <span>Any NA Traded Debt?</span>
                            <select value={doForm.tradedDebtInNorthAmerica} onChange={(e) => setDoForm({...doForm, tradedDebtInNorthAmerica: e.target.value})} className="bg-white border text-[10px] font-black py-0.5 px-1.5 rounded-md">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </label>
                          <label className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold cursor-pointer">
                            <span>Any NA Traded Equity?</span>
                            <select value={doForm.equitySecuritiesTradedInNorthAmerica} onChange={(e) => setDoForm({...doForm, equitySecuritiesTradedInNorthAmerica: e.target.value})} className="bg-white border text-[10px] font-black py-0.5 px-1.5 rounded-md">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400 font-bold">Progress: Page 1 of 3</span>
                        <button type="button" onClick={() => setDoSubStep(1)} className="bg-blue-900 text-white font-black py-2 px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer">
                          <span>Next: Staff & Ownership</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* D&O SUB-STEP 2: MANAGEMENT & STAFF */}
                  {doSubStep === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Part 2: Staff, Ownership & Subsidiaries</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Total Number of Directors</label>
                          <input 
                            type="number" 
                            value={doForm.totalNumberOfDirectors}
                            onChange={(e) => setDoForm({...doForm, totalNumberOfDirectors: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Total Number of Shareholders</label>
                          <input 
                            type="number" 
                            value={doForm.totalNumberOfShareholders}
                            onChange={(e) => setDoForm({...doForm, totalNumberOfShareholders: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">% Shares Owned by Board</label>
                          <input 
                            type="text" 
                            value={doForm.totalPercentageOwnedByDirectors}
                            onChange={(e) => setDoForm({...doForm, totalPercentageOwnedByDirectors: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" 
                          />
                        </div>
                      </div>

                      {/* Shareholders list (>15% block) */}
                      <div className="space-y-2.5 pt-2">
                        <p className="text-xs font-black text-slate-800">List of Shareholders holding &gt;15% equity:</p>
                        <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl space-y-2">
                          {doForm.shareholdersList.map((sh, sIdx) => (
                            <div key={sIdx} className="grid grid-cols-12 gap-2 items-center">
                              <div className="col-span-6">
                                <input type="text" value={sh.name} onChange={(e) => {
                                  const newList = [...doForm.shareholdersList];
                                  newList[sIdx].name = e.target.value;
                                  setDoForm({...doForm, shareholdersList: newList});
                                }} className="bg-white border border-slate-200 text-xs font-bold p-1.5 w-full rounded-lg" placeholder="Shareholder Name" />
                              </div>
                              <div className="col-span-3">
                                <input type="text" value={sh.percentage} onChange={(e) => {
                                  const newList = [...doForm.shareholdersList];
                                  newList[sIdx].percentage = e.target.value;
                                  setDoForm({...doForm, shareholdersList: newList});
                                }} className="bg-white border border-slate-200 text-xs font-mono font-bold p-1.5 w-full rounded-lg text-center" placeholder="Share %" />
                              </div>
                              <div className="col-span-3 flex items-center justify-between">
                                <select value={sh.representedOnBoard} onChange={(e) => {
                                  const newList = [...doForm.shareholdersList];
                                  newList[sIdx].representedOnBoard = e.target.value;
                                  setDoForm({...doForm, shareholdersList: newList});
                                }} className="bg-white border border-slate-200 text-xs font-bold p-1 rounded-lg">
                                  <option>Yes</option>
                                  <option>No</option>
                                </select>
                                <button type="button" onClick={() => {
                                  setDoForm({...doForm, shareholdersList: doForm.shareholdersList.filter((_, i) => i !== sIdx)});
                                }} className="text-red-500 hover:text-red-700 cursor-pointer p-1">
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                          <button type="button" onClick={() => {
                            setDoForm({...doForm, shareholdersList: [...doForm.shareholdersList, { name: "", percentage: "", representedOnBoard: "No" }]});
                          }} className="text-blue-900 text-[10px] font-black flex items-center gap-1 mt-1 hover:underline cursor-pointer">
                            <Plus size={12} />
                            <span>Add Shareholder Row</span>
                          </button>
                        </div>
                      </div>

                      {/* Audit & Executive Covenants */}
                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <p className="text-xs font-black text-slate-800">Compliance & Financial Integrity:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold">
                            <span>Has any Board member resigned in past 12m?</span>
                            <select value={doForm.officersResignedPast12Months} onChange={(e) => setDoForm({...doForm, officersResignedPast12Months: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2 rounded-lg">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </label>
                          <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold">
                            <span>Auditing firm changed in last 5 years?</span>
                            <select value={doForm.auditingFirmChangedPast5Years} onChange={(e) => setDoForm({...doForm, auditingFirmChangedPast5Years: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2 rounded-lg">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </label>
                          <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold">
                            <span>Any restatement of financial results?</span>
                            <select value={doForm.restatedFinancialResultsPast5Years} onChange={(e) => setDoForm({...doForm, restatedFinancialResultsPast5Years: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2 rounded-lg">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </label>
                          <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold">
                            <span>Breached any bank/debt covenants?</span>
                            <select value={doForm.breachedDebtCovenantsPast12Months} onChange={(e) => setDoForm({...doForm, breachedDebtCovenantsPast12Months: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2 rounded-lg">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setDoSubStep(0)} className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-2 px-4 rounded-xl text-xs cursor-pointer">
                          Back
                        </button>
                        <button type="button" onClick={() => setDoSubStep(2)} className="bg-blue-900 text-white font-black py-2 px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer">
                          <span>Next: Claims & Save</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* D&O SUB-STEP 3: COVENANTS & COVER */}
                  {doSubStep === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Part 3: Claims History & Cover Limits Requested</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700 font-sans">Limit of Indemnity Required</label>
                          <select 
                            value={doForm.limitOfIndemnityRequired}
                            onChange={(e) => setDoForm({...doForm, limitOfIndemnityRequired: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none cursor-pointer"
                          >
                            <option>AED 1,000,000</option>
                            <option>AED 2,000,000</option>
                            <option>AED 5,000,000</option>
                            <option>AED 10,000,000</option>
                            <option>AED 20,000,000</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Deductible / Excess Required</label>
                          <select 
                            value={doForm.deductibleExcessRequired}
                            onChange={(e) => setDoForm({...doForm, deductibleExcessRequired: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none cursor-pointer"
                          >
                            <option>AED 10,000</option>
                            <option>AED 25,000</option>
                            <option>AED 50,000</option>
                            <option>AED 100,000</option>
                          </select>
                        </div>
                      </div>

                      {/* Insurance Refusals & Legal Claims */}
                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <p className="text-xs font-black text-slate-800">Claims History (Past 10 Years):</p>
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold">
                            <span>Have you ever been refused professional/D&O liability insurance?</span>
                            <select value={doForm.refusedOrCancelledDOInsurance} onChange={(e) => setDoForm({...doForm, refusedOrCancelledDOInsurance: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2.5 rounded-lg">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold">
                            <span>Has the company ever been subject to a formal investigation?</span>
                            <select value={doForm.subjectToFormalInvestigation} onChange={(e) => setDoForm({...doForm, subjectToFormalInvestigation: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2.5 rounded-lg">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold">
                            <span>Any claims/allegations of liability against board in last 10 years?</span>
                            <select value={doForm.claimsPast10Years} onChange={(e) => setDoForm({...doForm, claimsPast10Years: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2.5 rounded-lg">
                              <option>No</option>
                              <option>Yes</option>
                            </select>
                          </div>
                        </div>
                        {(doForm.refusedOrCancelledDOInsurance === "Yes" || doForm.subjectToFormalInvestigation === "Yes" || doForm.claimsPast10Years === "Yes") && (
                          <div className="space-y-1.5 animate-in slide-in-from-top-1 bg-red-50/50 border border-red-100 p-3 rounded-xl">
                            <label className="text-[11px] font-black text-red-800 flex items-center gap-1">
                              <ShieldAlert size={12} />
                              <span>Please provide full claims/disciplinary details:</span>
                            </label>
                            <textarea value={doForm.refusedInsuranceDetails} onChange={(e) => setDoForm({...doForm, refusedInsuranceDetails: e.target.value})} className="w-full bg-white border border-slate-200 text-xs p-2.5 rounded-xl outline-none" rows={2} placeholder="Include dates, sums paid, litigation details..." />
                          </div>
                        )}
                      </div>

                      {/* Declaration */}
                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={doForm.agreedToDeclaration}
                            onChange={(e) => setDoForm({...doForm, agreedToDeclaration: e.target.checked})}
                            className="w-4 h-4 rounded border-slate-200 mt-0.5 text-blue-900 focus:ring-blue-900 cursor-pointer" 
                          />
                          <span className="text-[11px] text-slate-500 font-bold leading-relaxed">
                            We declare that all particulars herein are correct, that we have fulfilled our legal duty of disclosure, and that this document forms the commercial basis of our D&O underwriting.
                          </span>
                        </label>

                        <div className="flex justify-between items-center pt-2">
                          <button type="button" onClick={() => setDoSubStep(1)} className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-2 px-4 rounded-xl text-xs cursor-pointer">
                            Back
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setDoFormSaved(true);
                              alert("Directors & Officers Liability Proposal Form Saved ✓");
                            }}
                            disabled={!doForm.agreedToDeclaration}
                            className={`py-2.5 px-6 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md ${
                              doFormSaved 
                                ? "bg-green-600 hover:bg-green-700 text-white shadow-green-500/10" 
                                : "bg-blue-900 hover:bg-blue-800 text-white shadow-blue-900/10"
                            }`}
                          >
                            <CheckCircle size={14} />
                            <span>{doFormSaved ? "D&O Proposal Saved ✓" : "Save D&O Proposal"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* 2. SME PACKAGE INTERACTIVE DIGITAL FORM */}
              {isSmeRelated(activeProduct) && (
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Sub-steps navigation within SME Form */}
                  <div className="grid grid-cols-4 gap-1 border-b border-slate-100 pb-3">
                    {["1. Premises Details", "2. Core Assets", "3. Employees & Cash", "4. Risk Assessment"].map((step, idx) => (
                      <button
                        key={step}
                        type="button"
                        onClick={() => setSmeSubStep(idx)}
                        className={`py-2 px-1 text-center text-[9px] sm:text-xs font-black border-b-2 transition-all cursor-pointer ${
                          smeSubStep === idx 
                            ? "border-blue-900 text-blue-900 font-extrabold" 
                            : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>

                  {/* SME SUB-STEP 1: PREMISES DETAILS */}
                  {smeSubStep === 0 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Part 1: Sourcing & Location Profile</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-500">Proposed Product Class</label>
                          <select 
                            value={smeForm.productType}
                            onChange={(e) => setSmeForm({...smeForm, productType: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none cursor-pointer"
                          >
                            <option>Office</option>
                            <option>Retail</option>
                            <option>Food & Beverage</option>
                            <option>Educare</option>
                            <option>Personal Care</option>
                            <option>Clinicare</option>
                            <option>Property Owners</option>
                            <option>Employee Protector</option>
                            <option>Other / Select</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-500">Company Insured Name</label>
                          <input type="text" disabled value={smeForm.companyInsuredName} className="w-full bg-slate-50 border border-slate-200 text-slate-500 py-2.5 px-4 rounded-xl text-xs font-bold outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Nature of Business at Premises</label>
                          <input type="text" disabled value={smeForm.natureOfBusiness} className="w-full bg-slate-50 border border-slate-200 text-slate-500 py-2.5 px-4 rounded-xl text-xs font-bold outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Address of Insured Premises</label>
                          <input 
                            type="text" 
                            value={smeForm.addressOfPremises}
                            onChange={(e) => setSmeForm({...smeForm, addressOfPremises: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700 font-mono">PO Box</label>
                          <input 
                            type="text" 
                            value={smeForm.poBox}
                            onChange={(e) => setSmeForm({...smeForm, poBox: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none font-mono" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Area / Zone</label>
                          <input 
                            type="text" 
                            value={smeForm.area}
                            onChange={(e) => setSmeForm({...smeForm, area: e.target.value})}
                            className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" 
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t border-slate-100 font-sans">
                        <span className="text-[11px] text-slate-400 font-bold">Progress: Page 1 of 4</span>
                        <button type="button" onClick={() => setSmeSubStep(1)} className="bg-blue-900 text-white font-black py-2 px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer">
                          <span>Next: Core Assets & Limits</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SME SUB-STEP 2: CORE ASSETS */}
                  {smeSubStep === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Part 2: Core Asset Valuation (Property All Risks)</h4>
                        <p className="text-[10px] text-slate-400 font-bold">Declare exact valuations in AED for property, fixtures, and inventory.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Building Valuation Sum</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-black">AED</span>
                            <input type="number" value={smeForm.assetsBuilding} onChange={(e) => setSmeForm({...smeForm, assetsBuilding: e.target.value})} className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 pl-12 pr-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Contents, Furniture, Fixtures & Improvements</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-black">AED</span>
                            <input type="number" value={smeForm.assetsContents} onChange={(e) => setSmeForm({...smeForm, assetsContents: e.target.value})} className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 pl-12 pr-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Stock in Trade Valuation</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-black">AED</span>
                            <input type="number" value={smeForm.assetsStock} onChange={(e) => setSmeForm({...smeForm, assetsStock: e.target.value})} className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 pl-12 pr-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Fixed Equipment (Desktops, Servers, Printers)</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-black">AED</span>
                            <input type="number" value={smeForm.assetsFixedEquipment} onChange={(e) => setSmeForm({...smeForm, assetsFixedEquipment: e.target.value})} className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 pl-12 pr-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Portable Equipment (Laptops, Phones)</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-black">AED</span>
                            <input type="number" value={smeForm.assetsPortableEquipment} onChange={(e) => setSmeForm({...smeForm, assetsPortableEquipment: e.target.value})} className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 pl-12 pr-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-black text-slate-700">Breakage of Fixed Glass / Signage</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-black">AED</span>
                            <input type="number" value={smeForm.assetsGlassSignage} onChange={(e) => setSmeForm({...smeForm, assetsGlassSignage: e.target.value})} className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 pl-12 pr-4 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex justify-between items-center">
                        <span className="text-xs font-black text-slate-500 uppercase">Cumulative Assets Valuation Sourced:</span>
                        <span className="text-sm font-black text-blue-900">AED {calculateTotalSmeAssets()}</span>
                      </div>

                      {/* Your Profits & Liability Limit */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Business Continuity & Liability Limit</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-[11px] font-black text-slate-700">Annual Gross Profit</label>
                            <input type="number" value={smeForm.profitsAnnualGross} onChange={(e) => setSmeForm({...smeForm, profitsAnnualGross: e.target.value})} className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-black text-slate-700">Annual Rent</label>
                            <input type="number" value={smeForm.profitsAnnualRent} onChange={(e) => setSmeForm({...smeForm, profitsAnnualRent: e.target.value})} className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none" />
                          </div>
                          <div className="space-y-1 font-sans">
                            <label className="text-[11px] font-black text-slate-700">Requested Public Liability Limit</label>
                            <select value={smeForm.liabilityLimit} onChange={(e) => setSmeForm({...smeForm, liabilityLimit: e.target.value})} className="w-full bg-white border border-slate-200 text-slate-800 py-2.5 px-3 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-900 outline-none cursor-pointer">
                              <option>AED 500,000</option>
                              <option>AED 1,000,000</option>
                              <option>AED 2,000,000</option>
                              <option>AED 2,500,000</option>
                              <option>AED 3,000,000</option>
                              <option>AED 4,000,000</option>
                              <option>AED 5,000,000</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setSmeSubStep(0)} className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-2 px-4 rounded-xl text-xs cursor-pointer">
                          Back
                        </button>
                        <button type="button" onClick={() => setSmeSubStep(2)} className="bg-blue-900 text-white font-black py-2 px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer">
                          <span>Next: Employees & Money Covers</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SME SUB-STEP 3: EMPLOYEES & CASH */}
                  {smeSubStep === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Part 3: Workmen's Compensation & Money Covers</h4>
                        <p className="text-[10px] text-slate-400 font-bold">Details regarding corporate employees, payroll levels, and daily cash limits.</p>
                      </div>

                      {/* Employees count */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50 border border-slate-150 p-4 rounded-2xl">
                        <div className="space-y-2">
                          <p className="text-[11px] font-black text-slate-800 uppercase">A. Administrative (Non-Manual) Employees:</p>
                          <div className="grid grid-cols-2 gap-2">
                            <input type="number" value={smeForm.employeesAdminCount} onChange={(e) => setSmeForm({...smeForm, employeesAdminCount: e.target.value})} className="bg-white border text-xs font-bold p-2 rounded-xl" placeholder="Total Count" />
                            <input type="number" value={smeForm.employeesAdminSalaries} onChange={(e) => setSmeForm({...smeForm, employeesAdminSalaries: e.target.value})} className="bg-white border text-xs font-mono font-bold p-2 rounded-xl" placeholder="Gross Salaries" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[11px] font-black text-slate-800 uppercase">B. Manual Labour/Operational Employees:</p>
                          <div className="grid grid-cols-2 gap-2">
                            <input type="number" value={smeForm.employeesManualCount} onChange={(e) => setSmeForm({...smeForm, employeesManualCount: e.target.value})} className="bg-white border text-xs font-bold p-2 rounded-xl" placeholder="Total Count" />
                            <input type="number" value={smeForm.employeesManualSalaries} onChange={(e) => setSmeForm({...smeForm, employeesManualSalaries: e.target.value})} className="bg-white border text-xs font-mono font-bold p-2 rounded-xl" placeholder="Gross Salaries" />
                          </div>
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-black text-slate-700">Is 24Hr Personal Accident cover required for staff?</label>
                          <select value={smeForm.personalAccident24Hr} onChange={(e) => setSmeForm({...smeForm, personalAccident24Hr: e.target.value})} className="bg-white border text-xs font-bold p-2 w-full rounded-xl cursor-pointer">
                            <option>No</option>
                            <option>Yes</option>
                          </select>
                        </div>
                      </div>

                      {/* Money cash on premises */}
                      <div className="space-y-3 pt-2">
                        <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Your Cash (Money Cover limits):</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1 bg-white border p-3 rounded-xl">
                            <span className="text-[10px] font-black text-slate-500">In Locked Safe/Strong Room</span>
                            <input type="number" value={smeForm.cashClosedInSafe} onChange={(e) => setSmeForm({...smeForm, cashClosedInSafe: e.target.value})} className="w-full bg-slate-50 font-bold text-xs p-1.5 rounded-lg border border-slate-100" />
                          </div>
                          <div className="space-y-1 bg-white border p-3 rounded-xl">
                            <span className="text-[10px] font-black text-slate-500">Closed (Not in Locked Safe)</span>
                            <input type="number" value={smeForm.cashClosedNotSafe} onChange={(e) => setSmeForm({...smeForm, cashClosedNotSafe: e.target.value})} className="w-full bg-slate-50 font-bold text-xs p-1.5 rounded-lg border border-slate-100" />
                          </div>
                          <div className="space-y-1 bg-white border p-3 rounded-xl">
                            <span className="text-[10px] font-black text-slate-500">During Working Hours (Open)</span>
                            <input type="number" value={smeForm.cashOpenHours} onChange={(e) => setSmeForm({...smeForm, cashOpenHours: e.target.value})} className="w-full bg-slate-50 font-bold text-xs p-1.5 rounded-lg border border-slate-100" />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-4 border-t border-slate-100">
                        <button type="button" onClick={() => setSmeSubStep(1)} className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-2 px-4 rounded-xl text-xs cursor-pointer">
                          Back
                        </button>
                        <button type="button" onClick={() => setSmeSubStep(3)} className="bg-blue-900 text-white font-black py-2 px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer">
                          <span>Next: Risk Assessment</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SME SUB-STEP 4: RISK ASSESSMENT */}
                  {smeSubStep === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Part 4: Risk Engineering Details & Safety Declarations</h4>
                        <p className="text-[10px] text-slate-400 font-bold">Declare physical fire, security protections, warehousing, and construction structure.</p>
                      </div>

                      {/* Fire and security checkboxes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50 border border-slate-150 p-4 rounded-2xl">
                        <div className="space-y-2">
                          <p className="text-[11px] font-black text-slate-800">Fire Protection Measures (Select all):</p>
                          <div className="space-y-1.5 text-xs font-bold text-slate-600">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={smeForm.fireSprinkler} onChange={(e) => setSmeForm({...smeForm, fireSprinkler: e.target.checked})} className="rounded text-blue-900" /><span>Sprinkler System</span></label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={smeForm.fireExtinguisher} onChange={(e) => setSmeForm({...smeForm, fireExtinguisher: e.target.checked})} className="rounded text-blue-900" /><span>Extinguishers</span></label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={smeForm.fireHoseReel} onChange={(e) => setSmeForm({...smeForm, fireHoseReel: e.target.checked})} className="rounded text-blue-900" /><span>Hose Reels</span></label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={smeForm.fireAlarm} onChange={(e) => setSmeForm({...smeForm, fireAlarm: e.target.checked})} className="rounded text-blue-900" /><span>Central Smoke Alarm</span></label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[11px] font-black text-slate-800">Security Measures (Select all):</p>
                          <div className="space-y-1.5 text-xs font-bold text-slate-600">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={smeForm.security24Hr} onChange={(e) => setSmeForm({...smeForm, security24Hr: e.target.checked})} className="rounded text-blue-900" /><span>24-Hour Active Security</span></label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={smeForm.securityBurglarAlarm} onChange={(e) => setSmeForm({...smeForm, securityBurglarAlarm: e.target.checked})} className="rounded text-blue-900" /><span>Burglar Alarm System</span></label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={smeForm.securityGrills} onChange={(e) => setSmeForm({...smeForm, securityGrills: e.target.checked})} className="rounded text-blue-900" /><span>Security Grills / Shutters</span></label>
                          </div>
                        </div>
                      </div>

                      {/* Warehousing details */}
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold">
                          <span>Does your business utilize the Insured premises for warehousing?</span>
                          <select value={smeForm.usePremisesWarehousing} onChange={(e) => setSmeForm({...smeForm, usePremisesWarehousing: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2.5 rounded-lg outline-none">
                            <option>No</option>
                            <option>Yes</option>
                          </select>
                        </div>
                        {smeForm.usePremisesWarehousing === "Yes" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-3.5 bg-yellow-50/50 border border-yellow-200/60 rounded-xl animate-in slide-in-from-top-1">
                            <input type="text" value={smeForm.warehouseAreaSqFt} onChange={(e) => setSmeForm({...smeForm, warehouseAreaSqFt: e.target.value})} className="bg-white border text-xs p-2 rounded-lg" placeholder="Warehouse Area (sq/ft)" />
                            <input type="text" value={smeForm.warehouseStockType} onChange={(e) => setSmeForm({...smeForm, warehouseStockType: e.target.value})} className="bg-white border text-xs p-2 rounded-lg" placeholder="Type of Stock Stored" />
                          </div>
                        )}
                      </div>

                      {/* Construction Details */}
                      <div className="space-y-3 pt-2">
                        <p className="text-xs font-black text-slate-800">Premises Physical Construction (Reinforced Concrete):</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <label className="flex flex-col gap-1 text-[11px] font-bold">
                            <span>Fully Reinforced RCC?</span>
                            <select value={smeForm.premisesFullyReinforcedConcrete} onChange={(e) => setSmeForm({...smeForm, premisesFullyReinforcedConcrete: e.target.value})} className="bg-white border text-xs font-bold p-2 rounded-xl cursor-pointer">
                              <option>Yes</option>
                              <option>No</option>
                            </select>
                          </label>
                          <label className="flex flex-col gap-1 text-[11px] font-bold">
                            <span>Year of Construction</span>
                            <input type="text" value={smeForm.buildingYearOfConstruction} onChange={(e) => setSmeForm({...smeForm, buildingYearOfConstruction: e.target.value})} className="bg-white border text-xs font-bold p-2 rounded-xl" />
                          </label>
                          <label className="flex flex-col gap-1 text-[11px] font-bold">
                            <span>Number of Floors</span>
                            <input type="text" value={smeForm.buildingFloorsCount} onChange={(e) => setSmeForm({...smeForm, buildingFloorsCount: e.target.value})} className="bg-white border text-xs font-bold p-2 rounded-xl" />
                          </label>
                        </div>
                      </div>

                      {/* Claims Assessment past 4 years */}
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold">
                          <span>Have you had any incidents/insurance claims in the last 4 years?</span>
                          <select value={smeForm.claimsPast4Years} onChange={(e) => setSmeForm({...smeForm, claimsPast4Years: e.target.value})} className="bg-white border text-xs font-bold py-1 px-2.5 rounded-lg outline-none">
                            <option>No</option>
                            <option>Yes</option>
                          </select>
                        </div>
                        {smeForm.claimsPast4Years === "Yes" && (
                          <div className="space-y-1 animate-in slide-in-from-top-1">
                            <label className="text-[11px] font-black text-slate-700">Please provide claims details:</label>
                            <textarea value={smeForm.claimsPast4YearsDetails} onChange={(e) => setSmeForm({...smeForm, claimsPast4YearsDetails: e.target.value})} className="w-full bg-white border border-slate-200 text-xs p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-900" rows={2} placeholder="Explain dates, damage values, corrective actions..." />
                          </div>
                        )}
                      </div>

                      {/* Declaration */}
                      <div className="space-y-3 pt-4 border-t border-slate-100 font-sans">
                        <label className="flex items-start gap-3 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={smeForm.agreedToDeclaration}
                            onChange={(e) => setSmeForm({...smeForm, agreedToDeclaration: e.target.checked})}
                            className="w-4 h-4 rounded border-slate-200 mt-0.5 text-blue-900 focus:ring-blue-900 cursor-pointer" 
                          />
                          <span className="text-[11px] text-slate-500 font-bold leading-relaxed">
                            We certify that the above SME operational parameters, valuations, and construction metrics are true and represents the complete facts of our operational risk exposure.
                          </span>
                        </label>

                        <div className="flex justify-between items-center pt-2">
                          <button type="button" onClick={() => setSmeSubStep(2)} className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-2 px-4 rounded-xl text-xs cursor-pointer">
                            Back
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setSmeFormSaved(true);
                              alert("SME Proposal Form Saved ✓");
                            }}
                            disabled={!smeForm.agreedToDeclaration}
                            className={`py-2.5 px-6 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md ${
                              smeFormSaved 
                                ? "bg-green-600 hover:bg-green-700 text-white shadow-green-500/10" 
                                : "bg-blue-900 hover:bg-blue-800 text-white shadow-blue-900/10"
                            }`}
                          >
                            <CheckCircle size={14} />
                            <span>{smeFormSaved ? "SME Proposal Saved ✓" : "Save SME Proposal"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* 3. OFFLINE MANUAL DOWNLOAD & UPLOAD HUB */}
              {activeProduct !== InsuranceProduct.DirectorsOfficers && !isSmeRelated(activeProduct) && (
                <div className="p-6 sm:p-10 space-y-8 text-left">
                  
                  {/* Informative Header card */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3 text-amber-900">
                    <AlertCircle className="shrink-0 mt-0.5 text-amber-600" size={18} />
                    <div className="space-y-1">
                      <h4 className="text-xs font-black">Offline Template Sourcing Required</h4>
                      <p className="text-[11px] leading-relaxed text-amber-800">
                        The underwriting parameters for <span className="font-extrabold">{activeProduct}</span> are highly specific. Please download the template pack, populate the details offline, and upload it back here.
                      </p>
                    </div>
                  </div>

                  {/* STEP 1: DOWNLOAD FILE */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">1. Download Underwriting PDF Template:</p>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); alert(`${activeProduct} Proposal Template downloaded successfully!`); }}
                      className="inline-flex items-center gap-3 border border-blue-100 bg-blue-50/50 hover:bg-blue-50 py-3.5 px-5 rounded-2xl cursor-pointer transition-colors max-w-full"
                    >
                      <FileDown size={18} className="text-blue-900" />
                      <div>
                        <p className="text-xs font-black text-slate-800 leading-none truncate max-w-[250px] sm:max-w-md">
                          {activeProduct.split(" ")[0]}_Underwriting_Proposal.pdf
                        </p>
                        <p className="text-[9px] text-slate-500 font-semibold mt-1">Standard corporate underwriting template (1.4 MB)</p>
                      </div>
                    </a>
                  </div>

                  {/* STEP 2: UPLOAD FILE */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">2. Upload Filled Proposal & Trade Documents:</p>
                    
                    <div
                      onClick={() => triggerUploadClick(activeProduct)}
                      className="border-2 border-dashed border-slate-200 hover:border-blue-900 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <UploadCloud size={32} className="text-slate-400 mx-auto mb-2" />
                      <p className="text-xs font-black text-slate-700">Click to upload completed {activeProduct.split(" ")[0]} PDF</p>
                      <p className="text-[10px] text-slate-400 mt-1">Supports filled underwriting PDFs, scans or supporting licenses</p>
                    </div>

                    {/* Simulation progress bar */}
                    {uploadingProduct === activeProduct && (
                      <div className="bg-white border border-slate-100 p-3.5 rounded-xl space-y-2 animate-pulse mt-3">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                          <span>Uploading Completed_{activeProduct.split(" ")[0]}_Underwriting_Form.pdf...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-900 h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                    )}

                    {/* Already uploaded list */}
                    {(uploadedFilesByProduct[activeProduct] || []).length > 0 && (
                      <div className="space-y-2 mt-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Uploaded Documents:</p>
                        {(uploadedFilesByProduct[activeProduct] || []).map((file, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between animate-in slide-in-from-top-1 duration-150">
                            <div className="flex items-center gap-2.5">
                              <CheckCircle className="text-green-500 fill-green-50 shrink-0" size={16} />
                              <div>
                                <p className="text-xs font-black text-slate-800">{file.name}</p>
                                <p className="text-[10px] text-slate-400 font-semibold">{file.size}</p>
                              </div>
                            </div>
                            <span className="text-[9.5px] bg-green-100 text-green-800 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Uploaded</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* Submit */}
            <div className="flex flex-col items-end gap-3 pt-2">
              <button
                type="button"
                disabled={!allTabsSatisfied || submitting}
                onClick={handleMasterSubmit}
                className={`w-full sm:w-auto py-3.5 px-8 rounded-2xl text-xs font-black text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  allTabsSatisfied && !submitting
                    ? "bg-yellow-400 hover:bg-yellow-500 text-blue-950 shadow-lg shadow-yellow-400/10"
                    : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>

              {!allTabsSatisfied && (
                <p className="text-[11px] text-slate-400 font-semibold text-right">
                  Complete the form (or upload the proposal PDF) for each selected cover to continue.
                </p>
              )}
            </div>

        </div>

      </div>
    </div>
  );
};
