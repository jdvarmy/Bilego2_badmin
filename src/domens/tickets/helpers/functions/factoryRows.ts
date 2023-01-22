import { TicketType } from '../../../../typings/enum';
import { Ticket } from '../../../../typings/types';

export function factoryRows(tickets: Ticket[]) {
  if (!Object.keys(tickets).length) {
    return [];
  }

  const filteredTickets = tickets.filter((t) => t.type === TicketType.simple);

  return filteredTickets.flatMap(({ uid, name, description, stock, sell }) =>
    sell?.flatMap((s) => ({
      uid,
      name: { name, description },
      stock,
      dateFrom: s?.dateFrom,
      dateTo: s?.dateTo,
      totalPrice: { price: s?.price, service: s?.service },
      color: s?.color,
      actions: uid,
    })),
  );
}
