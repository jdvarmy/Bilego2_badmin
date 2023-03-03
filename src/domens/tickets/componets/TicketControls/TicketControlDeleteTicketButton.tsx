import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Box, Button, Grid, IconButton, Popover, Tooltip, Typography } from '@mui/material';
import React, { memo, useCallback, useRef, useState } from 'react';

import { PopoverDelete } from '../../../../components/PopoverDelete/PopoverDelete';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { circleActions } from '../../../circle/store/circleSlice';
import { useAppDispatch } from '../../../store';
import { ticketsActions } from '../../store/ticketsSlice';
import { deleteTicketsAsync } from '../../store/ticketsThunk';

type Props = {
  show: boolean;
  disabled: boolean;
  ticketsUid: string[];
};

export const TicketControlDeleteTicketButton = memo(function TicketControlDeleteTicketButton({
  show,
  ticketsUid,
  disabled,
}: Props) {
  const dispatch = useAppDispatch();
  const actions = useActionCreators(ticketsActions);
  const actionsCircle = useActionCreators(circleActions);
  const ref = useRef<HTMLSpanElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleDelete = useCallback(() => {
    dispatch(deleteTicketsAsync({ ticketsUid }));
    actionsCircle.clearSelectedCircle();
    actions.setSelectedTicket(null);
    handleClose();
  }, [dispatch, ticketsUid, handleClose]);

  if (!show) {
    return null;
  }

  return (
    <>
      <Tooltip arrow placement='top' title='Удалить выбранные билеты'>
        <span ref={ref}>
          <IconButton color='error' disabled={disabled} onClick={handleOpen}>
            <DeleteForeverTwoToneIcon fontSize='small' />
          </IconButton>
        </span>
      </Tooltip>
      <PopoverDelete onDelete={handleDelete} onClose={handleClose} open={isOpen} anchorEl={ref.current} />
    </>
  );
});
