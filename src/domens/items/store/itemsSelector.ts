import { select } from '../../../store/selectors';
import { RootState } from '../../../store/store';

export const selectItemsStore = (state: RootState) => select(state)?.items;

export const selectItem = (state: RootState) => selectItemsStore(state).item;

export const selectItemState = (state: RootState) => selectItemsStore(state).itemState;

export const selectItems = (state: RootState) => selectItemsStore(state).items;

export const selectItemStateImageData = (state: RootState) => {
  const { image, title } = selectItemState(state);

  return { image, title };
};
