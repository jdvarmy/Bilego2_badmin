import Konva from 'konva';

import { ViewBoxSizes } from '../../types/types';
import { getPosition } from './getPosition';

import Vector2d = Konva.Vector2d;

export const handleDrag = (container: ViewBoxSizes, content: ViewBoxSizes, scale: number) => (pos: Vector2d) => {
  return getPosition(pos.x, pos.y, container, content, scale);
};
