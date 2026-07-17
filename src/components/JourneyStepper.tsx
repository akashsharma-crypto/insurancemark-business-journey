import React from "react";
import { Check, ChevronRight } from "lucide-react";

interface JourneyStepperProps {
  currentStep: 1 | 2 | 3;
}

const STEPS = [
  { step: 1, label: "Company Details" },
  { step: 2, label: "Application Form" },
  { step: 3, label: "Application Submitted" },
];

export const JourneyStepper: React.FC<JourneyStepperProps> = ({ currentStep }) => {
  return (
    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs flex items-center justify-between overflow-x-auto max-w-4xl mx-auto">
      {STEPS.map((s, idx) => {
        const isCompleted = s.step < currentStep;
        const isActive = s.step === currentStep;
        return (
          <React.Fragment key={s.step}>
            <div className="flex items-center gap-2.5 shrink-0">
              <div
                className={`w-8 h-8 rounded-full font-black flex items-center justify-center text-xs shrink-0 ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-yellow-400 text-blue-950 shadow-md shadow-yellow-400/20"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isCompleted ? <Check size={14} className="stroke-[3]" /> : s.step}
              </div>
              <div className="text-left">
                <p
                  className={`text-[10px] font-bold leading-none uppercase ${
                    isCompleted ? "text-green-600" : "text-slate-400"
                  }`}
                >
                  {isCompleted ? "Completed" : `Step ${s.step}`}
                </p>
                <p className={`text-xs font-black ${isActive || isCompleted ? "text-slate-800" : "text-slate-500"}`}>
                  {s.label}
                </p>
              </div>
            </div>
            {idx < STEPS.length - 1 && (
              <ChevronRight className="text-slate-200 hidden sm:block shrink-0" size={16} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
