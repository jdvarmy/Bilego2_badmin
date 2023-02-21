import { Box, Card, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import { DrawCircleType, TicketOnSell } from '../../../../../typings/types';
import dateTimeFormatDefault from '../../../../../utils/helpers/dateTimeFormatDefault';
import { getActualSell } from '../../../../../utils/helpers/getActualSell';

type Props = {
  circle: DrawCircleType;
  setBox: Dispatch<SetStateAction<{ width: number; height: number }>>;
  sector?: { uid: string; name: string };
};

const style = { display: 'flex', flexDirection: 'column', p: 1 };
const bold = { fontWeight: 'bold' };
const mb = { mb: 0.5 };

const CircleTooltipContent = ({ sector, circle, setBox }: Props) => {
  const { multi, ticket } = circle;
  const ref = useRef<HTMLDivElement>(null);
  const actualSell = getActualSell(ticket?.sell || []);

  useEffect(() => {
    setBox({ width: ref.current?.clientWidth || 0, height: ref.current?.clientHeight || 0 });
  }, []);

  return (
    <Card ref={ref} sx={{ ...style, justifyContent: 'top' }}>
      <Typography variant='caption' component='div' sx={{ ...bold, ...mb }} align='center'>
        {sector?.name}
      </Typography>
      {!multi && (
        <Typography variant='body2' component='div' sx={mb} color='text.secondary' align='center'>
          {circle.row},{' '}
          <Typography variant='body2' component='span' color='text.primary' sx={bold}>
            место: {circle.seat}
          </Typography>
        </Typography>
      )}
      <GetActualSellFormat {...actualSell} stock={ticket?.stock || 0} multi={multi} />
      {ticket?.sell && (
        <Box sx={{ ...style, justifyContent: 'center' }}>
          <Typography variant='caption' component='div' color='text.primary' sx={bold}>
            Продажа билета:
          </Typography>
          {ticket?.sell.map((s) => (
            <GetSellFormat key={s.uid} {...s} />
          ))}
        </Box>
      )}
    </Card>
  );
};

export default CircleTooltipContent;

const formatter = new Intl.DateTimeFormat('ru', {
  ...dateTimeFormatDefault,
  month: 'short',
  hour: undefined,
  minute: undefined,
  timeZone: undefined,
  timeZoneName: undefined,
});
const formatterZone = new Intl.DateTimeFormat('ru', {
  timeZoneName: 'short',
  year: undefined,
  month: undefined,
  day: undefined,
  hour: '2-digit',
  minute: '2-digit',
});
const formatterPrice = new Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB' });
function GetActualSellFormat({
  dateTo,
  price,
  service,
  stock,
  multi,
}: Partial<TicketOnSell & { stock: number; multi: boolean }>) {
  if (!price) {
    return (
      <Card sx={{ ...style, justifyContent: 'center' }}>
        <Typography variant='caption' component='div' sx={bold} color='text.primary' align='center'>
          Место не продается
        </Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ ...style, justifyContent: 'center' }}>
      <Typography variant='caption' component='div' align='center'>
        <Typography variant='caption' component='span' color='text.primary'>
          цена:
        </Typography>{' '}
        <Typography variant='body2' component='span' color='text.primary'>
          {formatterPrice.format((price || 0) + (service || 0))}
        </Typography>{' '}
        {dateTo && (
          <>
            <Typography variant='caption' component='span' color='text.primary'>
              актуальна до
            </Typography>{' '}
            <Typography variant='body2' component='span' color='text.primary'>
              {formatter.format(Date.parse(dateTo as string))}
            </Typography>{' '}
          </>
        )}
        {multi && stock && (
          <Typography variant='caption' component='span' color='text.primary' sx={bold}>
            {stock} билетов
          </Typography>
        )}
      </Typography>
    </Card>
  );
}
function GetSellFormat({ dateFrom, dateTo, price, service }: TicketOnSell) {
  return (
    <>
      <Typography variant='caption' component='div'>
        {dateFrom && (
          <>
            <Typography variant='caption' component='span' color='text.primary'>
              с
            </Typography>{' '}
            <Typography variant='body2' component='span' color='text.primary'>
              {formatter.format(Date.parse(dateFrom as string))}
            </Typography>{' '}
            <Typography variant='caption' component='span' color='text.secondary'>
              {formatterZone.format(Date.parse(dateFrom as string)).toLocaleLowerCase()}
            </Typography>{' '}
          </>
        )}
        {dateTo && (
          <>
            <Typography variant='caption' component='span' color='text.primary'>
              по
            </Typography>{' '}
            <Typography variant='body2' component='span' color='text.primary'>
              {formatter.format(Date.parse(dateTo as string))}
            </Typography>{' '}
            <Typography variant='caption' component='span' color='text.secondary'>
              {formatterZone.format(Date.parse(dateTo as string)).toLocaleLowerCase()}
            </Typography>{' '}
          </>
        )}
      </Typography>
      <Typography variant='caption' component='div'>
        <Typography variant='caption' component='span' color='text.primary'>
          цена:
        </Typography>{' '}
        <Typography variant='body2' component='span' color='text.primary'>
          {formatterPrice.format((price || 0) + (service || 0))}
        </Typography>
        {', '}
        <Typography variant='caption' component='span' color='text.primary'>
          сервис
        </Typography>{' '}
        <Typography variant='body2' component='span' color='text.primary'>
          {formatterPrice.format(service || 0)}
        </Typography>
      </Typography>
    </>
  );
}
