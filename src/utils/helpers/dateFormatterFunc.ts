import { EventDate } from '../../domens/eventDates/types';
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

  const from = dateFrom ? new Date(dateFrom) : undefined;
  const to = dateTo ? new Date(dateTo) : undefined;
  const _dateFrom = from ? formatterDate.format(from) : undefined;
  const _dateTo = to ? formatterDate.format(to) : undefined;
  const _timeFrom = from ? formatterTime.format(from) : undefined;
  const _timeTo = to ? formatterTime.format(to) : undefined;

  if (dateFrom && dateTo) {
    if (_dateFrom === _dateTo) {
      formattedDate.date = `${_dateTo}`;

      formattedDate.time = `${_timeFrom} - ${_timeTo}`;
    } else {
      formattedDate.date = `${_dateFrom} ${_timeFrom} - ${_dateTo} ${_timeTo}`;
    }
  } else if (dateFrom && !dateTo) {
    formattedDate.date = `c ${_dateFrom} ${_timeFrom}`;
  } else if (!dateFrom && dateTo) {
    formattedDate.date = `по ${_dateTo} ${_timeTo}`;
  }

  return formattedDate;
}
