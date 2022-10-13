import React, { memo } from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';

const SaveEventButtons = () => {
  const handleButtonClick = () => {
    console.log(1);
  };

  console.log('render SaveEventButtons');

  return (
    <Box>
      <Tooltip sx={{ ml: 2, my: 0.5 }} placement='top' arrow title='Сохранить черновик'>
        <IconButton color='primary' onClick={handleButtonClick}>
          <SaveAsTwoToneIcon />
        </IconButton>
      </Tooltip>
      <Tooltip sx={{ ml: 2, my: 0.5 }} placement='top' arrow title='Опубликовать событие'>
        <IconButton color='success' onClick={handleButtonClick}>
          <PublicTwoToneIcon />
        </IconButton>
      </Tooltip>
      <Button sx={{ mx: 2, my: 0.5 }} variant='contained'>
        Сохранить
      </Button>
    </Box>
  );
};

export default memo(SaveEventButtons);
