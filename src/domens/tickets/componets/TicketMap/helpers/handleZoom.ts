import Konva from 'konva';

import { Point, ViewBoxSizes } from '../../../types';
import { maxScale } from '../../../types';
import { getPosition } from './getPosition';

import KonvaEventObject = Konva.KonvaEventObject;

export const handleZoom =
  (minScale: number, container: ViewBoxSizes, content: ViewBoxSizes) =>
  ({ evt, currentTarget }: KonvaEventObject<WheelEvent>) => {
    evt.preventDefault();
    const scaleBy = 1.04;

    const oldScale = currentTarget.scaleX();
    // @ts-ignore
    const pointer = currentTarget.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - currentTarget.x()) / oldScale,
      y: (pointer.y - currentTarget.y()) / oldScale,
    };

    const direction = evt.deltaY > 0 ? 1 : -1;
    const scale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    const scaleInLimitation = scale > maxScale ? maxScale : scale;
    const scaleOutLimitation = scale < minScale ? minScale : scale;
    const newScale = direction > 0 ? scaleInLimitation : scaleOutLimitation;

    currentTarget.scale({ x: newScale, y: newScale });
    currentTarget.position(onZoom(pointer, mousePointTo, container, content, newScale));
  };

function onZoom(pointer: Point, mousePointTo: Point, container: ViewBoxSizes, content: ViewBoxSizes, scale: number) {
  const x = pointer.x - mousePointTo.x * scale;
  const y = pointer.y - mousePointTo.y * scale;

  return getPosition(x, y, container, content, scale);
}
