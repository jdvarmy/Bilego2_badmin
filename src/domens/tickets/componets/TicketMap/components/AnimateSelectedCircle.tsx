import Konva from 'konva';
import React, { useCallback } from 'react';
import { Circle, Group } from 'react-konva';

import { CircleColors } from '../../../../../typings/enum';
import { DrawCircleType } from '../../../../../typings/types';
import { useActionCreators } from '../../../../../utils/hooks/useActionCreators';
import { selectSelectedCircles } from '../../../../circle/store/circleSelectors';
import { circleActions } from '../../../../circle/store/circleSlice';
import { useStateSelector } from '../../../../store';

import KonvaEventObject = Konva.KonvaEventObject;

const multiplier = 1.39 as const;

const AnimateSelectedCircle = () => {
  const actions = useActionCreators(circleActions);
  const selectedCircles = useStateSelector(selectSelectedCircles);

  const handleMouseEnter = useCallback((circle: DrawCircleType) => actions.setHoveredCircle(circle), []);
  const handleClick = useCallback((uid: string) => () => actions.deleteSelectedCircle(uid), []);
  const handleMouse = useCallback(
    (type: 'enter' | 'leave', circle?: DrawCircleType) => (evt: KonvaEventObject<MouseEvent>) => {
      const container = evt?.target?.getStage()?.container();

      if (container) {
        switch (type) {
          case 'enter':
            if (circle) {
              handleMouseEnter(circle);
            }
            container.style.cursor = 'pointer';
            break;
          case 'leave':
          default:
            actions.deleteHoveredCircle();
            container.style.cursor = 'default';
        }
      }
    },
    [],
  );

  return (
    <Group>
      {selectedCircles?.map(({ uid, r, fill, ...props }, k) => {
        return (
          <Circle
            key={uid}
            radius={r * multiplier}
            onClick={handleClick(uid)}
            fillRadialGradientStartRadius={(r + 7) / 2}
            fillRadialGradientEndRadius={r / 2}
            fillRadialGradientColorStops={[0, CircleColors.selectedInner, 1, CircleColors.selectedOuter]}
            fillPriority='radial-gradient'
            onMouseEnter={handleMouse('enter', selectedCircles[k])}
            onMouseLeave={handleMouse('leave')}
            {...props}
          />
        );
      })}
    </Group>
  );
};

export default AnimateSelectedCircle;
