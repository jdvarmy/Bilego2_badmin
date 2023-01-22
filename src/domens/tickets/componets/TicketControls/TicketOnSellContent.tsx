import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateTimePicker } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import ColorPicker from '../../../../components/ColorPicker/ColorPicker';
import { TicketOnSell } from '../../../../typings/types';
import dateTimeFormatDefault from '../../../../utils/helpers/dateTimeFormatDefault';
import { pickerProps } from '../../../events/components/EventDates/EventDatesTabContent';

const TicketOnSellContent = ({
  uid,
  price,
  service,
  dateFrom,
  dateTo,
  color,
  setData,
  isOpenAccordion = false,
  deleteDisable = false,
  onDeleteSell,
}: TicketOnSell & {
  setData: Dispatch<SetStateAction<TicketOnSell[]>>;
  isOpenAccordion?: boolean;
  deleteDisable?: boolean;
  onDeleteSell: (uid: string) => () => void;
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(isOpenAccordion);
  const title = getTitle({ price, service, dateFrom, dateTo });

  const handleChangeExpanded = (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };
  const handleChangeField = (field: keyof Omit<TicketOnSell, 'uid'>) => (value: Date | string | number | null) => {
    if (!uid) {
      return;
    }

    const localValue =
      Object.prototype.toString.call(value) === '[object Date]' ? new Date((value as Date).setSeconds(0, 0)) : value;

    setData((prev) => {
      return prev.map((i) => (i.uid === uid ? { ...i, [field]: localValue } : i));
    });
  };

  // todo: сделать проверку на ввод данных, пересечение дат в периодах и прочее

  return (
    <Accordion expanded={expanded} onChange={handleChangeExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container alignItems='center' spacing={2}>
          <Grid item xs={1}>
            <Tooltip arrow placement='top' title='Удалить выбранную дату'>
              <span>
                <IconButton disabled={deleteDisable} color='error' onClick={onDeleteSell(uid)}>
                  <DeleteForeverTwoToneIcon fontSize='small' />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs>
            <Typography variant='subtitle2'>{title}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container alignItems='center' spacing={2}>
          <Grid item xs>
            <DateTimePicker
              renderInput={(props: object) => <TextField size='small' focused={!!dateFrom} fullWidth {...props} />}
              label='Начало продаж'
              value={dateFrom || null}
              onChange={handleChangeField('dateFrom')}
              {...pickerProps}
            />
          </Grid>
          <Grid item xs>
            <DateTimePicker
              renderInput={(props: object) => <TextField size='small' focused={!!dateTo} fullWidth {...props} />}
              label='Окончание продаж'
              value={dateTo || null}
              onChange={handleChangeField('dateTo')}
              {...pickerProps}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label='Сервисный сбор'
              type='number'
              fullWidth
              size='small'
              focused={!!service}
              value={service || ''}
              onChange={(e) => {
                handleChangeField('service')(Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label='Цена'
              type='number'
              fullWidth
              size='small'
              focused={!!price}
              value={price || ''}
              onChange={(e) => {
                handleChangeField('price')(Number(e.target.value));
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <ColorPicker color={color} onChange={handleChangeField('color')} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default TicketOnSellContent;

const formatter = new Intl.DateTimeFormat('ru', dateTimeFormatDefault);

function getTitle({ price, service, dateFrom, dateTo }: Omit<TicketOnSell, 'uid' | 'color'>): string {
  let title = 'Продажа ';
  try {
    if (dateFrom) {
      title += `с ${formatter.format(Date.parse(dateFrom as string))} `;
    }
    if (dateTo) {
      title += `по ${formatter.format(Date.parse(dateTo as string))} `;
    }
    if (service && price) {
      title += `цена: ${Number(service) + Number(price)}₽ за билет `;
    } else if (!service && price) {
      title += `цена: ${price}₽ `;
    }
    if (service && !price) {
      title += `сервисный сбор: ${service}₽ `;
    }
  } catch (e) {
    console.log(e);
  }
  return title;
}
