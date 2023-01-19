import { Box } from '@mui/material';
import Konva from 'konva';
import React, { CSSProperties, createContext, memo, useCallback, useContext, useMemo, useRef } from 'react';
import { Stage } from 'react-konva';
import { Provider, ReactReduxContext, useSelector } from 'react-redux';

import { selectSelectedDateMap } from '../../domen/events/eventsSelectors';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { isEqual } from '../../utils/functions/isEqual';
import ActiveCanvas from './ActiveCanvas';
import Paths from './Paths';
import StaticCanvas from './StaticCanvas';
import { getScale, handleDrag, handleZoom, moveToCenter } from './helpers';

import KonvaEventObject = Konva.KonvaEventObject;
import Vector2d = Konva.Vector2d;
import StageType = Konva.Stage;

const defaultW = 1024;
const defaultH = 768;
// todo: убрать деление на 10, это только для огромных размеров 10240х7680 viewport
export const plusser = 10 as const;
const style: CSSProperties = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' };

const StageContext = createContext<StageType | null>(null);
export const useMapStage = () => useContext(StageContext);

const TicketMap = () => {
  console.log('RERENDER MAP');
  const ref = useRef<HTMLDivElement>(null);
  const refStage = useRef<StageType>(null);
  // todo: поменять на shallowEqual
  const map = useSelector(selectSelectedDateMap, isEqual);

  const rect = useResizeObserver(ref);

  const containerSizes = useMemo(() => ({ width: rect?.width || 0, height: (rect?.width || 0) * 0.67 }), [rect]);
  const contentSizes = useMemo(() => ({ width: map?.width || defaultW, height: map?.height || defaultH }), [map]);

  const fitScale = useMemo(() => getScale(containerSizes, contentSizes) / plusser, [containerSizes, contentSizes]);
  const position = useMemo(
    () => moveToCenter(getScale(containerSizes, contentSizes), containerSizes, contentSizes),
    [containerSizes, contentSizes],
  );

  const handleOnWheel = useCallback(
    (e: KonvaEventObject<WheelEvent>) => {
      handleZoom(fitScale, containerSizes, contentSizes)(e);
    },
    [fitScale, containerSizes, contentSizes],
  );
  const handleOnDrag = useCallback(
    (pos: Vector2d) => {
      return handleDrag(containerSizes, contentSizes, refStage.current?.scaleX() ?? fitScale)(pos);
    },
    [fitScale, containerSizes, contentSizes, refStage.current],
  );

  return (
    <Box ref={ref} sx={{ height: containerSizes.height, position: 'relative', background: 'white' }}>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            ref={refStage}
            x={position.x}
            y={position.y}
            scaleX={fitScale}
            scaleY={fitScale}
            width={containerSizes.width}
            height={containerSizes.height}
            style={style}
            onWheel={handleOnWheel}
            draggable
            dragBoundFunc={handleOnDrag}
          >
            <Provider store={store}>
              <StageContext.Provider value={refStage.current}>
                <StaticCanvas data={map} />
                <ActiveCanvas />
                {/*<Paths rect={rect} width={containerSizes.width} height={containerSizes.height} />*/}
              </StageContext.Provider>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </Box>
  );
};

export default memo(TicketMap);
