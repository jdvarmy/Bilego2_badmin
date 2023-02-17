import React, { Key, useCallback } from 'react';
import { Circle } from 'react-konva';

import { CircleElement, DrawCircleType } from '../../../../../typings/types';
import { useActionCreators } from '../../../../../utils/hooks/useActionCreators';
import { circleActions } from '../../../../circle/store/circleSlice';

type Props = {
  active?: boolean;
};

const DrawCircle = ({ cx, cy, r, fill, active = false, ...props }: CircleElement & Props) => {
  const actions = useActionCreators(circleActions);

  const { uid, name, rowName, sector, multi } = props as Partial<{
    uid: string;
    name: Key;
    rowName: Key;
    sector: Key;
    multi: boolean;
  }>;
  const circle: DrawCircleType = {
    uid: uid as string,
    x: cx,
    y: cy,
    r,
    seat: name as string,
    row: rowName as string,
    sector: sector as string,
    multi: !!multi || false,
  };

  const handleMouseEnter = useCallback(() => actions.setHoveredCircle(circle), []);

  return (
    <Circle
      x={cx}
      y={cy}
      radius={r * 0.86}
      fill={fill === 'none' ? undefined : fill}
      onMouseEnter={active ? handleMouseEnter : undefined}
    />
  );
};

export default DrawCircle;
