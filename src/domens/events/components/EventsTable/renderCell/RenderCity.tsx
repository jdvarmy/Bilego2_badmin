import { ICellRendererParams } from 'ag-grid-community';

import { City } from '../../../../../typings/enum';
import { cityMap } from '../../../../../utils/helpers/mappers/cityMap';

export const RenderCity = (props: ICellRendererParams) => {
  return props.data.city ? cityMap[props.data.city as City] : null;
};
