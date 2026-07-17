import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface InsuranceSelectorProps {
  activeTab: "personal" | "business";
  onViewMoreProducts: () => void;
  onSelectPersonalProduct: (productName: string) => void;
}

export const InsuranceSelector: React.FC<InsuranceSelectorProps> = ({
  activeTab,
  onViewMoreProducts,
  onSelectPersonalProduct
}) => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {activeTab === "personal" ? (
          <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 shrink-0">
                <Sparkles size={18} className="text-yellow-600" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Need Immediate Assistance for Premium Personal Lines?</h4>
                <p className="text-xs text-slate-500">Compare customized health, yacht, or luxury home covers with Dubai's top advisors.</p>
              </div>
            </div>
            <button
              onClick={() => onSelectPersonalProduct("General Premium Cover")}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-xs transition-colors duration-150 whitespace-nowrap"
            >
              Instant Support
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-4">
            <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-8 sm:p-10 w-full max-w-4xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/5 blur-2xl rounded-full"></div>

              <div className="space-y-2 text-center sm:text-left">
                <span className="bg-yellow-400/10 text-yellow-400 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-yellow-400/20">
                  Multi-Product Advantage
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight leading-none">
                  Need Multiple Business Covers?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
                  Select several products (e.g., SME + Workmen Compensation + Public Liability) in a single request for absolute convenience.
                </p>
              </div>

              <button
                onClick={onViewMoreProducts}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-extrabold text-sm py-3.5 px-8 rounded-2xl shadow-lg shadow-yellow-400/10 flex items-center gap-2 group transition-all duration-200 shrink-0"
              >
                <span>Select Multiple Products</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-blue-900" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
