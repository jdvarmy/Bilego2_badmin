import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MapIcon from '@mui/icons-material/Map';
import { Button, Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { TicketType } from '../../../../typings/enum';
import { editEventDateAsync } from '../../../eventDates/store/eventDateThunk';
import { EventDate } from '../../../eventDates/types';
import AppMapModal from '../../../medialibrary/components/AddMapModal/AppMapModal';
import { useAppDispatch } from '../../../../store/store';

type Props = {
  selectedDate?: EventDate;
};

const TicketsInitialContent = ({ selectedDate }: Props) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);

  const handleClick = useCallback(
    (type: TicketType) => () => {
      if (selectedDate) {
        !!selectedDate.uid && dispatch(editEventDateAsync({ ...selectedDate, type }));
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
