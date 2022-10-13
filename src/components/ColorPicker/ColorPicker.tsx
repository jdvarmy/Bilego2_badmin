import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';
import ColorButton from './ColorButton';
import ColorBox from './ColorBox';

type Props = {
  color?: string;
  onChange: (value: string) => void;
};

const ColorPicker = ({ color = 'transparent', onChange = () => undefined }: Props) => {
  const refPicker = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <ColorButton color={color} ref={refPicker} setOpen={setOpen} />
      <ColorBox setColor={onChange} open={open} setOpen={setOpen} anchorEl={refPicker.current} />
    </Box>
  );
};

export default ColorPicker;
