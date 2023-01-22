import { ViewBoxSizes } from '../../types/types';

export function getScale(container: ViewBoxSizes, content: ViewBoxSizes) {
  return container.width / content.width < container.height / content.height
    ? container.width / content.width
    : container.height / content.height;
}
