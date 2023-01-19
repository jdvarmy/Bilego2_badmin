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
import React, { memo } from 'react';

import TextFieldImage from '../../../../components/TextFieldImage/TextFieldImage';
import { useChangeFnCheckboxEventField } from '../../../../domen/events/hooks/useChangeFnCheckboxEventField';
import { useChangeFnFieldEventField } from '../../../../domen/events/hooks/useChangeFnFieldEventField';
import { useChangeFnMediaEventField } from '../../../../domen/events/hooks/useChangeFnMediaEventField';
import { useDeleteFnEventField } from '../../../../domen/events/hooks/useDeleteFnEventField';
import { IEvent } from '../../../../typings/types';
import { isEqual } from '../../../../utils/functions/isEqual';
import { CardHeaderAvatar } from './CardHeaderAvatar';
import { EventInfoManager } from './EventInfoManager';

type Props = {
  title: IEvent['title'];
  image: IEvent['image'];
  ageRestriction: IEvent['ageRestriction'];
  isShowOnSlider: IEvent['isShowOnSlider'];
  eventManager: IEvent['eventManager'];
  concertManagerInfo: IEvent['concertManagerInfo'];
  concertManagerPercentage: IEvent['concertManagerPercentage'];
};

// 4_188_069
const formControlLabelStyle = {
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'center',
  flexWrap: 'nowrap',
  justifyContent: 'center',
};

export const EventInfo = memo(function EventInfo({
  title,
  image,
  ageRestriction,
  isShowOnSlider,
  eventManager,
  concertManagerInfo,
  concertManagerPercentage,
}: Props) {
  console.log('render EventInfo');

  const handleChangeTitle = useChangeFnFieldEventField('title');
  const handleChangeAgeRestriction = useChangeFnFieldEventField('ageRestriction');
  const handleChangeConcertManagerPercentage = useChangeFnFieldEventField('concertManagerPercentage');
  const handleChangeConcertManagerInfo = useChangeFnFieldEventField('concertManagerInfo');
  const handleChangeImage = useChangeFnMediaEventField('image');

  const handleChangeIsShowOnSlider = useChangeFnCheckboxEventField('isShowOnSlider');

  const handleDeleteImage = useDeleteFnEventField('image');

  return (
    <Card>
      <CardHeader title='Информация' avatar={<CardHeaderAvatar />} />
      <Divider />
      <CardContent>
        <TextField
          label='Заголовок'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          value={title || ''}
          focused={!!title}
          onChange={handleChangeTitle}
        />
        <Grid spacing={3} container alignItems='center'>
          <Grid item xs={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextFieldImage size='small' value={image} onSelect={handleChangeImage} onDelete={handleDeleteImage} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label='Возраст'
                  type='number'
                  value={ageRestriction ?? 0}
                  focused={!!ageRestriction}
                  onChange={handleChangeAgeRestriction}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label='Процент сделки'
                  type='number'
                  value={concertManagerPercentage ?? 0}
                  focused={!!concertManagerPercentage}
                  onChange={handleChangeConcertManagerPercentage}
                />
              </Grid>
              <Grid item xs={4}>
                <Tooltip arrow placement='top' title='Включить событие для показа в слайдере на главной странице'>
                  <FormGroup>
                    <FormControlLabel
                      sx={formControlLabelStyle}
                      control={<Switch checked={isShowOnSlider} />}
                      label='Включить в слайдер'
                      onChange={handleChangeIsShowOnSlider}
                    />
                  </FormGroup>
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <EventInfoManager manager={eventManager} />
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
                  onChange={handleChangeConcertManagerInfo}
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
},
isEqual);
