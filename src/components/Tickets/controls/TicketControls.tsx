import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { TicketType } from '../../../typings/enum';
import { Ticket, TicketOnSell } from '../../../typings/types';
import { v4 as uidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { selectCircleStore, selectTicketsStore } from '../../../domen/selectors';
import TicketControlsSaveTicketButton from './TicketControlsSaveTicketButton';
import TicketControlsTicketName from './TicketControlsTicketName';
import TicketControlTicketOnSell from './TicketControlTicketOnSell';
import TicketControlDeleteTicketMapButton from './TicketControlDeleteTicketButton';

type Props = {
  dateUid: string;
  type?: TicketType;
};

const TicketControls = ({ type, dateUid }: Props) => {
  const { selectedTicket } = useSelector(selectTicketsStore);
  const { selectedCircles } = useSelector(selectCircleStore);
  const [ticketData, setTicketData] = useState<Ticket>(initialTicketDataFc(type));
  const [sellData, setSellData] = useState<TicketOnSell[]>([initialTicketSellDataFc()]);

  const isEditTicket = useMemo(() => !!selectedTicket, [selectedTicket]);
  const disabledSaveButton = useMemo(() => {
    const isName = type === TicketType.simple ? ticketData.name : true;
    const isInStock = ticketData.stock && +ticketData.stock > 0;
    const isSell = Array.isArray(sellData) && sellData.length > 0 && sellData.every((i) => i.price && i.color);
    const isCircleSet = type === TicketType.map ? Array.isArray(selectedCircles) && !!selectedCircles.length : true;

    return isName && isInStock && isSell && isCircleSet;
  }, [ticketData, sellData, selectedCircles, type]);
  const disabledDeleteButton = useMemo(() => selectedCircles.some((circle) => circle.ticket), [selectedCircles]);
  const ticketsToDelete: string[] = useMemo(
    () => (selectedCircles?.filter((circle) => circle.ticket).map((circle) => circle.ticket?.uid) as string[]) || [],
    [selectedCircles],
  );

  const handleChange = (field: keyof Ticket) => (e: ChangeEvent<HTMLInputElement>) => {
    setTicketData((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const handleClearData = useCallback(() => {
    setTicketData(initialTicketDataFc(type));
    setSellData([initialTicketSellDataFc()]);
  }, [type]);

  useEffect(() => {
    if (selectedTicket) {
      setTicketData(selectedTicket);
      setSellData(selectedTicket.sell || [initialTicketSellDataFc()]);
    } else {
      setTicketData(initialTicketDataFc(type));
      setSellData([initialTicketSellDataFc()]);
    }
  }, [selectedTicket, type]);

  return (
    <Grid container alignItems='center' spacing={3}>
      <TicketControlsTicketName
        type={type}
        name={ticketData?.name}
        description={ticketData?.description}
        onChange={handleChange}
      />
      <Grid item xs={1}>
        <TextField
          fullWidth
          size='small'
          type='number'
          label='Количество'
          value={ticketData.stock}
          focused={!!ticketData.stock}
          onChange={handleChange('stock')}
        />
      </Grid>
      <Grid item xs={3} container direction='row' wrap='nowrap' justifyContent='flex-end' alignItems='center'>
        <TicketControlDeleteTicketMapButton
          show={type === TicketType.map}
          ticketsUid={ticketsToDelete}
          disabled={!disabledDeleteButton}
        />
        <TicketControlsSaveTicketButton
          isEdit={isEditTicket}
          dateUid={dateUid}
          ticketData={ticketData}
          sellData={sellData}
          disabled={!disabledSaveButton}
          clearFc={handleClearData}
        />
      </Grid>
      <Grid item xs={12}>
        <TicketControlTicketOnSell data={sellData} setData={setSellData} />
      </Grid>
    </Grid>
  );
};

export default TicketControls;

function initialTicketDataFc(type?: TicketType): Ticket {
  return {
    uid: uidv4(),
    type: type,
    name: undefined,
    description: undefined,
    stock: type === TicketType.map ? 1 : 0,
    seat: undefined,
    row: undefined,
    sector: undefined,
  };
}
export function initialTicketSellDataFc(): TicketOnSell {
  return {
    uid: uidv4(),
    price: 0,
    service: 0,
    dateFrom: undefined,
    dateTo: undefined,
    color: undefined,
  };
}
