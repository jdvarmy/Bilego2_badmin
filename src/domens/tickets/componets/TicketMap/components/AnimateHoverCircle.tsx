import { animated, useTransition } from '@react-spring/konva';
import Konva from 'konva';
import React, { memo, useCallback } from 'react';
import { Circle, Group, Text } from 'react-konva';

import { DrawCircleType } from '../../../../../typings/types';
import { useActionCreators } from '../../../../../utils/hooks/useActionCreators';
import { selectHoveredCircle } from '../../../../circle/store/circleSelectors';
import { circleActions } from '../../../../circle/store/circleSlice';
import { useStateSelector } from '../../../../../store/store';
import { multiplier, transitionConf } from '../helpers/transitionConf';
import CircleTooltip from './CircleTooltip';

import TextConfig = Konva.TextConfig;
import KonvaEventObject = Konva.KonvaEventObject;

const textProps: TextConfig = { fontSize: 24, align: 'center', width: 100, fill: 'white', fontStyle: 'bold' };

const AnimateHoverCircle = () => {
  const actions = useActionCreators(circleActions);
  const hoveredCircle = useStateSelector(selectHoveredCircle);

  const transitions = useTransition(hoveredCircle, transitionConf(hoveredCircle));

  const handleClick = useCallback((circle: DrawCircleType) => () => actions.setSelectedCircles(circle), []);
  const handleMouse = useCallback((type: 'enter' | 'leave') => {
    return (evt: KonvaEventObject<MouseEvent>) => {
      const container = evt?.target?.getStage()?.container();

      if (container) {
        switch (type) {
          case 'enter':
            container.style.cursor = 'pointer';
            break;
          case 'leave':
          default:
            actions.deleteHoveredCircle();
            container.style.cursor = 'default';
        }
      }
    };
  }, []);

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
