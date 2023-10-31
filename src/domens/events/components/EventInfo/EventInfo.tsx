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
import { PostType } from '../../../../typings/enum';
import { isEqual } from '../../../../utils/helpers/isEqual';
import { CardHeaderAvatar } from '../../../post/components/PostInfo/CardHeaderAvatar';
import { useChangeFnCheckboxPostField } from '../../../post/hooks/useChangeFnCheckboxPostField';
import { useChangeFnFieldPostField } from '../../../post/hooks/useChangeFnFieldPostField';
import { useChangeFnMediaPostField } from '../../../post/hooks/useChangeFnMediaPostField';
import { useDeleteFnPostField } from '../../../post/hooks/useDeleteFnPostField';
import { IEvent } from '../../types';
import { EventInfoManager } from './EventInfoManager';
import { EventInfoMediaDisplay } from './EventInfoMediaDisplay';

type Props = {
  title: IEvent['title'];
  image: IEvent['image'];
  ageRestriction: IEvent['ageRestriction'];
  isShowOnSlider: IEvent['isShowOnSlider'];
  eventManager: IEvent['eventManager'];
  concertManagerInfo: IEvent['concertManagerInfo'];
  concertManagerPercentage: IEvent['concertManagerPercentage'];
};

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
  const type = PostType.event;

  const handleChangeTitle = useChangeFnFieldPostField({ field: 'title', type });
  const handleChangeAgeRestriction = useChangeFnFieldPostField({ field: 'ageRestriction', type });
  const handleChangeConcertManagerPercentage = useChangeFnFieldPostField({ field: 'concertManagerPercentage', type });
  const handleChangeConcertManagerInfo = useChangeFnFieldPostField({ field: 'concertManagerInfo', type });
  const handleChangeImage = useChangeFnMediaPostField({ field: 'image', type });

  const handleChangeIsShowOnSlider = useChangeFnCheckboxPostField({ field: 'isShowOnSlider', type });

  const handleDeleteImage = useDeleteFnPostField({ field: 'image', type });

  return (
    <Card>
      <CardHeader title='Информация' avatar={<CardHeaderAvatar type={type} />} />
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
          <Grid item xs={7}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextFieldImage size='small' value={image} onSelect={handleChangeImage} onDelete={handleDeleteImage} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label='Возраст'
                  type='number'
                  value={ageRestriction || ''}
                  focused={!!ageRestriction}
                  onChange={handleChangeAgeRestriction}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label='Процент сделки'
                  type='number'
                  value={concertManagerPercentage || ''}
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
          <Grid item xs={5}>
            <EventInfoMediaDisplay />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
},
isEqual);
