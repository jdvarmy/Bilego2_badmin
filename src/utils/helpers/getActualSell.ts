import { TicketOnSell } from '../../typings/types';
import { dateParse } from './dateParse';

export const getActualSell = (sell: TicketOnSell[]): TicketOnSell | undefined => {
  const localTime = Date.now();
  return sell.find(({ dateFrom, dateTo }) => {
    const _dateFrom = dateParse(dateFrom);
    const _dateTo = dateParse(dateTo);

    if (dateFrom && dateTo && localTime >= _dateFrom && localTime <= _dateTo) {
      return true;
    } else if (!dateFrom && dateTo && localTime <= _dateTo) {
      return true;
    } else if (dateFrom && !dateTo && localTime >= _dateFrom) {
      return true;
    } else if (!dateFrom && !dateTo) {
      return true;
    }

    return false;
  });
};
