import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useActionCreators } from '../../../../../../utils/hooks/useActionCreators';
import { selectTicketsStore } from '../../../../store/ticketsSelectors';
import { ticketsActions } from '../../../../store/ticketsSlice';
import { TicketControlDeleteTicketButton } from '../../../TicketControls/TicketControlDeleteTicketButton';

export const RenderTicketManagement = ({ data: { uid } }: ICellRendererParams) => {
  const actions = useActionCreators(ticketsActions);
  const { tickets, selectedTicket } = useSelector(selectTicketsStore);

  const editingTicket = useMemo(() => tickets?.find((t) => t.uid === uid) ?? null, [tickets, uid]);
  const isCurrentEditingTicket = useMemo(() => selectedTicket?.uid === uid, [selectedTicket?.uid, uid]);

  const handleEdit = useCallback(() => {
    actions.setSelectedTicket(editingTicket);
  }, [actions, editingTicket]);
  const handleCancel = useCallback(() => {
    actions.setSelectedTicket(null);
  }, [actions]);

  if (!uid) {
    return 'Нет идентификатора';
  }

  return (
    <Box>
      {isCurrentEditingTicket ? (
        <Tooltip arrow placement='top' title='Отменить редактирование билета'>
          <IconButton color='secondary' onClick={handleCancel}>
            <HighlightOffTwoToneIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip arrow placement='top' title='Редактировать билет'>
          <IconButton color='warning' onClick={handleEdit}>
            <EditTwoToneIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      )}
      <TicketControlDeleteTicketButton show ticketsUid={[uid]} disabled={false} />
    </Box>
  );
};
