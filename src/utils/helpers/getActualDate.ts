import { EventDate } from '../../typings/types';
import cloneDeep from './cloneDeep';
import { dateParse } from './dateParse';

export const getActualDate = <T extends EventDate>(
  dates: T[],
): { past: T[] | undefined; present: T | undefined; future: T[] | undefined; passed: boolean } => {
  let past: T[] = [],
    present: T,
    future: T[] = [],
    passed: boolean;

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
    passed = true;
    if (!present) {
      past.sort((a, b) => dateParse(a.dateTo) - dateParse(b.dateTo));
      present = past.pop();
      passed = false;
    }
  } else {
    past = undefined;
    present = localDates[0];
    future = undefined;
    passed = present?.dateTo ? localTime < dateParse(present?.dateTo) : false;
  }

  return { past, present, future, passed };
};
