import { createAsyncThunk } from '@reduxjs/toolkit';

import { IItem, ItemRequest, itemsScope } from '../types';
import { itemsActions } from './itemsSlice';

export const workerItemClear = createAsyncThunk(`${itemsScope}/workerItemClear`, (_, { dispatch }) => {
  dispatch(itemsActions.setItem(null));
  dispatch(itemsActions.setItemState(null));
});

export function workerPrepareData(item: IItem): ItemRequest {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { create, update, taxonomy, image, headerImage, ...other } = item;

  const filteredTaxonomy = taxonomy?.map((tax) => tax.uid);
  const filteredImage = !Number.isNaN(+image?.id) ? +image?.id : undefined;
  const filteredHeaderImage = !Number.isNaN(+headerImage?.id) ? +headerImage?.id : undefined;

  return {
    ...other,
    taxonomy: filteredTaxonomy,
    image: filteredImage,
    headerImage: filteredHeaderImage,
  };
}
