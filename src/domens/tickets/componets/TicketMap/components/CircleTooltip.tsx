import React, { useState } from 'react';
import { Html } from 'react-konva-utils';

import { DrawCircleType } from '../../../../../typings/types';
import { selectSelectedDateMapSectors } from '../../../../eventDates/store/eventDatesSelectors';
import { useStateSelector } from '../../../../../store/store';
import { useMapStage } from '../TicketMap';
import CircleTooltipContent from './CircleTooltipContent';

type TransformAttrs = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  skewX: number;
  skewY: number;
};

type Props = {
  circle: DrawCircleType;
  multiplier: number;
};

const CircleTooltip = ({ circle, multiplier }: Props) => {
  const sectors = useStateSelector(selectSelectedDateMapSectors);
  const [box, setBox] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const stage = useMapStage();

  const scale = stage?.scaleX() || 1;
  const sector = sectors?.find((item) => item.uid === circle.sector);
  const handleTransformHTML = (attrs: TransformAttrs) => ({ ...attrs, scaleX: 1, scaleY: 1 });
  // todo: еще раз посмотреть на позиционирование тултипа, осталась проблема с позицией во время масштабирования

  return (
    <Html
      transformFunc={handleTransformHTML}
      groupProps={{
        x: circle.x - (box.width * 0.5) / scale,
        y: circle.y - box.height / scale - (circle?.r || 0) * multiplier - 10,
      }}
    >
      <CircleTooltipContent sector={sector} circle={circle} setBox={setBox} />
    </Html>
  );
};

export default CircleTooltip;
