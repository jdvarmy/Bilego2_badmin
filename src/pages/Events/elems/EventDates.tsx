import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MapIcon from '@mui/icons-material/Map';
import { Card, CardContent, CardHeader, Divider, Grid, IconButton, Tab, Tabs, Tooltip } from '@mui/material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { SyntheticEvent, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectEventSelectedDateUid } from '../../../domen/events/eventsSelectors';
import {
  EventStateFieldType,
  deleteEventDateAsync,
  saveTemplateEventDateAsync,
  setEventStateField,
  setSelectedDateUid,
} from '../../../domen/events/eventsSlice';
import { AppDispatch } from '../../../domen/store';
import { TicketType } from '../../../typings/enum';
import { Event } from '../../../typings/types';
import { isEqual } from '../../../utils/functions/isEqual';
import EventDatesTabContent from './EventDatesTabContent';

type Props = {
  uid?: string;
  dates?: Event['eventDates'];
};

const EventDates = ({ uid, dates }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedDateUid = useSelector(selectEventSelectedDateUid);

  console.log('render EventDates');

  const handleChangeTab = (_: SyntheticEvent, newValue: string) => {
    dispatch(setSelectedDateUid(newValue));
  };
  const handleAddTab = () => {
    if (uid) {
      dispatch(saveTemplateEventDateAsync(uid));
    }
  };
  const handleDeleteTab = () => {
    if (selectedDateUid && uid && dates) {
      const localDates = dates.filter((d) => d.uid !== selectedDateUid);
      dispatch(deleteEventDateAsync(selectedDateUid, uid));
      dispatch(setEventStateField({ eventDates: localDates } as EventStateFieldType));
      dispatch(setSelectedDateUid(localDates.at(-1)?.uid ?? undefined));
    }
  };

  useEffect(() => {
    dispatch(setSelectedDateUid(Array.isArray(dates) ? dates.at(-1)?.uid : undefined));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader title='Даты проведения события' />
      <Divider />
      <CardContent>
        <Grid container alignItems='center' spacing={3}>
          <Grid item xs={1} sx={{ display: 'flex' }}>
            <Tooltip arrow placement='top' title='Добавить новую дату выступления'>
              <IconButton color='success' onClick={handleAddTab}>
                <AddCircleTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='top' title='Удалить выбранную дату'>
              <span>
                <IconButton color='error' disabled={dates && dates.length <= 1} onClick={handleDeleteTab}>
                  <DeleteForeverTwoToneIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={11}>
            <Tabs
              variant='scrollable'
              scrollButtons='auto'
              textColor='primary'
              indicatorColor='primary'
              value={selectedDateUid || dates?.at(-1)?.uid}
              onChange={handleChangeTab}
            >
              {dates?.map(({ uid, dateFrom, dateTo, type }) => {
                const label = getTabLabel(dateFrom, dateTo);
                return (
                  <Tab
                    key={uid}
                    label={label}
                    value={uid}
                    icon={
                      !type ? undefined : type === TicketType.map ? (
                        <MapIcon fontSize='small' />
                      ) : (
                        <LocalActivityIcon fontSize='small' />
                      )
                    }
                    iconPosition='start'
                  />
                );
              })}
            </Tabs>
          </Grid>
        </Grid>
        <EventDatesTabContent selectDate={dates?.find((date) => date.uid === selectedDateUid)} dates={dates} />
      </CardContent>
    </Card>
  );
};

export default memo(EventDates, isEqual);

function getTabLabel(dateFrom?: Date, dateTo?: Date): string {
  const dateFromLocal = dateFrom ? new Date(dateFrom).setHours(0, 0, 0, 0) : null;
  const dateToLocal = dateTo ? new Date(dateTo).setHours(0, 0, 0, 0) : null;
  const formatDate = 'dd MMMM, yyyy';

  if (dateFromLocal && dateFromLocal === dateToLocal) {
    return format(dateFromLocal, formatDate, { locale: ru });
  }
  if (dateFromLocal && !dateToLocal) {
    return format(dateFromLocal, `С ${formatDate}`, { locale: ru });
  }
  if (dateToLocal && !dateFromLocal) {
    return format(dateToLocal, `По ${formatDate}`, { locale: ru });
  }
  if (dateFromLocal && dateToLocal && dateFromLocal !== dateToLocal) {
    return format(dateFromLocal, 'dd MMMM', { locale: ru }) + format(dateToLocal, ` / ${formatDate}`, { locale: ru });
  }
  return 'Выберите дату';
}
