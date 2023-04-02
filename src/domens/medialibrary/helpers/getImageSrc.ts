import { HTTP_URL } from '../../../typings/env';
import { ImageSizes } from '../types/types';

export const getImageSrc = (paths: string[] | undefined, size: ImageSizes) => {
  try {
    return `${paths && Array.isArray(paths) ? paths.find((path) => path.includes(size)) : paths}`;
  } catch (e) {
    console.log(e);
  }
};
