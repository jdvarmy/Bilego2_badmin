import React from 'react';
import { Path } from 'react-konva';

import { PathElement } from '../../../../../typings/types';

const DrawPath = ({ d, fill, ...props }: PathElement) => {
  return <Path data={d} fill={fill === 'none' ? undefined : fill} {...props} />;
};

export default DrawPath;
