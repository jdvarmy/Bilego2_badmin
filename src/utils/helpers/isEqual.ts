import deepEqual from 'fast-deep-equal';

export const isEqual = (data1: unknown, data2: unknown) => {
  try {
    return deepEqual(data1, data2);
  } catch (error) {
    return false;
  }
};
