import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../domen/store';
import { setTickets } from '../../../domen/tickets/ticketsSlice';
import { getTicketsAsync } from '../../../domen/tickets/ticketsThunk';
import { TicketType } from '../../../typings/enum';
import TicketMap from '../../TicketMap/TicketMap';
import TicketSimple from '../../TicketSimple/TicketSimple';

type Props = {
  type?: TicketType;
  selectedDateUid?: string;
};

const TicketsContent = ({ type, selectedDateUid }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!type || !selectedDateUid) {
      return;
    }

    dispatch(getTicketsAsync(selectedDateUid));
    return () => {
      dispatch(setTickets(null));
    };
  }, [selectedDateUid, type, dispatch]);

  return <Box sx={{ mx: '-16px' }}>{type === TicketType.map ? <TicketMap /> : <TicketSimple />}</Box>;
};

export default TicketsContent;
