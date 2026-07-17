import React, { useState } from "react";
import { Phone, Star, Award, User, MessageSquare, Clock, Check, X, Calendar, Video, Loader2 } from "lucide-react";

interface HeaderProps {
  onGoHome: () => void;
  showCoordinator?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onGoHome, showCoordinator = false }) => {
  const [showCoordinatorPopup, setShowCoordinatorPopup] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo Group */}
          <div
            onClick={onGoHome}
            className="flex items-center cursor-pointer group shrink-0"
          >
            <img
              src="/assets/im-logo.png"
              alt="InsuranceMarket.ae"
              className="h-9 sm:h-11 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-200"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Trust and Phone widgets / Coordinator Button */}
          <div className="flex items-center gap-4 sm:gap-6 relative">
            
            {showCoordinator ? (
              // COORDINATOR BUTTON (Visible after Lead Submission - Image 2/3 style)
              <div className="relative">
                <button
                  onClick={() => setShowCoordinatorPopup(!showCoordinatorPopup)}
                  className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-3 sm:px-4 rounded-full flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-150 shadow-md shadow-blue-900/10 border border-blue-950"
                >
                  {/* Avatar Circle */}
                  <div className="w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center shrink-0 border border-amber-300 overflow-hidden">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="45" r="23" fill="#fed7aa" />
                      <circle cx="41" cy="43" r="8" fill="none" stroke="#1e293b" strokeWidth="3" />
                      <circle cx="59" cy="43" r="8" fill="none" stroke="#1e293b" strokeWidth="3" />
                      <line x1="49" y1="43" x2="51" y2="43" stroke="#1e293b" strokeWidth="3" />
                      <path d="M 30,80 C 30,68 40,64 50,64 C 60,64 70,68 70,80" fill="#0f172a" />
                      <path d="M 45,56 Q 50,60 55,56" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="text-left hidden xs:block">
                    <p className="text-[9px] text-blue-200 uppercase font-black tracking-wider leading-none">Your Coordinator</p>
                    <p className="text-[11px] font-black text-white leading-tight">Alfred Senior</p>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping shrink-0"></div>
                </button>

                {/* Interactive Coordinator Floating Details Card */}
                {showCoordinatorPopup && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-5 z-50 animate-in fade-in slide-in-from-top-3 duration-200 text-left">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-3">
                      <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">Designated Coordinator</h4>
                      <button 
                        onClick={() => setShowCoordinatorPopup(false)}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      {/* Avatar SVG */}
                      <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0 border-2 border-amber-300 overflow-hidden">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="45" r="23" fill="#fed7aa" />
                          <circle cx="41" cy="43" r="8" fill="none" stroke="#1e293b" strokeWidth="3" />
                          <circle cx="59" cy="43" r="8" fill="none" stroke="#1e293b" strokeWidth="3" />
                          <line x1="49" y1="43" x2="51" y2="43" stroke="#1e293b" strokeWidth="3" />
                          <path d="M 30,80 C 30,68 40,64 50,64 C 60,64 70,68 70,80" fill="#0f172a" />
                          <path d="M 45,56 Q 50,60 55,56" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-800 leading-tight">Alfred Senior</h3>
                        <p className="text-[11px] font-bold text-slate-400">Senior Business Insurance Advisor</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Active Online</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs mb-4">
                      <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 px-3 py-2 rounded-xl">
                        <Phone size={14} className="text-blue-900 shrink-0" />
                        <span className="font-bold text-slate-800">+971 4 123 4567</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 px-3 py-2 rounded-xl">
                        <Clock size={14} className="text-blue-900 shrink-0" />
                        <span className="font-semibold text-slate-700">Mon - Fri: 8:00 AM - 6:00 PM (GST)</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 px-3 py-2 rounded-xl">
                        <MessageSquare size={14} className="text-blue-900 shrink-0" />
                        <span className="font-semibold text-slate-700">sara.alhamdan@insurancemarket.ae</span>
                      </div>
                    </div>

                    <div className="space-y-2 mt-2 pt-2 border-t border-slate-100">
                      <a
                        href="https://wa.me/97141234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white py-2 px-4 rounded-xl text-xs font-black text-center block transition-colors shadow-md shadow-green-500/10 cursor-pointer"
                      >
                        Chat on WhatsApp
                      </a>

                      <MeetingScheduler />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Standard Rating badge and Hotline (Desktop/Mobile)
              <>
                {/* Support Hotline Widget */}
                <a 
                  href="tel:8002537333" 
                  className="flex items-center gap-3 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 px-4 py-2 rounded-xl transition-all duration-200"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-900">
                      <Phone size={16} className="fill-blue-900/10" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[9px] font-bold text-slate-500 uppercase leading-none">Talk to Alfred</p>
                    <p className="text-xs font-extrabold text-slate-900 leading-tight">800 ALFRED (253)</p>
                  </div>
                </a>
              </>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

const MeetingScheduler: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedTime, setSelectedTime] = useState("10:30 AM");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBooked(true);
    }, 1000);
  };

  if (booked) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center space-y-1 mt-1 animate-in fade-in duration-200">
        <p className="text-[11px] font-black text-emerald-800">Meeting Confirmed! 🎉</p>
        <p className="text-[10px] text-emerald-600 font-semibold leading-tight">
          Video Call on {selectedDate} at {selectedTime}
        </p>
      </div>
    );
  }

  if (!isBookingOpen) {
    return (
      <button
        onClick={() => setIsBookingOpen(true)}
        className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1.5 cursor-pointer border border-blue-950/20"
      >
        <Calendar size={13} />
        <span>Book Meeting with Alfred</span>
      </button>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl space-y-3 mt-1 animate-in slide-in-from-top-2 duration-150">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-slate-500 uppercase">Select Meeting:</span>
        <button 
          onClick={() => setIsBookingOpen(false)}
          className="text-slate-400 hover:text-slate-600 text-[10px] font-bold"
        >
          Cancel
        </button>
      </div>

      {/* Date Buttons */}
      <div className="grid grid-cols-3 gap-1">
        {["Today", "Tomorrow", "Wednesday"].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setSelectedDate(d)}
            className={`py-1 rounded-lg text-[10px] font-bold text-center border cursor-pointer ${
              selectedDate === d
                ? "bg-blue-900 border-blue-900 text-white"
                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Time Buttons */}
      <div className="grid grid-cols-2 gap-1">
        {["10:30 AM", "11:30 AM", "2:30 PM", "4:00 PM"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setSelectedTime(t)}
            className={`py-1 rounded-lg text-[9px] font-bold text-center border cursor-pointer ${
              selectedTime === t
                ? "bg-blue-900 border-blue-900 text-white"
                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleBook}
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-950 py-2 rounded-lg text-[11px] font-black flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
      >
        {loading ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          <>
            <Video size={12} />
            <span>Confirm Video Call</span>
          </>
        )}
      </button>
    </div>
  );
};
