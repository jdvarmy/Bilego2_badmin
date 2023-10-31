import { Box } from '@mui/material';
import React, { useEffect } from 'react';

import { TicketType } from '../../../../typings/enum';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { useAppDispatch } from '../../../../store/store';
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
  const actions = useActionCreators(ticketsActions);

  useEffect(() => {
    if (!type || !selectedDateUid) {
      return;
    }

    dispatch(getTicketsAsync({ dateUid: selectedDateUid }));

    return () => {
      actions.setTickets(null);
    };
  }, [selectedDateUid, type, dispatch, actions]);

  return <Box sx={{ mx: '-16px' }}>{type === TicketType.map ? <TicketMap /> : <TicketSimple />}</Box>;
};

export default TicketsContent;
