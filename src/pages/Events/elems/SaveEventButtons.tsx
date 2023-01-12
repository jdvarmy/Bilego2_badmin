import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectEventState } from '../../../domen/events/eventsSelectors';
import { saveEventAsync } from '../../../domen/events/eventsThunk';
import { AppDispatch } from '../../../domen/store';
import { PostStatus } from '../../../typings/enum';

const SaveEventButtons = () => {
  const dispatch: AppDispatch = useDispatch();
  const eventState = useSelector(selectEventState);

  const handleButtonClick = () => {
    dispatch(saveEventAsync(eventState));
  };
  const handleIconClick = (type: PostStatus) => () => {
    dispatch(saveEventAsync({ ...eventState, status: type }));
  };

  console.log('render SaveEventButtons');

  return (
    <Box>
      <Tooltip sx={{ ml: 2, my: 0.5 }} placement='top' arrow title='Сохранить черновик'>
        <IconButton color='primary' onClick={handleIconClick(PostStatus.draft)}>
          <SaveAsTwoToneIcon />
        </IconButton>
      </Tooltip>
      <Tooltip sx={{ ml: 2, my: 0.5 }} placement='top' arrow title='Опубликовать событие'>
        <IconButton color='success' onClick={handleIconClick(PostStatus.publish)}>
          <PublicTwoToneIcon />
        </IconButton>
      </Tooltip>
      <Button sx={{ mx: 2, my: 0.5 }} variant='contained' onClick={handleButtonClick}>
        Сохранить
      </Button>
    </Box>
  );
};

export default memo(SaveEventButtons);
