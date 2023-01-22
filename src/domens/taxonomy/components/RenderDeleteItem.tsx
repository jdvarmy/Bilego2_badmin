import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Box, IconButton } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { deleteTaxonomyAsync } from '../store/taxonomyThunk';

export const RenderDeleteItem = (props: ICellRendererParams) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteMedia = useCallback(() => {
    if (props.data.id) {
      dispatch(deleteTaxonomyAsync(props.data.id));
    }
  }, [props, dispatch]);

  return (
    <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <IconButton size='small' color='error' onClick={handleDeleteMedia}>
        <DeleteForeverTwoToneIcon />
      </IconButton>
    </Box>
  );
};
