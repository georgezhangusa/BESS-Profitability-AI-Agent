import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface DatePickerPopoverProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (dateStr: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  selectedDate,
  onSelectDate,
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  // Parse initial selected date
  const parsedDate = selectedDate ? new Date(selectedDate + 'T12:00:00') : new Date();
  
  const [viewYear, setViewYear] = useState<number>(parsedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(parsedDate.getMonth()); // 0-indexed
  const popoverRef = useRef<HTMLDivElement>(null);

  // Sync view when selectedDate changes and opened
  useEffect(() => {
    if (isOpen && selectedDate) {
      const d = new Date(selectedDate + 'T12:00:00');
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [isOpen, selectedDate]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Month navigation
  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const monthNames = t.monthNames || [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = t.daysOfWeek || ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Calculate calendar grid days
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  // Selected date components
  const [sYear, sMonth, sDay] = selectedDate.split('-').map(Number);

  // Today for highlight
  const today = new Date();
  const isToday = (day: number) =>
    today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;

  const isSelected = (day: number) =>
    sYear === viewYear && sMonth === (viewMonth + 1) && sDay === day;

  const handleDateClick = (day: number) => {
    const mStr = String(viewMonth + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    onSelectDate(`${viewYear}-${mStr}-${dStr}`);
    onClose();
  };

  return (
    <div
      ref={popoverRef}
      className="absolute top-full left-0 mt-2 z-50 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3.5 text-slate-800 animate-in fade-in zoom-in-95 duration-100"
    >
      {/* Header Month / Year controls */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-900">
            {monthNames[viewMonth]} {viewYear}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors ml-1"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {daysOfWeek.map((d) => (
          <span key={d} className="text-[11px] font-semibold text-slate-400 py-0.5">
            {d}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Leading days from previous month */}
        {Array.from({ length: firstDayOfMonth }).map((_, idx) => {
          const prevMonthDay = daysInPrevMonth - firstDayOfMonth + idx + 1;
          return (
            <div
              key={`prev-${idx}`}
              className="py-1 text-xs text-slate-300 select-none cursor-default font-normal"
            >
              {prevMonthDay}
            </div>
          );
        })}

        {/* Days of current month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const selected = isSelected(day);
          const currentDay = isToday(day);

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => handleDateClick(day)}
              className={`py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selected
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : currentDay
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Quick shortcuts in calendar footer */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <button
          type="button"
          onClick={() => {
            const t = new Date();
            const mStr = String(t.getMonth() + 1).padStart(2, '0');
            const dStr = String(t.getDate()).padStart(2, '0');
            onSelectDate(`${t.getFullYear()}-${mStr}-${dStr}`);
            onClose();
          }}
          className="text-slate-500 hover:text-blue-600 font-medium transition-colors cursor-pointer"
        >
          {t.today}
        </button>

        <button
          type="button"
          onClick={() => {
            const t = new Date();
            t.setDate(t.getDate() + 1);
            const mStr = String(t.getMonth() + 1).padStart(2, '0');
            const dStr = String(t.getDate()).padStart(2, '0');
            onSelectDate(`${t.getFullYear()}-${mStr}-${dStr}`);
            onClose();
          }}
          className="text-blue-600 font-bold hover:text-blue-800 transition-colors cursor-pointer"
        >
          {t.tomorrowDam}
        </button>
      </div>
    </div>
  );
};

