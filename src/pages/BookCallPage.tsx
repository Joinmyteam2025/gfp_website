import React, { useState, useEffect, useMemo } from "react";
import { Shield } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

// ── Types ──

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

interface DaySlots {
  date: string;
  dayOfWeek: number;
  slots: TimeSlot[];
}

type BookingStep = "calendar" | "time" | "form" | "confirming" | "confirmed";

// ── Helpers ──

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

function formatTime12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDateForDisplay(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatPhone(val: string) {
  const digits = val.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

// ── Component ──

export default function BookCallPage() {
  const now = new Date();

  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [step, setStep] = useState<BookingStep>("calendar");

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [smsConsent, setSmsConsent] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const [slotData, setSlotData] = useState<DaySlots[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);

  const getAvailableSlots = useAction(api.appointments.getAvailableSlots);
  const bookAppointmentAction = useAction(api.appointments.bookAppointment);

  // Pre-fill from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("name")) setFormName(params.get("name")!);
    if (params.get("email")) setFormEmail(params.get("email")!);
    if (params.get("phone")) setFormPhone(params.get("phone")!);
  }, []);

  // Fetch slots when month changes
  useEffect(() => {
    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const startDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`;
        const endDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;
        const result = await getAvailableSlots({ startDate, endDate });
        setSlotData(result);
      } catch (e) {
        console.error("Failed to fetch slots:", e);
        setSlotData([]);
      }
      setLoadingSlots(false);
    };
    fetchSlots();
  }, [currentMonth, currentYear]);

  const availableDateMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const day of slotData) {
      const count = day.slots.filter((s) => s.available).length;
      if (count > 0) map[day.date] = count;
    }
    return map;
  }, [slotData]);

  const selectedDateSlots = useMemo(() => {
    if (!selectedDate) return [];
    return slotData.find((d) => d.date === selectedDate)?.slots.filter((s) => s.available) ?? [];
  }, [selectedDate, slotData]);

  const canGoPrev = currentYear > now.getFullYear() || currentMonth > now.getMonth();

  const goToPrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
    setSelectedDate(null); setSelectedSlot(null);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
    setSelectedDate(null); setSelectedSlot(null);
  };

  const handleDateClick = (dateStr: string) => {
    if (availableDateMap[dateStr]) {
      setSelectedDate(dateStr);
      setSelectedSlot(null);
      setStep("time");
    }
  };

  const handleSlotClick = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setStep("form");
    setFormError(null);
  };

  const handleBook = async () => {
    if (!formName.trim()) { setFormError("Please enter your full name."); return; }
    if (!formEmail.trim() || !formEmail.includes("@")) { setFormError("Please enter a valid email."); return; }
    if (!formPhone.trim() || formPhone.replace(/\D/g, "").length < 10) { setFormError("Please enter a valid phone number."); return; }
    if (!selectedDate || !selectedSlot) return;

    setBookingInProgress(true);
    setFormError(null);
    setStep("confirming");

    try {
      const result = await bookAppointmentAction({
        date: selectedDate,
        startTime: selectedSlot.startTime,
        clientName: formName.trim(),
        clientEmail: formEmail.trim(),
        clientPhone: formPhone.trim(),
        smsConsent,
        notes: formNotes.trim() || undefined,
      });
      if (result.success) setStep("confirmed");
      else { setFormError(result.error ?? "Failed to book appointment."); setStep("form"); }
    } catch (e) {
      console.error("Booking error:", e);
      setFormError("Something went wrong. Please try again.");
      setStep("form");
    }
    setBookingInProgress(false);
  };

  // ── Render Calendar Grid ──

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const cells: React.ReactElement[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`e-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const hasSlots = !!availableDateMap[dateStr];
      const isToday = dateStr === today;
      const isSelected = dateStr === selectedDate;
      const isPast = dateStr < today;

      cells.push(
        <button
          key={dateStr}
          type="button"
          disabled={!hasSlots || isPast}
          onClick={() => handleDateClick(dateStr)}
          className={`
            aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium
            transition-all duration-200
            ${isSelected
              ? "bg-[#C5963A] text-white shadow-lg shadow-amber-500/30 scale-105"
              : hasSlots && !isPast
                ? "bg-white border border-gray-200 hover:border-[#C5963A]/40 hover:bg-amber-50 cursor-pointer hover:scale-[1.02]"
                : "text-gray-300 cursor-default"
            }
            ${isToday && !isSelected ? "ring-2 ring-[#C5963A]/40 ring-offset-1" : ""}
          `}
        >
          <span className={isSelected ? "font-bold" : ""}>{day}</span>
          {hasSlots && !isPast && (
            <span className={`text-[9px] mt-0.5 font-medium ${isSelected ? "text-white/80" : "text-[#C5963A]"}`}>
              {availableDateMap[dateStr]} slot{availableDateMap[dateStr] > 1 ? "s" : ""}
            </span>
          )}
        </button>
      );
    }
    return cells;
  };

  // ── Step Views ──

  const calendarView = (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button type="button" onClick={goToPrevMonth} disabled={!canGoPrev}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-30">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h3 className="text-lg font-bold text-gray-900">{MONTHS[currentMonth]} {currentYear}</h3>
        <button type="button" onClick={goToNextMonth}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 tracking-wider py-1">{d}</div>
        ))}
      </div>

      {loadingSlots ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#C5963A] border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-sm text-gray-500">Loading availability...</span>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">{renderCalendarGrid()}</div>
      )}

      <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C5963A]" />
          <span className="text-[10px] text-gray-500">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <span className="text-[10px] text-gray-500">Unavailable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full ring-2 ring-[#C5963A]/40 ring-offset-1" />
          <span className="text-[10px] text-gray-500">Today</span>
        </div>
      </div>
    </div>
  );

  const timeView = (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={() => { setStep("calendar"); setSelectedSlot(null); }}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h3 className="font-bold text-gray-900">Select a Time</h3>
          <p className="text-xs text-gray-500">{selectedDate ? formatDateForDisplay(selectedDate) : ""}</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#C5963A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          <div>
            <p className="text-sm font-semibold text-[#C5963A]">FREE Strategy Call</p>
            <p className="text-[11px] text-amber-700/70">20 minutes via Google Meet</p>
          </div>
        </div>
      </div>

      {selectedDateSlots.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {selectedDateSlots.map((slot) => (
            <button
              key={slot.startTime}
              type="button"
              onClick={() => handleSlotClick(slot)}
              className={`
                p-4 rounded-xl border text-center transition-all duration-200
                ${selectedSlot?.startTime === slot.startTime
                  ? "border-[#C5963A] bg-[#C5963A] text-white shadow-md"
                  : "border-gray-200 hover:border-[#C5963A]/40 hover:bg-amber-50"
                }
              `}
            >
              <svg className={`w-4 h-4 mx-auto mb-1.5 ${selectedSlot?.startTime === slot.startTime ? "text-white/80" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-sm font-medium">{formatTime12h(slot.startTime)}</span>
              <span className={`block text-[10px] mt-0.5 ${selectedSlot?.startTime === slot.startTime ? "text-white/70" : "text-gray-400"}`}>
                to {formatTime12h(slot.endTime)}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <p className="text-sm">No available times on this date.</p>
          <button type="button" onClick={() => setStep("calendar")} className="text-[#C5963A] text-xs mt-2 hover:underline">Choose another date</button>
        </div>
      )}
    </div>
  );

  const formView = (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-5">
        <button type="button" onClick={() => setStep("time")}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h3 className="font-bold text-gray-900">Confirm Your Booking</h3>
          <p className="text-xs text-gray-500">
            {selectedDate ? formatDateForDisplay(selectedDate) : ""} at {selectedSlot ? formatTime12h(selectedSlot.startTime) : ""}
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-[#1C1917] to-[#292524] rounded-xl p-5 mb-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-[10px] uppercase tracking-wider">Your Appointment</p>
            <p className="font-bold text-sm mt-0.5">FREE Strategy Call</p>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-[10px]">20 min</p>
            <p className="font-bold text-[#C5963A]">FREE</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {selectedDate}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {selectedSlot ? formatTime12h(selectedSlot.startTime) : ""} MST
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
          <input type="text" placeholder="John Smith" value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#C5963A] focus:ring-2 focus:ring-amber-100 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" placeholder="john@example.com" value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#C5963A] focus:ring-2 focus:ring-amber-100 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
          <input type="tel" placeholder="(555) 123-4567" value={formPhone}
            onChange={(e) => setFormPhone(formatPhone(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#C5963A] focus:ring-2 focus:ring-amber-100 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">What would you like to discuss? (optional)</label>
          <input type="text" placeholder="e.g. Estate planning for my family" value={formNotes}
            onChange={(e) => setFormNotes(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#C5963A] focus:ring-2 focus:ring-amber-100 transition-all" />
        </div>

        <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
          <input type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#C5963A] focus:ring-[#C5963A]" />
          <span className="text-[11px] text-gray-500 leading-relaxed">
            I agree to receive SMS reminders about my appointment. Message &amp; data rates may apply. Reply STOP to opt out.
          </span>
        </label>

        {formError && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {formError}
          </div>
        )}

        <button type="button" onClick={handleBook} disabled={bookingInProgress}
          className="w-full py-4 rounded-xl bg-[#C5963A] hover:bg-[#9E7730] text-white font-bold text-sm transition-all duration-200 disabled:opacity-50 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01]">
          {bookingInProgress ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Booking...
            </span>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </div>
  );

  const confirmingView = (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="w-12 h-12 border-3 border-[#C5963A] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-600 font-medium">Creating your appointment...</p>
      <p className="text-xs text-gray-400 mt-1">Setting up Google Meet &amp; sending confirmation</p>
    </div>
  );

  const confirmedView = (
    <div className="text-center py-12 animate-fade-in">
      <div className="w-16 h-16 mx-auto mb-5 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">You&rsquo;re Booked!</h3>
      <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
        Check your email for a calendar invite with a Google Meet link. Looking forward to connecting with you!
      </p>
      <div className="bg-gray-50 rounded-xl p-5 max-w-xs mx-auto text-left">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Date</span>
            <span className="font-medium text-gray-900">{selectedDate ? formatDateForDisplay(selectedDate) : ""}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Time</span>
            <span className="font-medium text-gray-900">{selectedSlot ? formatTime12h(selectedSlot.startTime) : ""} MST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Duration</span>
            <span className="font-medium text-gray-900">20 minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Location</span>
            <span className="font-medium text-gray-900">Google Meet</span>
          </div>
        </div>
      </div>
      <button type="button" onClick={() => window.location.href = "/"}
        className="mt-6 text-[#C5963A] text-sm font-medium hover:underline">
        ← Back to Garner Financial Partners
      </button>
    </div>
  );

  const stepContent = step === "calendar" ? calendarView
    : step === "time" ? timeView
    : step === "form" ? formView
    : step === "confirming" ? confirmingView
    : confirmedView;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Shield className="size-9 text-[#C5963A]" strokeWidth={1.5} />
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">GARNER FINANCIAL PARTNERS</h1>
              <p className="text-[10px] text-[#C5963A] font-semibold tracking-widest uppercase">Build. Protect. Preserve.</p>
            </div>
          </a>
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
            ← Back to site
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* Left — Calendar */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Title Bar */}
              <div className="bg-gradient-to-r from-[#1C1917] to-[#292524] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C5963A]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#C5963A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg">Book a FREE Strategy Call</h2>
                    <p className="text-white/50 text-sm">Pick a date and time that works for you</p>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">
                {stepContent}
              </div>
            </div>
          </div>

          {/* Right — Info Sidebar */}
          <div className="space-y-5">
            {/* What You'll Get */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-[#C5963A]">✦</span> What You&rsquo;ll Get
              </h3>
              <ul className="space-y-3">
                {[
                  "Personalized financial fortress assessment",
                  "Estate planning & trust structure overview",
                  "Asset protection strategy discussion",
                  "Tax optimization opportunities review",
                  "Custom roadmap for your family's financial future",
                  "No obligation, no pressure",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5963A] mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-100">
                  <img src="/headshot.webp" alt="Zach Garner" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Zach Garner</p>
                  <p className="text-[#C5963A] text-sm font-medium">Garner Financial Partners</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Helping families build, protect, and preserve generational wealth through education, estate planning, and proven financial strategies.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-2.5">
              <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
                <span className="text-green-500 text-lg">✓</span>
                <span className="text-sm text-gray-700 font-medium">100% free, no credit card required</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
                <svg className="w-5 h-5 text-[#C5963A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                <span className="text-sm text-gray-700 font-medium">20-min Google Meet video call</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
                <svg className="w-5 h-5 text-[#C5963A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm text-gray-700 font-medium">Calendar confirmation sent instantly</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export { BookCallPage };
