import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ICellRendererParams } from 'ag-grid-community';
import { Box, IconButton } from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { AppDispatch } from '../../../domen/store';
import { deleteTaxonomyAsync } from '../../../domen/taxonomy/taxonomyThunk';

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
