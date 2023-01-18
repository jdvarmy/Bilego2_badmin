import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { SyntheticEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextFieldImage from '../../../../components/TextFieldImage/TextFieldImage';
import { selectEventState } from '../../../../domen/events/eventsSelectors';
import { setEventStateField } from '../../../../domen/events/eventsSlice';
import { AppDispatch } from '../../../../domen/store';
import dateTimeFormatDefault from '../../../../helpers/dateTimeFormatDefault';
import { useChangeFnEventField } from '../../../../hooks/useChangeFnEventField';
import { Event as IEvent, MediaSelectData } from '../../../../typings/types';
import { EventInfoManager } from './EventInfoManager';

type Props = {
  uid: string;
  title?: string;
};
// 4_188_069
const formatter = new Intl.DateTimeFormat('ru', dateTimeFormatDefault);
const formControlLabelStyle = {
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'center',
  flexWrap: 'nowrap',
  justifyContent: 'center',
};

export const EventInfo = ({ title }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    image,
    create,
    update,
    ageRestriction,
    isShowOnSlider,
    eventManager,
    concertManagerInfo,
    concertManagerPercentage,
  } = useSelector(selectEventState);

  console.log('render EventInfo');

  const handleChangeCheckbox = (field: keyof IEvent) => (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    dispatch(setEventStateField({ [field]: checked }));
  };
  const handleDelete = useCallback(
    (field: keyof IEvent) => () => {
      dispatch(setEventStateField({ [field]: undefined }));
    },
    [dispatch],
  );

  const handleChangeMedia = useCallback(
    (image: MediaSelectData) => {
      dispatch(setEventStateField({ image: image }));
    },
    [dispatch],
  );
  const handleDeleteMedia = useCallback(() => {
    dispatch(setEventStateField({ image: undefined }));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader
        title='Информация'
        avatar={
          <Tooltip
            arrow
            placement='top'
            title={`Событие создано: ${formatter.format(
              new Date(create),
            )}. Последний раз редактировалось: ${formatter.format(new Date(update))}`}
          >
            <HelpOutlineTwoToneIcon />
          </Tooltip>
        }
      />
      <Divider />
      <CardContent>
        <TextField
          label='Заголовок'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          value={title || ''}
          focused={!!title}
          onChange={useChangeFnEventField('title')}
        />
        <Grid spacing={3} container alignItems='center'>
          <Grid item xs={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextFieldImage size='small' value={image} onSelect={handleChangeMedia} onDelete={handleDeleteMedia} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label='Возраст'
                  type='number'
                  value={ageRestriction ?? 0}
                  focused={!!ageRestriction}
                  onChange={useChangeFnEventField('ageRestriction')}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label='Процент сделки'
                  type='number'
                  value={concertManagerPercentage ?? 0}
                  focused={!!concertManagerPercentage}
                  onChange={useChangeFnEventField('concertManagerPercentage')}
                />
              </Grid>
              <Grid item xs={4}>
                <Tooltip arrow placement='top' title='Включить событие для показа в слайдере на главной странице'>
                  <FormGroup>
                    <FormControlLabel
                      sx={formControlLabelStyle}
                      control={<Switch checked={isShowOnSlider} />}
                      label='Включить в слайдер'
                      onChange={handleChangeCheckbox('isShowOnSlider')}
                    />
                  </FormGroup>
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <EventInfoManager handleDelete={handleDelete} manager={eventManager} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size='small'
                  fullWidth
                  multiline
                  rows={2}
                  label='Информация (ИНН, адрес, ...)'
                  value={concertManagerInfo ?? ''}
                  focused={!!concertManagerInfo}
                  onChange={useChangeFnEventField('concertManagerInfo')}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {/*<MediaDisplay image={headerImage} text={headerText} color={headerTextColor} />*/}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
