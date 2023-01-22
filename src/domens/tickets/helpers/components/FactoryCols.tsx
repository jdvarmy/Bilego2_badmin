import { Box, Typography } from '@mui/material';
import React from 'react';

import { getActualSell } from '../../../../utils/helpers/getActualSell';
import { localDate } from '../functions/localDate';
import { LocalActions } from './LocalActions';
import { LocalColor } from './LocalColor';
import { LocalPrice } from './LocalPrice';
import { LocalTitle } from './LocalTitle';

export function FactoryCols() {
  return [
    {
      key: 'name',
      name: <Box>Название</Box>,
      resizable: true,
      minWidth: 255,
      maxWidth: 315,
      SelectCellFormatter: { isCellSelected: false },
      formatter: ({ row }: any) => LocalTitle(row),
      groupFormatter: ({ childRows }: any) => LocalTitle(childRows[0]),
    },
    {
      key: 'stock',
      name: <Box>Кол-во</Box>,
      width: 85,
      formatter: (): any => null,
      groupFormatter: ({ childRows }: any) => <Typography variant='h5'>{childRows[0]?.stock}</Typography>,
    },
    {
      key: 'dateFrom',
      name: <Box>Начало</Box>,
      formatter: ({ row }: any) => localDate(row?.dateFrom),
      groupFormatter: ({ childRows }: any) => (
        <Typography variant='h5'>{localDate(getActualSell(childRows)?.dateFrom)}</Typography>
      ),
    },
    {
      key: 'dateTo',
      name: <Box>Конец</Box>,
      formatter: ({ row }: any) => localDate(row?.dateTo),
      groupFormatter: ({ childRows }: any) => (
        <Typography variant='h5'>{localDate(getActualSell(childRows)?.dateTo)}</Typography>
      ),
    },
    {
      key: 'totalPrice',
      name: <Box>Цена</Box>,
      formatter: ({ row }: any) => LocalPrice(row?.totalPrice),
      groupFormatter: ({ childRows }: any) => (
        <Typography variant='h5'>{LocalPrice(getActualSell(childRows)?.totalPrice)}</Typography>
      ),
    },
    {
      key: 'color',
      name: <Box>Цвет</Box>,
      width: 85,
      formatter: ({ row }: any) => LocalColor(row?.color),
      groupFormatter: ({ childRows }: any) => LocalColor(getActualSell(childRows)?.color),
    },
    {
      key: 'actions',
      name: <Box sx={{ textAlign: 'right' }} />,
      width: 100,
      formatter: (): any => null,
      groupFormatter: ({ childRows }: any) => LocalActions(childRows[0]?.actions),
    },
  ];
}
