import { Taxonomy } from '../../../typings/types';
import { ColDef } from 'ag-grid-community';
import { nameMap } from './nameMap';
import { RenderImage } from '../elems/RenderImage';
import { RenderDeleteItem } from '../elems/RenderDeleteItem';
import { RenderCheckbox } from '../elems/RenderCheckbox';

export function createColumnDefs(columns: (keyof Taxonomy)[]) {
  const result = columns.map((name) => {
    const res: ColDef = {
      field: name,
      headerName: nameMap[name as keyof typeof nameMap] || name,
    };

    if (['name'].includes(name)) res.rowDrag = true;
    if (['id', 'link', 'type'].includes(name)) res.hide = true;
    if (name === 'description') res.flex = 1;
    if (['icon', 'image'].includes(name)) {
      res.editable = res.sortable = res.filter = false;
      res.width = 148;

      // Рендерим картинку в ячейке
      res.cellRenderer = RenderImage(name as keyof Pick<Taxonomy, 'icon' | 'image'>);
    }
    if (['showInMenu', 'showInMainPage'].includes(name)) {
      res.width = 95;
      res.editable = res.sortable = res.filter = false;

      // Рендерим чекбокс в ячейке
      res.cellRenderer = RenderCheckbox(name as keyof Pick<Taxonomy, 'showInMainPage' | 'showInMenu'>);
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
