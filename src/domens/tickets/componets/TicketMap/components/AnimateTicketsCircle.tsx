import Konva from 'konva';
import React, { memo, useCallback } from 'react';
import { Circle, Group } from 'react-konva';
import { useSelector } from 'react-redux';

import { TicketType } from '../../../../../typings/enum';
import { DrawCircleType } from '../../../../../typings/types';
import { getActualSell } from '../../../../../utils/helpers/getActualSell';
import { deleteHoveredCircle, setHoveredCircle } from '../../../../circleSlice/circleSlice';
import { useAppDispatch } from '../../../../store';
import { selectTicketsCircleSelector } from '../../../store/ticketsSelectors';

import KonvaEventObject = Konva.KonvaEventObject;

const multiplier = 1.19 as const;

const AnimateTicketsCircle = () => {
  const dispatch = useAppDispatch();
  const tickets = useSelector(selectTicketsCircleSelector);

  const handleMouseEnter = useCallback((circle: DrawCircleType) => dispatch(setHoveredCircle(circle)), [dispatch]);
  const handleMouse = useCallback(
    (type: 'enter' | 'leave', circle?: DrawCircleType) => (evt: KonvaEventObject<MouseEvent>) => {
      const container = evt?.target?.getStage()?.container();

      if (container) {
        switch (type) {
          case 'enter':
            if (circle) {
              handleMouseEnter(circle);
            }
            container.style.cursor = 'pointer';
            break;
          case 'leave':
          default:
            dispatch(deleteHoveredCircle());
            container.style.cursor = 'default';
        }
      }
    },
    [dispatch],
  );

  return (
    <Group>
      {tickets?.map((ticket) => {
        if (ticket.type !== TicketType.map) {
          return null;
        }

        const { circle: _circle, sell: _sell, ..._ticket } = ticket;
        const sell = getActualSell(_sell || []);

        const circle: DrawCircleType = {
          uid: _circle.uid,
          x: _circle.cx,
          y: _circle.cy,
          r: _circle.r,
          seat: _circle.name as string,
          row: _circle.rowName as string,
          sector: _circle.sector as string,
          multi: !!_circle.multi || false,
          ticket: { ..._ticket, sell: _sell },
        };

        return (
          <Circle
            key={ticket.uid}
            radius={circle.r * multiplier}
            x={circle.x}
            y={circle.y}
            fill={sell?.color}
            onMouseEnter={handleMouse('enter', circle)}
          />
        );
      })}
    </Group>
  );
};

export default memo(AnimateTicketsCircle);
