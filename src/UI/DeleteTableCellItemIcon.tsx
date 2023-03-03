import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Box, IconButton } from '@mui/material';
import React, { MouseEventHandler, forwardRef } from 'react';

type Props = {
  onClick?: MouseEventHandler;
};

export const DeleteTableCellItemIcon = (onDeleteHandler?: () => void) =>
  forwardRef(function DeleteTableCellItemIcon({ onClick }: Props, ref) {
    return (
      <Box
        ref={ref}
        sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        onClick={onClick}
      >
        <IconButton size='small' color='error' onClick={onDeleteHandler}>
          <DeleteForeverTwoToneIcon />
        </IconButton>
      </Box>
    );
  });
