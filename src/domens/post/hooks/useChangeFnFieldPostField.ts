import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';

import { PostType } from '../../../typings/enum';
import { Artist } from '../../../typings/types';
import { IEvent } from '../../events/types';
import { IItem } from '../../items/types';
import { useSetPostStateField } from './useSetPostStateField';

export type ChangePostFieldType = SelectChangeEvent<unknown> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type PostFieldTypeProps =
  | { field: keyof IEvent; type: PostType.event }
  | { field: keyof IItem; type: PostType.item }
  | { field: keyof Artist; type: PostType.artist };

export function useChangeFnFieldPostField<T extends ChangePostFieldType>(
  props: PostFieldTypeProps,
): (event: T) => void {
  const dispatchFn = useSetPostStateField(props);

  return useCallback(
    (event) => {
      const value = event.target.value;
      dispatchFn(value);
    },
    [dispatchFn],
  );
}
