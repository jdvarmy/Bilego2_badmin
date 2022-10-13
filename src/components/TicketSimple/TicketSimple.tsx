import React, { useMemo, useState } from 'react';
import TableGrid from '../TableGrid/TableGrid';
import { useSelector } from 'react-redux';
import { selectTicketsStore } from '../../store/selectors';
import { factoryCols, factoryRows } from './helpers';
import groupBy from 'lodash.groupby';

const TicketSimple = () => {
  const { tickets } = useSelector(selectTicketsStore);
  const [expandedGroupIds, setExpandedGroupIds] = useState<ReadonlySet<unknown>>(() => new Set<unknown>(new Set()));

  const cols = useMemo(factoryCols, []);
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
