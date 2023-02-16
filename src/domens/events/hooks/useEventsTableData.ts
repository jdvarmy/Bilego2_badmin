import { ColDef } from 'ag-grid-community';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IEvent } from '../../../typings/types';
import cloneDeep from '../../../utils/helpers/cloneDeep';
import { useAppDispatch } from '../../store';
import { RenderDeleteItem } from '../components/EventsTable/RenderDeleteItem';
import { cellCity } from '../components/EventsTable/cell/cellCity';
import { cellDelete } from '../components/EventsTable/cell/cellDelete';
import { cellEventDates } from '../components/EventsTable/cell/cellEventDates';
import { cellEventManager } from '../components/EventsTable/cell/cellEventManager';
import { cellIsSlider } from '../components/EventsTable/cell/cellIsSlider';
import { cellStatus } from '../components/EventsTable/cell/cellStatus';
import { cellTitle } from '../components/EventsTable/cell/cellTitle';
import { selectEvents } from '../store/eventsSelectors';
import { fetchEventsAsync } from '../store/eventsThunk';

type EventColumns = Pick<
  IEvent,
  'title' | 'status' | 'eventDates' | 'city' | 'item' | 'isShowOnSlider' | 'eventManager' | 'concertManagerPercentage'
>;

const columns: Record<keyof EventColumns, string> = {
  title: 'Заголовок',
  status: 'Статус',
  eventDates: 'Даты',
  city: 'Город',
  item: 'Место',
  isShowOnSlider: 'Слайдер',
  eventManager: 'Менеджер',
  concertManagerPercentage: '%',
};

export function useEventsTableData(): { rowData: IEvent[]; columnDefs: ColDef<IEvent>[] } {
  const dispatch = useAppDispatch();
  const events = useSelector(selectEvents);

  const columnDefs: ColDef<IEvent>[] = Object.entries(columns).map(([column, name]) => {
    const columns: ColDef<IEvent> = {
      field: column,
      headerName: name,
      editable: false,
      filter: false,
      sortable: false,
    };

    if (['title'].includes(column)) {
      return cellTitle(columns);
    }
    if (['status'].includes(column)) {
      return cellStatus(columns);
    }
    if (['city'].includes(column)) {
      return cellCity(columns);
    }
    if (['eventDates'].includes(column)) {
      return cellEventDates(columns);
    }
    if (['isShowOnSlider'].includes(column)) {
      return cellIsSlider(columns);
    }
    if (['eventManager'].includes(column)) {
      return cellEventManager(columns);
    }
    if (['concertManagerPercentage'].includes(column)) {
      columns.width = 62;
    }

    return columns;
  });

  columnDefs.push(cellDelete({ cellRenderer: RenderDeleteItem }));

  const rowData = (cloneDeep(events) as IEvent[])?.map((event) => {
    return event;
  });

  useEffect(() => {
    dispatch(fetchEventsAsync());
  }, [dispatch]);

  return { rowData, columnDefs };
}
