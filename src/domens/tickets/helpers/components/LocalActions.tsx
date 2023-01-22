import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../store';
import TicketControlDeleteTicketButton from '../../componets/TicketControls/TicketControlDeleteTicketButton';
import { selectTicketsStore } from '../../store/ticketsSelectors';
import { setSelectedTicket } from '../../store/ticketsSlice';

export const LocalActions = (uid: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { tickets, selectedTicket } = useSelector(selectTicketsStore);

  const editingTicket = useMemo(() => tickets?.find((t) => t.uid === uid) ?? null, [tickets, uid]);
  const isCurrentEditingTicket = useMemo(() => selectedTicket?.uid === uid, [selectedTicket?.uid, uid]);

  const handleEdit = useCallback(() => {
    dispatch(setSelectedTicket(editingTicket));
  }, [editingTicket, dispatch]);
  const handleCancel = useCallback(() => {
    dispatch(setSelectedTicket(null));
  }, [dispatch]);

  if (!uid) {
    return 'Нет идентификатора';
  }

  return (
    <Box sx={{ justifyContent: 'flex-end' }}>
      {isCurrentEditingTicket ? (
        <Tooltip arrow placement='top' title='Отменить редактирование билета'>
          <IconButton sx={{ p: 0, m: 0, mr: 1 }} color='secondary' onClick={handleCancel}>
            <HighlightOffTwoToneIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip arrow placement='top' title='Редактировать билет'>
          <IconButton sx={{ p: 0, m: 0, mr: 1 }} color='warning' onClick={handleEdit}>
            <EditTwoToneIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      )}
      <TicketControlDeleteTicketButton show ticketsUid={[uid]} disabled={false} />
    </Box>
  );
};
