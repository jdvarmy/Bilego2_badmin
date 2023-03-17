import { HTTP_URL } from '../../../typings/env';
import { ImageSizes } from '../types/types';

export const getImageSrc = (paths: string[] | undefined, size: ImageSizes) => {
  return `${HTTP_URL}${paths?.find((path) => path.includes(size))}`;
};
