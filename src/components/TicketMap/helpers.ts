import { Point, ViewBoxSizes } from '../../typings/types';
import Konva from 'konva';
import KonvaEventObject = Konva.KonvaEventObject;
import { plusser } from './TicketMap';
import Vector2d = Konva.Vector2d;

// todo: нужно рассчитывать максимальное приближение исходя из размеров карты
export const maxScale = 0.85 as const;

export type Scale = {
  x: null | number;
  y: null | number;
};

export const getScale = (container: ViewBoxSizes, content: ViewBoxSizes) => {
  return container.width / content.width < container.height / content.height
    ? container.width / content.width
    : container.height / content.height;
};

export const getPosition = (
  _x: number,
  _y: number,
  container: ViewBoxSizes,
  content: ViewBoxSizes,
  scale: number,
): Point => {
  let x = _x;
  let y = _y;

  const contentW = content.width * scale * plusser;
  const contentH = content.height * scale * plusser;

  const left = -x / scale;
  const right = -x + container.width;
  const top = -y / scale;
  const bottom = -y + container.height;

  if (contentW <= container.width) {
    x = (container.width - contentW) * 0.5;
  } else if (contentW > container.width) {
    if (left < 0) {
      x = 0;
    }
    if (right > contentW) {
      x = -contentW + container.width;
    }
  }
  if (contentH <= container.height) {
    y = (container.height - contentH) * 0.5;
  } else if (contentH > container.height) {
    if (top < 0) {
      y = 0;
    }
    if (bottom > contentH) {
      y = -contentH + container.height;
    }
  }

  return { x, y };
};

export const moveToCenter = (
  scale: number,
  container: ViewBoxSizes,
  content: ViewBoxSizes,
): { x: number; y: number } => ({
  x: (container.width - scale * content.width) * 0.5,
  y: (container.height - scale * content.height) * 0.5,
});

const onZoom = (pointer: Point, mousePointTo: Point, container: ViewBoxSizes, content: ViewBoxSizes, scale: number) => {
  const x = pointer.x - mousePointTo.x * scale;
  const y = pointer.y - mousePointTo.y * scale;

  return getPosition(x, y, container, content, scale);
};

export const handleZoom =
  (minScale: number, container: ViewBoxSizes, content: ViewBoxSizes) =>
  ({ evt, currentTarget }: KonvaEventObject<WheelEvent>) => {
    evt.preventDefault();
    const scaleBy = 1.02;

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

export const handleDrag = (container: ViewBoxSizes, content: ViewBoxSizes, scale: number) => (pos: Vector2d) => {
  return getPosition(pos.x, pos.y, container, content, scale);
};
