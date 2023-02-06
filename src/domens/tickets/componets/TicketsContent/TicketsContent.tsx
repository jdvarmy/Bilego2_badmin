import { Box } from '@mui/material';
import React, { useEffect } from 'react';

import { TicketType } from '../../../../typings/enum';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { useAppDispatch } from '../../../store';
import { ticketsActions } from '../../store/ticketsSlice';
import { getTicketsAsync } from '../../store/ticketsThunk';
import TicketMap from '../TicketMap/TicketMap';
import TicketSimple from '../TicketSimple/TicketSimple';

type Props = {
  type?: TicketType;
  selectedDateUid?: string;
};

const TicketsContent = ({ type, selectedDateUid }: Props) => {
  const dispatch = useAppDispatch();
  const actionsTickets = useActionCreators(ticketsActions);

  useEffect(() => {
    if (!type || !selectedDateUid) {
      return;
    }

    dispatch(getTicketsAsync({ dateUid: selectedDateUid }));

    return () => {
      actionsTickets.setTickets(null);
    };
  }, [selectedDateUid, type, dispatch, actionsTickets]);

  return <Box sx={{ mx: '-16px' }}>{type === TicketType.map ? <TicketMap /> : <TicketSimple />}</Box>;
};

export default TicketsContent;
