import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Konva from 'konva';
import { Circle, Group } from 'react-konva';
import { selectCircleStore } from '../../../domen/selectors';
import { deleteHoveredCircle, deleteSelectedCircle, setHoveredCircle } from '../../../domen/circleSlice/circleSlice';
import { CircleColors } from '../../../typings/enum';
import { DrawCircleType } from '../../../typings/types';
import KonvaEventObject = Konva.KonvaEventObject;

const multiplier = 1.39 as const;

const AnimateSelectedCircle = () => {
  const dispatch = useDispatch();
  const { selectedCircles } = useSelector(selectCircleStore);

  const handleMouseEnter = useCallback((circle: DrawCircleType) => dispatch(setHoveredCircle(circle)), [dispatch]);
  const handleClick = useCallback((uid: string) => () => dispatch(deleteSelectedCircle(uid)), [dispatch]);
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
            dispatch(deleteHoveredCircle());
            container.style.cursor = 'default';
        }
      }
    },
    [dispatch],
  );

  return (
    <Group>
      {selectedCircles?.map((p, k) => {
        const { uid, r, fill: _fill, ...props } = p;

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
