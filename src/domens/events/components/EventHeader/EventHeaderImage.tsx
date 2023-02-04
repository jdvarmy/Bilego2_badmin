import { Grid, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextFieldImage from '../../../../components/TextFieldImage/TextFieldImage';
import { isEqual } from '../../../../utils/helpers/isEqual';
import { useThrottle } from '../../../../utils/hooks/useThrottle';
import { AppDispatch } from '../../../store';
import { useChangeFnMediaEventField } from '../../hooks/useChangeFnMediaEventField';
import { useDeleteFnEventField } from '../../hooks/useDeleteFnEventField';
import { selectEventStateHeaderImageData } from '../../store/eventsSelectors';
import { eventsActions } from '../../store/eventsSlice';
import { MediaDisplay } from './MediaDisplay';

export const EventHeaderImage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { headerImage, headerText, headerTextColor } = useSelector(selectEventStateHeaderImageData, isEqual);

  const handleChangeImage = useChangeFnMediaEventField('headerImage');
  const handleDeleteImage = useDeleteFnEventField('headerImage');

  const handleChange = (name: string, field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const prev = 'headerText' === name ? JSON.parse(headerText) : JSON.parse(headerTextColor);

    dispatch(
      eventsActions.setEventStateField({
        [name]: JSON.stringify({ ...prev, [field]: event.target.value }),
      }),
    );
  };
  const throttleHandleChange = useThrottle(handleChange);
  const handleChangeText = (name: string, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(name, field, event);
  };
  const handleChangeColor = (name: string, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    throttleHandleChange(name, field, event);
  };

  const fields = useMemo(
    () => getFields(headerText, headerTextColor, handleChangeText, handleChangeColor),
    [handleChangeText, handleChangeColor, headerText, headerTextColor],
  );

  return (
    <Grid spacing={3} container alignItems='center'>
      <Grid item xs={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextFieldImage
              size='small'
              value={headerImage}
              onSelect={handleChangeImage}
              onDelete={handleDeleteImage}
            />
          </Grid>
          {fields.map(({ grid, label, ...props }) => (
            <Grid key={label} item xs={grid}>
              <TextField size='small' fullWidth label={label} {...props} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <MediaDisplay image={headerImage} text={headerText} color={headerTextColor} />
      </Grid>
    </Grid>
  );
};

function getFields(
  headerText: string,
  headerTextColor: string,
  onText: any,
  onColor: any,
): (TextFieldProps & { grid: number; label: string })[] {
  const { title, subtitle, meta } = JSON.parse(headerText);
  const { title: titleColor, subtitle: subtitleColor, meta: metaColor } = JSON.parse(headerTextColor);

  return [
    { label: 'Заголовок', value: title, focused: !!title, onChange: onText('headerText', 'title'), grid: 8 },
    {
      label: 'Цвет заголовка',
      value: titleColor,
      focused: !!titleColor,
      onChange: onColor('headerTextColor', 'title'),
      grid: 4,
      type: 'color',
    },
    {
      label: 'Подзаголовок',
      value: subtitle,
      focused: !!subtitle,
      onChange: onText('headerText', 'subtitle'),
      grid: 8,
    },
    {
      label: 'Цвет подзаголовка',
      value: subtitleColor,
      focused: !!subtitleColor,
      onChange: onColor('headerTextColor', 'subtitle'),
      grid: 4,
      type: 'color',
    },
    { label: 'Описание', value: meta, focused: !!meta, onChange: onText('headerText', 'meta'), grid: 8 },
    {
      label: 'Цвет описания',
      value: metaColor,
      focused: !!metaColor,
      onChange: onColor('headerTextColor', 'meta'),
      grid: 4,
      type: 'color',
    },
  ];
}
