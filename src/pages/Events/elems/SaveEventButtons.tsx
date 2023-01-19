import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

import { saveEventAsync } from '../../../domen/events/eventsThunk';
import { AppDispatch } from '../../../domen/store';
import { PostStatus } from '../../../typings/enum';

const tooltipStyle = { ml: 2, my: 0.5 };

export const SaveEventButtons = memo(function SaveEventButtons() {
  const dispatch: AppDispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(saveEventAsync());
  };
  const handleIconClick = (type: PostStatus) => () => {
    dispatch(saveEventAsync(type));
  };

  console.log('render SaveEventButtons');

  return (
    <Box>
      <Tooltip sx={tooltipStyle} placement='top' arrow title='Сохранить черновик'>
        <IconButton color='primary' onClick={handleIconClick(PostStatus.draft)}>
          <SaveAsTwoToneIcon />
        </IconButton>
      </Tooltip>
      <Tooltip sx={tooltipStyle} placement='top' arrow title='Опубликовать событие'>
        <IconButton color='success' onClick={handleIconClick(PostStatus.publish)}>
          <PublicTwoToneIcon />
        </IconButton>
      </Tooltip>
      <Button sx={{ mx: 2, my: 0.5 }} variant='contained' onClick={handleButtonClick}>
        Сохранить
      </Button>
    </Box>
  );
});
