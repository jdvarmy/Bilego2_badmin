import { ICellRendererParams } from 'ag-grid-community';
import React, { useCallback } from 'react';

import { DeleteTableCellItemIcon } from '../../../../UI/DeleteTableCellItemIcon';
import { useAppDispatch } from '../../../store';
import { deleteItemAsync } from '../../store/itemsThunk';

export const RenderDeleteItem = (props: ICellRendererParams) => {
  const dispatch = useAppDispatch();

  const handleDeleteMedia = useCallback(() => {
    if (props.data.uid) {
      dispatch(deleteItemAsync(props.data.uid));
    }
  }, [props, dispatch]);

  const Component = DeleteTableCellItemIcon(handleDeleteMedia);

  return <Component />;
};
