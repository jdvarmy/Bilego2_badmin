import { Taxonomy } from '../../../typings/types';
import { ColDef } from 'ag-grid-community';
import { nameMap } from './nameMap';
import { RenderImage } from './RenderImage';
import { RenderDeleteItem } from './RenderDeleteItem';

export function createColumnDefs(columns: (keyof Taxonomy)[]) {
  const result = columns.map((name) => {
    const res: ColDef = {
      field: name,
      headerName: nameMap[name as keyof typeof nameMap] || name,
    };

    if (['id', 'link'].includes(name)) res.hide = true;
    if (name === 'description') res.flex = 1;
    if (['icon', 'image'].includes(name)) {
      res.editable = res.sortable = res.filter = false;
      res.width = 148;

      // Рендерим картинку в ячейке
      res.cellRenderer = RenderImage(name as keyof Pick<Taxonomy, 'icon' | 'image'>);
    }

    return res;
  });

  result.push({
    cellRenderer: RenderDeleteItem,
    width: 95,
    headerName: 'Удалить',
    sortable: false,
    editable: false,
    field: 'delete',
    filter: false,
  });
  return result;
}
