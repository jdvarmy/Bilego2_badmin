import { TicketType } from '../../../typings/enum';
import { Ticket, TicketOnSell } from '../../../typings/types';
import { addAlertWorker, addErrorAlertWorker } from '../../alert/store/workers';
import { ServerErrorStatus } from '../../alert/types/types';
import { AppThunk } from '../../store';
import { deleteTicketsRequest, fetchTicketsRequest, saveTicketsRequest } from '../api/ticketsRequest';
import { setLoading, setTickets } from './ticketsSlice';

export const getTicketsAsync =
  (dateUid: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await fetchTicketsRequest(dateUid);
      dispatch(setTickets(data));
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerErrorStatus));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const saveTicketsAsync =
  (reqType: 'edit' | 'save', dateUid: string, ticket: Ticket, sell: TicketOnSell[]): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));
    const { selectedCircles } = getState().circle;

    let tickets = [] as Ticket[];
    // обработка билетов с карты клуба
    if (ticket.type === TicketType.map && selectedCircles) {
      selectedCircles.forEach(({ uid, seat, row, sector }) => {
        tickets.push({
          ...ticket,
          uid,
          // здесь приоритет имеет то что ввел юзер в форме, вдруг юзер захочет изменить название у сектора билета, например
          seat: ticket.seat ?? seat,
          row: ticket.row ?? row,
          sector: ticket.sector ?? sector,
        });
      });
    } else {
      // обработка обычных билетов, без карты
      tickets = [ticket];
    }

    try {
      const { data } = await saveTicketsRequest(reqType, dateUid, { tickets, sell });
      dispatch(addAlertWorker({ severity: 'success', title: 'Сохранено', text: 'Билеты успешно сохранены!' }));
      dispatch(setTickets(data));
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerErrorStatus));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteTicketsAsync =
  (ticketsUid: string[]): AppThunk =>
  async (dispatch, getState) => {
    const dateUid = getState().eventDates.selectedDateUid;
    if (!dateUid) {
      return;
    }

    dispatch(setLoading(true));

    try {
      await deleteTicketsRequest(dateUid, ticketsUid);
      dispatch(addAlertWorker({ severity: 'success', title: 'Удалено', text: 'Билеты успешно удалены!' }));
      dispatch(getTicketsAsync(dateUid));
    } catch (e) {
      dispatch(addErrorAlertWorker(e as ServerErrorStatus));
    } finally {
      dispatch(setLoading(false));
    }
  };
