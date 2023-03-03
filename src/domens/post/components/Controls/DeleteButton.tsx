import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Box, IconButton, Tooltip } from '@mui/material';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostType } from '../../../../typings/enum';
import { deleteEventAsync } from '../../../events/store/eventsThunk';
import { deleteItemAsync } from '../../../items/store/itemsThunk';
import { useAppDispatch } from '../../../store';

type Props = { uid: string; type: PostType };

const tooltipStyle = { mr: 2, my: 0.5 };

export const DeleteButton = memo(function DeleteButton({ uid, type }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const workerHandler = () => {
    switch (type) {
      case PostType.event:
        return () => {
          dispatch(deleteEventAsync(uid));
        };
      case PostType.item:
        return () => {
          dispatch(deleteItemAsync({ uid }));
        };
      case PostType.artist:
        return () => ({});
    }
  };

  const handleButtonClick = () => {
    workerHandler()();
    navigate(`/${type}s`);
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
