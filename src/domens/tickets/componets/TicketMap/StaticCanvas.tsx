import React, { memo } from 'react';
import { Group, Layer } from 'react-konva';
import { useDispatch } from 'react-redux';

import { MapFile } from '../../../../typings/types';
import { deleteHoveredCircle } from '../../../circleSlice/circleSlice';
import { AppDispatch } from '../../../store';
import DrawCircle from './elements/DrawCircle';
import DrawPath from './elements/DrawPath';

type Props = {
  data?: MapFile;
};

const StaticCanvas = ({ data }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  if (!data) {
    return null;
  }

  return (
    <Layer>
      <Group onMouseEnter={() => dispatch(deleteHoveredCircle())}>
        {data.background?.map((tag, key) => {
          switch (tag.tagName) {
            case 'path':
              return <DrawPath key={key} {...tag.properties} />;
            case 'circle':
              return <DrawCircle key={key} {...tag.properties} />;
            case 'text':
          }
        })}
      </Group>
      <Group>
        {data.seats?.map((seat) => (
          <DrawCircle key={seat.uid} active {...seat} />
        ))}
      </Group>
    </Layer>
  );
};

StaticCanvas.displayName = 'StaticCanvas';

export default memo(StaticCanvas);
