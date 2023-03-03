import { Box, Button, Grid, Popover, Typography } from '@mui/material';
import { PopoverProps } from '@mui/material/Popover/Popover';
import React, { memo } from 'react';

type Props = PopoverProps & {
  onDelete: () => void;
  onClose: () => void;
};

export const PopoverDelete = memo(function PopoverDelete({ onDelete, ...props }: Props) {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      {...props}
    >
      <Box sx={{ m: 1, maxWidth: '284px' }}>
        <Grid container alignItems='center' justifyContent='center'>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>
              Точно хочешь удалить?
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent='space-around'>
            <Button color='error' onClick={onDelete}>
              Да, удаляй!
            </Button>
            <Button color='primary' onClick={props.onClose}>
              Упс, не хочу!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Popover>
  );
});
