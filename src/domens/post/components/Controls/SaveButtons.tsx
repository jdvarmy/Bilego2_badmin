import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import React, { memo } from 'react';

import { PostStatus } from '../../../../typings/enum';
import { saveEventAsync } from '../../../events/store/eventsThunk';
import { useAppDispatch } from '../../../store';

const tooltipStyle = { ml: 2, my: 0.5 };

export const SaveButtons = memo(function SaveEventButtons() {
  const dispatch = useAppDispatch();

  const handleButtonClick = (status?: PostStatus) => () => {
    dispatch(saveEventAsync(status ? { status } : {}));
  };

  console.log('render SaveButtons');

  return (
    <Box>
      <Tooltip sx={tooltipStyle} placement='top' arrow title='Сохранить черновик'>
        <IconButton color='primary' onClick={handleButtonClick(PostStatus.draft)}>
          <SaveAsTwoToneIcon />
        </IconButton>
      </Tooltip>
      <Tooltip sx={tooltipStyle} placement='top' arrow title='Опубликовать событие'>
        <IconButton color='success' onClick={handleButtonClick(PostStatus.publish)}>
          <PublicTwoToneIcon />
        </IconButton>
      </Tooltip>
      <Button sx={{ mx: 2, my: 0.5 }} variant='contained' onClick={handleButtonClick()}>
        Сохранить
      </Button>
    </Box>
  );
});
