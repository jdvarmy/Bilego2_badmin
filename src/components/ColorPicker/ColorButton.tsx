import { Button } from '@mui/material';
import React, { Dispatch, ForwardedRef, SetStateAction, forwardRef } from 'react';

type Props = {
  color: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ColorButton = forwardRef(({ color, setOpen }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const isColor = color === 'transparent';

  return (
    <Button
      ref={ref}
      sx={{ backgroundColor: color }}
      size='small'
      variant={isColor ? 'text' : 'contained'}
      fullWidth
      onClick={handleClick}
    >
      {isColor ? 'Цвет' : color}
    </Button>
  );
});

ColorButton.displayName = 'ColorButton';

export default ColorButton;
