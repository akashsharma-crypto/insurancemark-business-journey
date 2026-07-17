import React, { useState } from "react";
import { InsuranceProduct } from "../types";
import { PRODUCT_DETAILS_MAP } from "../data/products";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Star, HelpCircle, ArrowUpRight } from "lucide-react";

interface ProductLandingPageProps {
  productId: InsuranceProduct;
  onBack: () => void;
  onGetQuote: (product: InsuranceProduct) => void;
}

export const ProductLandingPage: React.FC<ProductLandingPageProps> = ({
  productId,
  onBack,
  onGetQuote
}) => {
  const details = PRODUCT_DETAILS_MAP[productId];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!details) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl max-w-lg mx-auto my-20 shadow-xl border border-slate-100">
        <p className="text-slate-600 font-bold mb-4">Product details could not be found.</p>
        <button onClick={onBack} className="text-blue-900 font-bold flex items-center justify-center gap-2 mx-auto">
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Product Specific Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Breadcrumb / Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold transition-colors mb-8 cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-yellow-400" />
            <span>Back to All Products</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: content */}
            <div className="lg:col-span-8 space-y-6">
              <span className="bg-yellow-400/10 text-yellow-400 text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-yellow-400/20">
                Premium UAE Coverage
              </span>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-none text-white">
                {details.heroTagline}
              </h1>
              
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {details.longDescription}
              </p>

              {/* Get Quote CTA on the Hero Banner */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => onGetQuote(productId)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-extrabold text-sm py-4 px-8 rounded-2xl shadow-lg shadow-yellow-400/10 flex items-center justify-center gap-2 group transition-all duration-200"
                >
                  <span>Get Instant Quote</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-blue-900" />
                </button>
                
                <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
                  <ShieldCheck size={16} className="text-yellow-400" />
                  <span>Licensed under Central Bank standards</span>
                </div>
              </div>

            </div>

            {/* Right side: quick stats box */}
            <div className="lg:col-span-4 bg-slate-800/50 backdrop-blur-xs border border-slate-700/50 p-6 sm:p-8 rounded-2xl space-y-4">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-slate-300 font-bold ml-1">4.9/5 stars</span>
              </div>
              <p className="text-sm font-bold text-white leading-tight">Fastest Issuance Guarantee</p>
              <p className="text-xs text-slate-400">Our commercial underwriting specialists assist in matching activities and completing free-zone or DET requirements same-day.</p>
              
              <div className="border-t border-slate-700/60 pt-4">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Approved Licensors:</div>
                <p className="text-xs text-slate-300 mt-1 font-semibold">DET Dubai, DMCC, JAFZA, DIFC, DDA, MOHRE, DHA</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits & Details Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left side: benefits checkmarks */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">
                Key Benefits of Our {details.title}
              </h2>
              <p className="text-slate-500 text-sm">
                Each policy is tailored to align with UAE regulatory requirements and your business's size, protecting your bottom line from unexpected risk vectors.
              </p>

              <div className="space-y-4 pt-4">
                {details.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl items-start">
                    <CheckCircle2 size={18} className="text-blue-900 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: custom underwriting information */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
                Why Compare with Alfred?
              </h3>
              
              <div className="space-y-4 text-sm text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Unbiased Commercial Rates</h4>
                  <p className="text-xs text-slate-500 mt-1">We represent the major tier-1 UAE insurers, passing substantial bulk-buying discounts directly to you.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">MOHRE & Free-zone Compliance</h4>
                  <p className="text-xs text-slate-500 mt-1">Our templates and clauses are fully verified to comply with mainland licensors and all UAE free zone standards.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Dedicated Claims Advocate</h4>
                  <p className="text-xs text-slate-500 mt-1">In the event of a claim, we represent you to defend and secure fast payouts from the insurance providers.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => onGetQuote(productId)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Request Quote Form</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold font-display text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Find instant answers regarding regulatory guidelines and standard coverage limits.
            </p>
          </div>

          <div className="space-y-4">
            {details.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-xl overflow-hidden transition-shadow shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-blue-900 transition-colors"
                >
                  <span className="text-sm">{faq.question}</span>
                  <HelpCircle size={16} className={`text-slate-400 shrink-0 transition-transform ${openFaq === index ? "rotate-180 text-blue-900" : ""}`} />
                </button>
                
                {openFaq === index && (
                  <div className="p-5 border-t border-slate-50 bg-slate-50/50 text-xs text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
