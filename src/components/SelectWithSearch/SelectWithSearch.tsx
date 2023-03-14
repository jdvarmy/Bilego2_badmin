import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Box, FormControl, IconButton, InputLabel, OutlinedInput, Select, SelectProps } from '@mui/material';
import React, { MouseEventHandler, useState } from 'react';

import { isArray } from '../../utils/helpers/isArray';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { SearchFieldWrapper } from './SearchFieldWrapper';

interface BaseProps {
  maxVisibleOptions?: number;
  fetchFn?: (query?: string) => void;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  onClose?: MouseEventHandler<HTMLButtonElement>;
}

type SearchableSelectProps = BaseProps & SelectProps;

const SelectWithSearch = (props: SearchableSelectProps) => {
  const [query, setQuery] = useState<string>('');
  const { children, fetchFn, value, label, multiple, fullWidth, onChange, onDelete, onClose, ...other } = props;
  const focusedClass =
    (typeof value === 'object' && 'uid' in value) || (value && isArray(value) && value.length)
      ? 'Mui-focused'
      : undefined;

  const debounceFetchFn = useDebounce(() => fetchFn(query));
  const handleChange = (value: string) => {
    setQuery(value);
    debounceFetchFn();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl fullWidth={fullWidth}>
        <InputLabel className={focusedClass}>{label}</InputLabel>
        <Select
          className={focusedClass}
          input={<OutlinedInput label={label} fullWidth={fullWidth} />}
          label={label}
          multiple={multiple}
          fullWidth={fullWidth}
          value={value}
          renderValue={(selected: any) => {
            if (multiple) {
              return (selected.map((s: any) => s.title || s.name) as string[]).join(', ');
            }
            if (selected?.title || selected.surname) {
              `${selected.surname} ${selected.name}`;
            }

            return selected.name ?? selected.title;
          }}
          onChange={onChange}
          onClose={onClose}
          {...other}
        >
          <SearchFieldWrapper onChange={handleChange} />
          {children}
        </Select>
      </FormControl>
      {!!focusedClass && !!onDelete && (
        <IconButton color='error' onClick={onDelete}>
          <DeleteForeverTwoToneIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default SelectWithSearch;
