import { ICellRendererParams } from 'ag-grid-community';
import React, { useCallback } from 'react';

import { DeleteTableCellItemIcon } from '../../../../UI/DeleteTableCellItemIcon';
import { useAppDispatch } from '../../../store';
import { deleteEventAsync } from '../../store/eventsThunk';

export const RenderDeleteItem = (props: ICellRendererParams) => {
  const dispatch = useAppDispatch();

  const handleDeleteMedia = useCallback(() => {
    if (props.data.uid) {
      dispatch(deleteEventAsync(props.data.uid));
    }
  }, [props, dispatch]);

  const Component = DeleteTableCellItemIcon(handleDeleteMedia);

  return <Component />;
};
