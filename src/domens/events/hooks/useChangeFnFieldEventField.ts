import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback, useMemo } from 'react';

import { IEvent } from '../../../typings/types';
import { useSetEventStateField } from './useSetEventStateField';

export type ChangeEventFieldType = SelectChangeEvent<unknown> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export function useChangeFnFieldEventField<T extends ChangeEventFieldType>(field: keyof IEvent): (event: T) => void {
  const dispatchFn = useSetEventStateField(field);
  const numberValues: (keyof IEvent)[] = useMemo(() => ['ageRestriction', 'concertManagerPercentage'], []);

  return useCallback(
    (event) => {
      const value = numberValues.includes(field) ? +event.target.value : event.target.value;
      dispatchFn(value);
    },
    [dispatchFn, field, numberValues],
  );
}
