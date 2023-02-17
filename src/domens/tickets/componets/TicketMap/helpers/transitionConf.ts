import { config } from '@react-spring/konva';

import { CircleColors } from '../../../../../typings/enum';
import { DrawCircleType } from '../../../../../typings/types';

const defaultRadius = 10;
export const multiplier = 1.19;

export function transitionConf(circle: DrawCircleType | null) {
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
