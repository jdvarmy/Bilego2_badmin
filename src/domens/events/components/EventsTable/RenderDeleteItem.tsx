import { ICellRendererParams } from 'ag-grid-community';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { DeleteTableCellItemIcon } from '../../../../UI/DeleteTableCellItemIcon';
import { AppDispatch } from '../../../store';
import { deleteEventAsync } from '../../store/eventsThunk';

export const RenderDeleteItem = (props: ICellRendererParams) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteMedia = useCallback(() => {
    if (props.data.uid) {
      dispatch(deleteEventAsync(props.data.uid));
    }
  }, [props, dispatch]);

  const Component = DeleteTableCellItemIcon(handleDeleteMedia);

  return <Component />;
};
