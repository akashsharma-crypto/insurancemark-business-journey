import React, { useState } from "react";
import { InsuranceProduct, LeadFormState } from "./types";
import { PRODUCT_DETAILS_MAP } from "./data/products";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { InsuranceSelector } from "./components/InsuranceSelector";
import { MyAlfredPromo } from "./components/MyAlfredPromo";
import { AwardsSection } from "./components/AwardsSection";
import { ProductLandingPage } from "./components/ProductLandingPage";
import { MultiSelectView } from "./components/MultiSelectView";
import { QuoteFormView } from "./components/QuoteFormView";
import { ProceedOptionsView } from "./components/ProceedOptionsView";
import { ApplicationFormView } from "./components/ApplicationFormView";
import { ThankYouView } from "./components/ThankYouView";

type ViewType = "home" | "product" | "multi-select" | "webform" | "proceed" | "application" | "success";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct>(InsuranceProduct.WorkmenCompensation);
  const [webformPreselected, setWebformPreselected] = useState<InsuranceProduct[]>([]);
  const [activeInsuranceTab, setActiveInsuranceTab] = useState<"personal" | "business">("personal");

  // Submit cache & lead state
  const [submittedLead, setSubmittedLead] = useState<LeadFormState | null>(null);
  const [quoteResult, setQuoteResult] = useState<{
    refId: string;
    lead: LeadFormState;
  } | null>(null);

  // Router functions
  const handleGoHome = () => {
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProduct = (productId: InsuranceProduct) => {
    setSelectedProduct(productId);
    setCurrentView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewMoreProducts = () => {
    setCurrentView("multi-select");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectPersonalProduct = (productName: string) => {
    setWebformPreselected([]);
    setCurrentView("webform");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGetQuoteSingle = (productId: InsuranceProduct) => {
    setWebformPreselected([productId]);
    setCurrentView("webform");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinueMulti = (selectedProducts: InsuranceProduct[]) => {
    setWebformPreselected(selectedProducts);
    setCurrentView("webform");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 1 Completed (Lead Form submitted successfully)
  const handleLeadFormSuccess = (refId: string, lead: LeadFormState) => {
    setSubmittedLead(lead);
    // Route to Step 2: Proceed selection (Image 3)
    setCurrentView("proceed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 2 Completed via fast path (advisor booking or files uploader)
  const handleProceedCompleteFlow = (meetingDetails?: string, uploadedFiles?: string[]) => {
    if (!submittedLead) return;
    const refId = `OP-${Math.floor(100000 + Math.random() * 899999)}`;
    setQuoteResult({
      refId,
      lead: submittedLead
    });
    // Route directly to Step 4: Confirmation (Thank You)
    setCurrentView("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 2 Selected Online Filling (routes to Step 3 application forms)
  const handleSelectOnlineFill = () => {
    setCurrentView("application");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 3 Completed (digital form submitted)
  const handleApplicationComplete = (formType: string, submittedData: any) => {
    if (!submittedLead) return;
    const refId = `OP-${Math.floor(100000 + Math.random() * 899999)}`;
    setQuoteResult({
      refId,
      lead: submittedLead
    });
    // Route to Step 4: Confirmation (Thank You)
    setCurrentView("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSeeOtherInsurance = () => {
    // Return to product directory so they can choose other policies
    setCurrentView("multi-select");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine if Lead has been submitted to show Coordinator button in header (only after Step 1)
  const isLeadSubmitted = submittedLead !== null && currentView !== "home" && currentView !== "product" && currentView !== "multi-select" && currentView !== "webform";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      
      {/* Shared Brand Header */}
      <Header onGoHome={handleGoHome} showCoordinator={isLeadSubmitted} />

      {/* Main viewport */}
      <main className="flex-1">
        
        {(currentView === "home" || currentView === "multi-select") && (
          <div className="animate-in fade-in duration-200">
            <Hero
              activeTab={activeInsuranceTab}
              onTabChange={setActiveInsuranceTab}
              onSelectProduct={handleSelectProduct}
              onSelectPersonalProduct={handleSelectPersonalProduct}
              onViewMoreProducts={handleViewMoreProducts}
            />
            <InsuranceSelector
              activeTab={activeInsuranceTab}
              onViewMoreProducts={handleViewMoreProducts}
              onSelectPersonalProduct={handleSelectPersonalProduct}
            />
            <MyAlfredPromo />
            <AwardsSection />
          </div>
        )}

        {currentView === "product" && (
          <div className="animate-in fade-in duration-200">
            <ProductLandingPage 
              productId={selectedProduct}
              onBack={handleGoHome}
              onGetQuote={handleGetQuoteSingle}
            />
          </div>
        )}

        {currentView === "multi-select" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={(e) => { if (e.target === e.currentTarget) handleGoHome(); }}
          >
            <MultiSelectView
              onBack={handleGoHome}
              onContinue={handleContinueMulti}
              initialSelected={webformPreselected}
            />
          </div>
        )}

        {/* Step 1: Business & Contact Details */}
        {currentView === "webform" && (
          <div className="animate-in fade-in duration-200">
            <QuoteFormView 
              preselectedProducts={webformPreselected}
              onBack={handleGoHome}
              onSubmitSuccess={handleLeadFormSuccess}
            />
          </div>
        )}

        {/* Step 2: Coverage Details / Options to Proceed */}
        {currentView === "proceed" && submittedLead && (
          <div className="animate-in fade-in duration-200">
            <ProceedOptionsView 
              lead={submittedLead}
              onBack={() => setCurrentView("webform")}
              onSelectOnlineFill={handleSelectOnlineFill}
              onCompleteFlow={handleProceedCompleteFlow}
            />
          </div>
        )}

        {/* Step 3: Application Forms */}
        {currentView === "application" && submittedLead && (
          <div className="animate-in fade-in duration-200">
            <ApplicationFormView 
              lead={submittedLead}
              onBack={() => setCurrentView("proceed")}
              onCompleteFlow={handleApplicationComplete}
            />
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentView === "success" && quoteResult && (
          <div className="animate-in fade-in duration-200">
            <ThankYouView 
              refId={quoteResult.refId}
              lead={quoteResult.lead}
              onSeeOtherInsurance={handleSeeOtherInsurance}
            />
          </div>
        )}

      </main>

      {/* Trust Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-20 text-xs text-center space-y-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="font-semibold text-slate-200 uppercase tracking-widest text-[10px]">
            InsuranceMarket.ae - Powered by AFIA Insurance Brokerage Services L.L.C
          </p>
          <p className="max-w-3xl mx-auto text-slate-500 leading-relaxed text-[11px]">
            AFIA Insurance Brokerage Services L.L.C is licensed by the Central Bank of the UAE (Registration No. 42) and regulated strictly under UAE Federal Laws. AFIA is the registered trademark owner and provider of InsuranceMarket.ae, serving Dubai and all emirates since 1995.
          </p>
          <div className="flex justify-center gap-6 text-[10px] text-slate-400 font-semibold">
            <span>Central Bank Reg No. 42</span>
            <span>•</span>
            <span>Invest in Dubai Aligned</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Business</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
