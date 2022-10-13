import React, { Component, useEffect, useState, Dispatch, SetStateAction, ReactNode } from 'react';
import {
  ClickAwayListener,
  ListItem,
  SelectProps,
  TextField,
  Select,
  OutlinedInput,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  IconButton,
  Box,
} from '@mui/material';
import { useDebounce } from '../../hooks/useDebounce';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

interface BaseProps {
  maxVisibleOptions?: number;
  fetchFn?: (query: string) => void;
  onDelete?: () => void;
}

type SearchableSelectProps = BaseProps & SelectProps;

const SelectWithSearch = (props: SearchableSelectProps) => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query);

  const { children, fetchFn, value, label, multiple, fullWidth, onChange, onDelete, ...other } = props;
  const focusedClass =
    // @ts-ignore
    (value && !Array.isArray(value) && value.uid) || (value && Array.isArray(value) && value.length)
      ? 'Mui-focused'
      : undefined;

  useEffect(() => {
    if (debouncedQuery && fetchFn) {
      fetchFn(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl fullWidth={fullWidth}>
        <InputLabel className={focusedClass}>{label}</InputLabel>
        <Select
          {...other}
          onChange={onChange}
          value={value}
          label={label}
          fullWidth={fullWidth}
          input={<OutlinedInput label={label} fullWidth={fullWidth} />}
          multiple={multiple}
          renderValue={(selected: any) =>
            (multiple ? (selected.map((s: any) => s.title) as string[]).join(', ') : selected?.title) as ReactNode
          }
          className={focusedClass}
        >
          <SearchFieldWrapper setQuery={setQuery} />
          {children}
        </Select>
      </FormControl>
      {!!focusedClass && onDelete && (
        <IconButton color='error' onClick={onDelete}>
          <DeleteForeverTwoToneIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default SelectWithSearch;

class SearchFieldWrapper extends Component<{ setQuery: Dispatch<SetStateAction<string>> }> {
  render() {
    const { setQuery } = this.props;

    return (
      <ClickAwayListener onClickAway={() => null}>
        <ListItem>
          <TextField
            fullWidth
            autoFocus
            placeholder='Поиск...'
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
          />
        </ListItem>
      </ClickAwayListener>
    );
  }
}
