import React, { memo } from 'react';
import { Layer } from 'react-konva';

import AnimateHoverCircle from './components/AnimateHoverCircle';
import AnimateSelectedCircle from './components/AnimateSelectedCircle';
import AnimateTicketsCircle from './components/AnimateTicketsCircle';

const ActiveCanvas = () => (
  <Layer>
    <AnimateTicketsCircle />
    <AnimateHoverCircle />
    <AnimateSelectedCircle />
  </Layer>
);

export default memo(ActiveCanvas);
