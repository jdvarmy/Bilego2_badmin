import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { Box, IconButton } from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { ICellRendererParams } from 'ag-grid-community';
import { deleteTaxonomyAsync } from '../../../store/taxonomySlice/taxonomyThunk';

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
