import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Box, IconButton, Tooltip } from '@mui/material';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store';
import { deleteEventAsync } from '../../store/eventsThunk';

type Props = { uid: string };

const tooltipStyle = { mr: 2, my: 0.5 };

export const DeleteButton = memo(function DeleteButton({ uid }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    dispatch(deleteEventAsync(uid));
    navigate('/events');
  };

  return (
    <Box>
      <Tooltip sx={tooltipStyle} placement='top' arrow title='Удалить событие'>
        <IconButton color='error' onClick={handleButtonClick}>
          <DeleteForeverTwoToneIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
});
