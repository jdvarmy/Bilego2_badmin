import React from 'react';
import { Group, Layer } from 'react-konva';

import { MapFile } from '../../../../typings/types';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { circleActions } from '../../../circle/store/circleSlice';
import DrawCircle from './components/DrawCircle';
import DrawPath from './components/DrawPath';

type Props = {
  data?: MapFile;
};

const StaticCanvas = ({ data }: Props) => {
  const actions = useActionCreators(circleActions);

  const enterHandler = () => actions.deleteHoveredCircle();

  if (!data) {
    return null;
  }

  return (
    <Layer>
      <Group onMouseEnter={enterHandler}>
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

export default StaticCanvas;
