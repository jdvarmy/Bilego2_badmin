import { TicketOnSell } from '../typings/types';

export const getActualPrice = (sell: TicketOnSell) => {
  return (Number(sell.price) || 0) + (Number(sell.service) || 0);
};
