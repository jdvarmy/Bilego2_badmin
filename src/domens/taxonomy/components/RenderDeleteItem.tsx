import { ICellRendererParams } from 'ag-grid-community';
import React, { useCallback } from 'react';

import { DeleteTableCellItemIcon } from '../../../UI/DeleteTableCellItemIcon';
import { useAppDispatch } from '../../store';
import { deleteTaxonomyAsync } from '../store/taxonomyThunk';

export const RenderDeleteItem = (props: ICellRendererParams) => {
  const dispatch = useAppDispatch();

  const handleDeleteMedia = useCallback(() => {
    if (props.data.id) {
      dispatch(deleteTaxonomyAsync(props.data.id));
    }
  }, [props, dispatch]);

  const Component = DeleteTableCellItemIcon(handleDeleteMedia);

  return <Component />;
};
