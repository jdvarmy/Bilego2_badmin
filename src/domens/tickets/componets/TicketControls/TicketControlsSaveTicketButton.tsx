import { Button, Tooltip } from '@mui/material';
import React, { memo, useMemo } from 'react';

import { ButtonType } from '../../../../typings/enum';
import { Ticket, TicketOnSell } from '../../../../typings/types';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { clearSelectedCircle } from '../../../circleSlice/circleSlice';
import { useAppDispatch } from '../../../store';
import { ticketsActions } from '../../store/ticketsSlice';
import { saveTicketsAsync } from '../../store/ticketsThunk';

type Props = {
  dateUid: string;
  isEdit: boolean;
  disabled: boolean;
  ticketData: Ticket;
  sellData: TicketOnSell[];
  clearFc: () => void;
};

export const TicketControlsSaveTicketButton = memo(function TicketControlsSaveTicketButton({
  isEdit,
  dateUid,
  ticketData,
  sellData,
  disabled,
  clearFc,
}: Props) {
  const dispatch = useAppDispatch();
  const actions = useActionCreators(ticketsActions);

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sell, ...clearTicketData } = ticketData;
    dispatch(
      saveTicketsAsync({
        reqType: isEdit ? ButtonType.edit : ButtonType.save,
        dateUid: dateUid,
        ticket: clearTicketData,
        sell: sellData,
      }),
    );
    actions.setSelectedTicket(null);
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
});
