import { TicketOnSell } from '../typings/types';

export const getActualSell = (sell: TicketOnSell[]): TicketOnSell | undefined => {
  const localDate = Date.now();
  return sell.find(({ dateFrom, dateTo }) => {
    const _dateFrom = typeof dateFrom === 'string' ? Date.parse(dateFrom) : dateFrom || 0;
    const _dateTo = typeof dateTo === 'string' ? Date.parse(dateTo) : dateTo || 0;

    if (dateFrom && dateTo && localDate >= _dateFrom && localDate <= _dateTo) {
      return true;
    } else if (!dateFrom && dateTo && localDate <= _dateTo) {
      return true;
    } else if (dateFrom && !dateTo && localDate >= _dateFrom) {
      return true;
    } else if (!dateFrom && !dateTo) {
      return true;
    }

    return false;
  });
};
