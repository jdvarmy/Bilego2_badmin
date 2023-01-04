import React, { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Konva from 'konva';
import { Group, Circle, Text } from 'react-konva';
import { animated, config, useTransition } from '@react-spring/konva';
import { AppDispatch } from '../../../domen/store';
import { deleteHoveredCircle, setSelectedCircles } from '../../../domen/circleSlice/circleSlice';
import { selectCircleStore } from '../../../domen/selectors';
import { CircleColors } from '../../../typings/enum';
import { DrawCircleType } from '../../../typings/types';
import CircleTooltip from './CircleTooltip';

import TextConfig = Konva.TextConfig;
import KonvaEventObject = Konva.KonvaEventObject;

const defaultRadius = 10;
const multiplier = 1.19;
const textProps: TextConfig = { fontSize: 24, align: 'center', width: 100, fill: 'white', fontStyle: 'bold' };

const AnimateHoverCircle = () => {
  const dispatch: AppDispatch = useDispatch();
  const { hoveredCircle } = useSelector(selectCircleStore);

  const transitions = useTransition(hoveredCircle, transitionConf(hoveredCircle));

  const handleClick = useCallback((circle: DrawCircleType) => () => dispatch(setSelectedCircles(circle)), [dispatch]);
  const handleMouse = useCallback(
    (type: 'enter' | 'leave') => {
      return (evt: KonvaEventObject<MouseEvent>) => {
        const container = evt?.target?.getStage()?.container();

        if (container) {
          switch (type) {
            case 'enter':
              container.style.cursor = 'pointer';
              break;
            case 'leave':
            default:
              dispatch(deleteHoveredCircle());
              container.style.cursor = 'default';
          }
        }
      };
    },
    [dispatch],
  );

  return (
    <Group>
      {transitions(
        ({ fill, radius }: any, item) =>
          // @ts-ignore
          item && <animated.Circle key={item.uid} {...item} fill={fill} radius={radius} />,
      )}
      {hoveredCircle && (
        <>
          <CircleTooltip circle={hoveredCircle} multiplier={multiplier} />
          <Text
            x={(hoveredCircle.x || 1) - 50}
            y={(hoveredCircle.y || 1) - 9}
            text={hoveredCircle.seat as string}
            {...textProps}
          />
          <Circle
            x={hoveredCircle?.x}
            y={hoveredCircle?.y}
            fill='transparent'
            radius={(hoveredCircle?.r || 0) * multiplier}
            onClick={handleClick(hoveredCircle)}
            onMouseEnter={handleMouse('enter')}
            onMouseLeave={handleMouse('leave')}
          />
        </>
      )}
    </Group>
  );
};

export default memo(AnimateHoverCircle);

function transitionConf(circle: DrawCircleType | null) {
  return {
    from: () => {
      const fill = circle?.fill || CircleColors.default;
      return { fill, radius: defaultRadius };
    },
    enter: () => async (next: any) => {
      const radius = circle?.r || 0;
      await next({ fill: CircleColors.hovered, radius: radius * multiplier });
    },
    leave: () => async (next: any) => {
      const fill = circle?.fill || CircleColors.default;
      await next({ fill, radius: defaultRadius });
    },
    config: config.stiff,
  };
}
