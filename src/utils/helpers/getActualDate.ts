import { EventDate } from '../../domens/eventDates/types/types';
import { TicketOnSell } from '../../typings/types';
import cloneDeep from './cloneDeep';
import { dateParse } from './dateParse';

export const getActualDate = <T extends EventDate | TicketOnSell>(
  dates: T[],
): { past: T[] | undefined; present: T | undefined; future: T[] | undefined; isPassed: boolean } => {
  let past: T[] = [],
    present: T,
    future: T[] = [],
    isPassed: boolean;

  const localTime = Date.now();
  const localDates = cloneDeep(dates) as T[];

  if (localDates.length > 1) {
    while (localDates.length) {
      const date = localDates.shift();
      const timeTo = dateParse(date.dateTo);

      if (localTime > timeTo) {
        past.push(date);
      } else {
        future.push(date);
      }
    }

    future.sort((a, b) => dateParse(a.dateTo) - dateParse(b.dateTo));
    present = future.shift();
    isPassed = true;
    if (!present) {
      past.sort((a, b) => dateParse(a.dateTo) - dateParse(b.dateTo));
      present = past.pop();
      isPassed = false;
    }
  } else {
    past = undefined;
    present = localDates[0];
    future = undefined;
    isPassed = present?.dateTo ? localTime < dateParse(present?.dateTo) : false;
  }

  return { past, present, future, isPassed };
};
