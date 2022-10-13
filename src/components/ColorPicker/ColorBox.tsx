import React, { Dispatch, SetStateAction } from 'react';
import { Box, Popover } from '@mui/material';
import { palette } from '../../typings/constants';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  anchorEl: HTMLButtonElement | null;
  setColor: (value: string) => void;
};

const ColorBox = ({ setColor, open = false, setOpen, anchorEl }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleColorChange = (newColor: string) => () => {
    setColor(newColor);
    handleClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Box p={2}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '256px' }}>
          {palette.map((paletteColor) => (
            <Box
              sx={{ backgroundColor: paletteColor, cursor: 'pointer', overflow: 'hidden', borderRadius: '1rem' }}
              key={paletteColor}
              p={3}
              m={1}
              onClick={handleColorChange(paletteColor)}
            />
          ))}
        </Box>
      </Box>
    </Popover>
  );
};

export default ColorBox;
