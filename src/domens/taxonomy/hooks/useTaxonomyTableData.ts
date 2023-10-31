import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { IDatasource } from 'ag-grid-community/dist/lib/interfaces/iDatasource';

import { cellDelete } from '../../../components/DataTable/cells/cellDelete';
import { filterModelParser } from '../../../components/DataTable/parser/filterModelParser';
import { RenderDelete } from '../../../components/DataTable/renderCell/RenderDelete';
import { TermType, TermTypeLink } from '../../../typings/enum';
import { isPagePostPropsResponseTypeGuard } from '../../../typings/types';
import cloneDeep from '../../../utils/helpers/cloneDeep';
import { translitSlug } from '../../../utils/helpers/translitSlug';
import { defaultCountPost } from '../../post/types';
import { useAppDispatch } from '../../../store/store';
import { RenderCheckbox } from '../components/TaxonomyTable/renderCell/RenderCheckbox';
import { RenderImage } from '../components/TaxonomyTable/renderCell/RenderImage';
import { nameMap } from '../helpers/nameMap';
import { deleteTaxonomyAsync, fetchTaxonomyAsync } from '../store/taxonomyThunk';
import { ITaxonomy } from '../types';

type Props = {
  type: TermType;
  link: TermTypeLink;
  columns: (keyof ITaxonomy)[];
};

export function useTaxonomyTableData({ columns, ...filter }: Props): {
  columnDefs: ColDef<ITaxonomy>[];
  onGridReady: (event: GridReadyEvent) => void;
} {
  const dispatch = useAppDispatch();
  const columnDefs = columnDefsCreator(columns);

  const dataSource: IDatasource = {
    getRows: ({ startRow, filterModel, successCallback }) => {
      dispatch(
        fetchTaxonomyAsync({
          count: defaultCountPost,
          offset: startRow,
          filter: Object.assign(filter, filterModelParser<ITaxonomy>(filterModel)),
        }),
      )
        .unwrap()
        .then((data) => {
          if (isPagePostPropsResponseTypeGuard<ITaxonomy>(data)) {
            successCallback(cloneDeep(data.items) as ITaxonomy[], data.props?.total ?? 0);
          }
        });
    },
  };

  const onGridReady = (params: GridReadyEvent) => {
    params.api.setDatasource(dataSource);
  };

  return { columnDefs, onGridReady };
}

function columnDefsCreator(columns: Props['columns']): ColDef<ITaxonomy>[] {
  const columnDefs = columns.map((name) => {
    const columns: ColDef<ITaxonomy> = {
      field: name,
      headerName: nameMap[name as keyof typeof nameMap] || name,
      editable: true,
      sortable: false,
      filter: false,
    };

    if (['name'].includes(name)) {
      columns.rowDrag = true;
    }
    if (['slug'].includes(name)) {
      columns.valueSetter = (params) => {
        params.data.slug = translitSlug(params.newValue);
        return true;
      };
    }
    if (name === 'description') {
      columns.flex = 1;
    }
    if (['icon', 'image'].includes(name)) {
      columns.width = 168;
      columns.editable = false;
      columns.cellRenderer = RenderImage(name as keyof Pick<ITaxonomy, 'icon' | 'image'>);
    }
    if (['showInMenu', 'showInMainPage'].includes(name)) {
      columns.width = 95;
      columns.cellRenderer = RenderCheckbox(name as keyof Pick<ITaxonomy, 'showInMainPage' | 'showInMenu'>);
    }

    return columns;
  });

  columnDefs.push(cellDelete({ cellRenderer: RenderDelete<ITaxonomy>(deleteTaxonomyAsync) }));

  return columnDefs;
}
