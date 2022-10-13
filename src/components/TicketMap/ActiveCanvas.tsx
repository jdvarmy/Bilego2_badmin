import React, { memo } from 'react';
import { Layer } from 'react-konva';
import AnimateTicketsCircle from './elements/AnimateTicketsCircle';
import AnimateHoverCircle from './elements/AnimateHoverCircle';
import AnimateSelectedCircle from './elements/AnimateSelectedCircle';

const ActiveCanvas = () => (
  <Layer>
    <AnimateTicketsCircle />
    <AnimateHoverCircle />
    <AnimateSelectedCircle />
  </Layer>
);

export default memo(ActiveCanvas);
