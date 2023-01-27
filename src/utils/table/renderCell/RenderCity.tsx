import { ICellRendererParams } from 'ag-grid-community';

import { City } from '../../../typings/enum';

const cityMap: Record<City, string> = {
  [City.moscow]: 'Москва',
  [City.petersburg]: 'Петербург',
};

export const RenderCity = (props: ICellRendererParams) => {
  return props.data.city ? cityMap[props.data.city as City] : null;
};
