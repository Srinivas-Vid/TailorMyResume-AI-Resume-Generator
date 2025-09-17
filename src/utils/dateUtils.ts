import { format } from 'date-fns';

export const formatDate = (date: Date | null, formatStr: string = 'MMM yyyy'): string => {
  if (!date) return '';
  return format(date, formatStr);
};

export const formatDateRange = (startDate: Date | null, endDate: Date | null, current: boolean = false): string => {
  const start = formatDate(startDate);
  const end = current ? 'Present' : formatDate(endDate);
  
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  
  return `${start} - ${end}`;
};

export const createDateFromString = (dateString: string): Date | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

export const getYearRange = (startYear: number = 1950, endYear: number = new Date().getFullYear() + 10) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }
  return years;
};