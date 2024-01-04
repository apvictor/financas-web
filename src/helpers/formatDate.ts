import { format, isToday, isYesterday } from 'date-fns';

export function formatDate(date: string) {
  const formattedDate =
    isToday(date) ? 'Hoje' :
      isYesterday(date) ? 'Ontem' :
        format(date, 'dd/MM/yyyy');

  return formattedDate;
}
