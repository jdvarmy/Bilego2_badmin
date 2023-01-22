import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MapIcon from '@mui/icons-material/Map';
import { Button, Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import AppMapModal from '../../../../components/AddMapModal/AppMapModal';
import { TicketType } from '../../../../typings/enum';
import { EventDate } from '../../../../typings/types';
import { AppDispatch } from '../../../store';
import { editEventDateAsync } from '../../store/eventsSlice';

type Props = {
  selectedDate?: EventDate;
};

const TicketsInitialContent = ({ selectedDate }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);

  const handleClick = useCallback(
    (type: TicketType) => () => {
      if (selectedDate) {
        const { uid, ...data } = selectedDate;
        !!uid && dispatch(editEventDateAsync(uid, { ...data, type }));
      }
    },
    [selectedDate, dispatch],
  );
  const handleOpenModal = useCallback(() => setShow(true), []);
  const handleCloseModal = useCallback(() => setShow(false), []);

  return (
    <Grid item xs={12}>
      <Button
        sx={{ mx: 2, my: 0.5 }}
        variant='outlined'
        startIcon={<MapIcon fontSize='small' />}
        onClick={handleOpenModal}
      >
        Добавить билеты с картой
      </Button>
      <Button
        sx={{ mx: 2, my: 0.5 }}
        variant='outlined'
        startIcon={<LocalActivityIcon fontSize='small' />}
        onClick={handleClick(TicketType.simple)}
      >
        Добавить входные билеты
      </Button>
      <AppMapModal open={show} onClose={handleCloseModal} selectedDate={selectedDate} />
    </Grid>
  );
};

export default TicketsInitialContent;
