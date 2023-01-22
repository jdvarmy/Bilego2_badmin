import { ViewBoxSizes } from '../../types/types';

export function moveToCenter(scale: number, container: ViewBoxSizes, content: ViewBoxSizes): { x: number; y: number } {
  return {
    x: (container.width - scale * content.width) * 0.5,
    y: (container.height - scale * content.height) * 0.5,
  };
}
