import React, { ForwardedRef, forwardRef, Dispatch, SetStateAction } from 'react';
import { Button } from '@mui/material';

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
      {isColor ? 'Выберите цвет' : color}
    </Button>
  );
});

ColorButton.displayName = 'ColorButton';

export default ColorButton;
