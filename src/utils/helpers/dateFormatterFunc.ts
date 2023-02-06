import { EventDate } from '../../domens/eventDates/types/types';
import { TicketOnSell } from '../../typings/types';

const formatterDate = new Intl.DateTimeFormat('ru', {
  year: '2-digit',
  month: 'short',
  day: 'numeric',
  hour: undefined,
  minute: undefined,
});
const formatterTime = new Intl.DateTimeFormat('ru', {
  year: undefined,
  month: undefined,
  day: undefined,
  hour: '2-digit',
  minute: '2-digit',
});

export function localFormatterFunc({ dateFrom, dateTo }: EventDate | TicketOnSell) {
  const formattedDate: { date: string | undefined; time: string | undefined } = { date: undefined, time: undefined };

  if (dateFrom && dateTo) {
    const _dateFrom = formatterDate.format(new Date(dateFrom));
    const _dateTo = formatterDate.format(new Date(dateTo));
    const _timeFrom = formatterTime.format(new Date(dateFrom));
    const _timeTo = formatterTime.format(new Date(dateTo));

    if (_dateFrom === _dateTo) {
      formattedDate.date = `${_dateTo}`;

      formattedDate.time = `${_timeFrom} - ${_timeTo}`;
    } else {
      formattedDate.date = `${_dateFrom} ${_timeFrom} - ${_dateTo} ${_timeTo}`;
    }
  }

  return formattedDate;
}
