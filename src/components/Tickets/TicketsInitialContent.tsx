import React, { useCallback, useState } from 'react';
import { TicketType } from '../../typings/enum';
import { Button, Grid } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { AppDispatch } from '../../domen/store';
import { useDispatch } from 'react-redux';
import { editEventDateAsync } from '../../domen/events/eventsSlice';
import { EventDate } from '../../typings/types';
import AppMapModal from '../AddMapModal/AppMapModal';

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
