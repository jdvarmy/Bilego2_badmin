import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { Card, CardContent, CardHeader, Divider, IconButton, Tooltip } from '@mui/material';
import React, { memo, useCallback } from 'react';

import { TicketOnSell } from '../../../../typings/types';
import { initialTicketSellDataFc } from './TicketControls';
import TicketOnSellContent from './TicketOnSellContent';

type Props = {
  data: TicketOnSell[];
  setData: React.Dispatch<React.SetStateAction<TicketOnSell[]>>;
};

const TicketControlTicketOnSell = ({ data, setData }: Props) => {
  const handleAddTicketOnSell = useCallback(() => {
    setData((prev) => [...prev, initialTicketSellDataFc()]);
  }, []);
  const handleDeleteTicketOnSell = (uid: string) => () => {
    if (!uid) {
      return;
    }

    setData((prev) => {
      if (prev && prev.length > 1) {
        return prev.filter((s) => s.uid !== uid);
      }
      return prev;
    });
  };

  return (
    <Card>
      <CardHeader
        title={
          <div>
            <Tooltip arrow placement='top' title='Добавить новую дату продаж билета'>
              <IconButton color='success' onClick={handleAddTicketOnSell}>
                <AddCircleTwoToneIcon />
              </IconButton>
            </Tooltip>{' '}
            Продажа билета
          </div>
        }
      />
      <Divider />
      <CardContent>
        {data?.map((sell, _, array) => (
          <TicketOnSellContent
            key={sell.uid}
            {...sell}
            setData={setData}
            isOpenAccordion={array.at(-1)?.uid === sell.uid}
            deleteDisable={array.length < 2}
            onDeleteSell={handleDeleteTicketOnSell}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default memo(TicketControlTicketOnSell);
