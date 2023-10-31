import { Point, ViewBoxSizes } from '../../../types';
import { plusser } from '../TicketMap';

export function getPosition(
  _x: number,
  _y: number,
  container: ViewBoxSizes,
  content: ViewBoxSizes,
  scale: number,
): Point {
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
}
