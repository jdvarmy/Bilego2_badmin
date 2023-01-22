import groupBy from 'lodash.groupby';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import TableGrid from '../../../../components/TableGrid/TableGrid';
import { FactoryCols } from '../../helpers/components/FactoryCols';
import { factoryRows } from '../../helpers/functions/factoryRows';
import { selectTicketsStore } from '../../store/ticketsSelectors';

const TicketSimple = () => {
  const { tickets } = useSelector(selectTicketsStore);
  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(() => new Set<unknown>(new Set()));

  const cols = useMemo(FactoryCols, []);
  const rows = useMemo(() => (!tickets ? [] : factoryRows(tickets)), [tickets]);
  const rowGrouper = (rows: any, _columnKey: string): Record<string, any> => groupBy(rows, 'uid');

  return (
    <TableGrid
      // @ts-ignore
      columns={cols}
      rows={rows}
      groupBy={['name']}
      rowGrouper={rowGrouper}
      expandedGroupIds={expandedGroupIds}
      onExpandedGroupIdsChange={setExpandedGroupIds}
    />
  );
};

export default TicketSimple;
