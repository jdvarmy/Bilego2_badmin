import React, { memo } from 'react';
import { MapFile } from '../../typings/types';
import { Layer, Group } from 'react-konva';
import DrawPath from './elements/DrawPath';
import DrawCircle from './elements/DrawCircle';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { deleteHoveredCircle } from '../../store/circleSlice/circleSlice';

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
