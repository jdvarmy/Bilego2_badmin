import React, { memo, useMemo } from 'react';
import { Button, Tooltip } from '@mui/material';
import { saveTicketsAsync, setSelectedTicket } from '../../../domen/ticketsSlice/ticketsSlice';
import { AppDispatch } from '../../../domen/store';
import { useDispatch } from 'react-redux';
import { Ticket, TicketOnSell } from '../../../typings/types';
import { clearSelectedCircle } from '../../../domen/circleSlice/circleSlice';
import { ButtonType } from '../../../typings/enum';

type Props = {
  dateUid: string;
  isEdit: boolean;
  disabled: boolean;
  ticketData: Ticket;
  sellData: TicketOnSell[];
  clearFc: () => void;
};

const TicketControlsSaveTicketButton = ({ isEdit, dateUid, ticketData, sellData, disabled, clearFc }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const title = useMemo(
    () =>
      `Вся информация о билете, включая периоды продаж, сохраниться только после нажатия на эту кнопку. ${
        isEdit ? 'Отменить редактирование Вы можете нажав на кнопку отмены выше' : ''
      }`,
    [isEdit],
  );
  const color = useMemo(() => (isEdit ? 'warning' : 'success'), [isEdit]);
  const text = useMemo(() => (isEdit ? 'Редактировать' : 'Сохранить билет'), [isEdit]);

  const handleSaveTicket = () => {
    const { sell, ...clearTicketData } = ticketData;
    dispatch(saveTicketsAsync(isEdit ? ButtonType.edit : ButtonType.save, dateUid, clearTicketData, sellData));
    dispatch(setSelectedTicket(null));
    dispatch(clearSelectedCircle());
    clearFc();
  };

  return (
    <Tooltip arrow placement='top' title={title}>
      <span>
        <Button variant='outlined' size='small' color={color} onClick={handleSaveTicket} disabled={disabled}>
          {text}
        </Button>
      </span>
    </Tooltip>
  );
};

export default memo(TicketControlsSaveTicketButton);
