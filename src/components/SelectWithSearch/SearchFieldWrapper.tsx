import { ClickAwayListener, ListItem, TextField } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent } from 'react';

export function SearchFieldWrapper({ onChange }: { onChange: (value: string) => void }) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <ClickAwayListener onClickAway={() => null}>
      <ListItem>
        <TextField fullWidth autoFocus placeholder='Поиск...' onChange={handleChange} onKeyDown={handleKeyDown} />
      </ListItem>
    </ClickAwayListener>
  );
}
