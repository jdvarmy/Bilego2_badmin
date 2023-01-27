import { ICellRendererParams } from 'ag-grid-community';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { DeleteTableCellItemIcon } from '../../../UI/DeleteTableCellItemIcon';
import { AppDispatch } from '../../store';
import { deleteTaxonomyAsync } from '../store/taxonomyThunk';

export const RenderDeleteItem = (props: ICellRendererParams) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteMedia = useCallback(() => {
    if (props.data.id) {
      dispatch(deleteTaxonomyAsync(props.data.id));
    }
  }, [props, dispatch]);

  const Component = DeleteTableCellItemIcon(handleDeleteMedia);

  return <Component />;
};
