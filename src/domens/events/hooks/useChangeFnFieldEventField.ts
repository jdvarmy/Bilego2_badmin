import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';

import { IEvent } from '../../../typings/types';
import { useSetEventStateField } from './useSetEventStateField';

export type ChangeEventFieldType = SelectChangeEvent<unknown> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export function useChangeFnFieldEventField<T extends ChangeEventFieldType>(field: keyof IEvent): (event: T) => void {
  const dispatchFn = useSetEventStateField(field);

  return useCallback(
    (event) => {
      const value = event.target.value;
      dispatchFn(value);
    },
    [dispatchFn],
  );
}
