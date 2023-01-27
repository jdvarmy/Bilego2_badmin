import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Box, IconButton } from '@mui/material';
import React, { memo } from 'react';

export const DeleteTableCellItemIcon = (onDeleteHandler: () => void) =>
  memo(function DeleteTableCellItemIcon() {
    return (
      <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton size='small' color='error' onClick={onDeleteHandler}>
          <DeleteForeverTwoToneIcon />
        </IconButton>
      </Box>
    );
  });
