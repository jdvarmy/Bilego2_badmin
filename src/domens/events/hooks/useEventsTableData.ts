import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { IDatasource } from 'ag-grid-community/dist/lib/interfaces/iDatasource';

import { cellCity } from '../../../components/DataTable/cells/cellCity';
import { cellDelete } from '../../../components/DataTable/cells/cellDelete';
import { cellStatus } from '../../../components/DataTable/cells/cellStatus';
import { cellTitle } from '../../../components/DataTable/cells/cellTitle';
import { filterModelParser } from '../../../components/DataTable/parser/filterModelParser';
import { RenderDelete } from '../../../components/DataTable/renderCell/RenderDelete';
import { isPagePostPropsResponseTypeGuard } from '../../../typings/types';
import { defaultCountPost } from '../../post/types';
import { useAppDispatch } from '../../../store/store';
import { cellEventDates } from '../components/EventsTable/cell/cellEventDates';
import { cellEventManager } from '../components/EventsTable/cell/cellEventManager';
import { cellIsSlider } from '../components/EventsTable/cell/cellIsSlider';
import { cellItem } from '../components/EventsTable/cell/cellItem';
import { deleteEventAsync, fetchEventsAsync } from '../store/eventsThunk';
import { IEvent, eventsScope } from '../types';

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
  eventManager: 'Организатор',
  concertManagerPercentage: '%',
};

export function useEventsTableData(): { columnDefs: ColDef<IEvent>[]; onGridReady: (event: GridReadyEvent) => void } {
  const dispatch = useAppDispatch();
  const columnDefs = columnDefsCreator();

  const dataSource: IDatasource = {
    getRows: ({ startRow, filterModel, successCallback }) => {
      dispatch(
        fetchEventsAsync({
          count: defaultCountPost,
          offset: startRow,
          filter: filterModelParser(filterModel),
        }),
      )
        .unwrap()
        .then((data) => {
          if (isPagePostPropsResponseTypeGuard<IEvent>(data)) {
            successCallback(data.items, data.props?.total ?? 0);
          }
        });
    },
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setDatasource(dataSource);
  };

  return { columnDefs, onGridReady };
}

function columnDefsCreator(): ColDef<IEvent>[] {
  const columnDefs: ColDef<IEvent>[] = Object.entries(columns).map(([column, name]) => {
    const columns: ColDef<IEvent> = {
      field: column,
      headerName: name,
      editable: false,
      sortable: false,
    };

    if (['title'].includes(column)) {
      return cellTitle(eventsScope, columns);
    }
    if (['status'].includes(column)) {
      return cellStatus(columns);
    }
    if (['city'].includes(column)) {
      return cellCity(columns);
    }
    if (['item'].includes(column)) {
      return cellItem(columns);
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
      columns.filter = false;
      columns.width = 62;
    }

    return columns;
  });

  columnDefs.push(cellDelete({ cellRenderer: RenderDelete<IEvent>(deleteEventAsync) }));

  return columnDefs;
}
