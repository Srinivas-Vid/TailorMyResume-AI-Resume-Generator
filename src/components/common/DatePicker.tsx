import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  placeholder = "Select date",
  className = "",
  disabled = false,
  maxDate,
  minDate
}) => {
  return (
    <div className="relative">
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText={placeholder}
        className={`form-input pr-10 ${className}`}
        disabled={disabled}
        maxDate={maxDate}
        minDate={minDate || new Date('1950-01-01')}
        yearDropdownItemNumber={50}
        scrollableYearDropdown
      />
      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
};