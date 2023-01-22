import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

// todo: удалить date-fns
export function localDate(date?: string | Date) {
  if (!date) {
    return '-';
  }

  const formatDate = 'dd.MM.yyyy HH:mm';
  return format(Date.parse(date as string), formatDate, { locale: ru });
}
