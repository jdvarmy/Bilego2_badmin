import { Grid, TextField } from '@mui/material';
import React, { ChangeEvent, memo } from 'react';

import TextFieldWithDisabledButton from '../../../../components/TextFieldWithDisabledButton/TextFieldWithDisabledButton';
import { TicketType } from '../../../../typings/enum';
import { Ticket } from '../../../../typings/types';

type Props = {
  type?: TicketType;
  name?: string;
  description?: string;
  onChange?: (field: keyof Ticket) => (e: ChangeEvent<HTMLInputElement>) => void;
};

const TicketControlsTicketName = ({ type, name, description, onChange }: Props) => {
  return type === TicketType.simple ? (
    <>
      <Grid item xs={4}>
        <TextField
          label='Название билета'
          type='text'
          fullWidth
          size='small'
          focused={!!name}
          value={name || ''}
          onChange={onChange && onChange('name')}
        />
      </Grid>
      <Grid item xs>
        <TextField
          label='Описание'
          type='text'
          fullWidth
          size='small'
          focused={!!description}
          value={description || ''}
          onChange={onChange && onChange('description')}
        />
      </Grid>
    </>
  ) : (
    <>
      <Grid item xs={8} container>
        <TextFieldWithDisabledButton label='Место' type='text' fullWidth size='small' />
        <TextFieldWithDisabledButton sx={{ mx: '1.5rem' }} label='Ряд' type='text' fullWidth size='small' />
        <TextFieldWithDisabledButton label='Сектор' type='text' fullWidth size='small' />
      </Grid>
    </>
  );
};

export default memo(TicketControlsTicketName);
