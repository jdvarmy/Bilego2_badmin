import { ImageSizes } from '../types';

export const getImageSrc = (paths: string[] | undefined, size: ImageSizes) => {
  try {
    return `${paths && Array.isArray(paths) ? paths.find((path) => path.includes(size)) : paths}`;
  } catch (e) {
    console.log(e);
  }
};
