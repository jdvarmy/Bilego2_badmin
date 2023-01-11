import { Grid, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextFieldImage from '../../../../components/TextFieldImage/TextFieldImage';
import { selectEventState } from '../../../../domen/events/eventsSelectors';
import { setEventStateField } from '../../../../domen/events/eventsSlice';
import { AppDispatch } from '../../../../domen/store';
import { useThrottle } from '../../../../hooks/useThrottle';
import { MediaSelectData } from '../../../../typings/types';
import { MediaDisplay } from './MediaDisplay';

export const EventHeaderImage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { headerImage, headerText, headerTextColor } = useSelector(selectEventState);

  const handleChangeMedia = useCallback(
    (image: MediaSelectData) => {
      dispatch(setEventStateField({ headerImage: image }));
    },
    [dispatch],
  );
  const handleDeleteMedia = useCallback(() => {
    dispatch(setEventStateField({ headerImage: undefined }));
  }, [dispatch]);
  const handleChange = (name: string, field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const prev = 'headerText' === name ? JSON.parse(headerText) : JSON.parse(headerTextColor);

    dispatch(
      setEventStateField({
        [name]: JSON.stringify({ ...prev, [field]: event.target.value }),
      }),
    );
  };
  const throttleHandleChange = useThrottle(handleChange);
  const handleChangeText = (name: string, field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(name, field, event);
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
              onSelect={handleChangeMedia}
              onDelete={handleDeleteMedia}
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
