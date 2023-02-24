import { select } from '../../selectors';
import { RootState } from '../../store';

export const selectItemsStore = (state: RootState) => select(state)?.items;

export const selectItem = (state: RootState) => selectItemsStore(state).item;

export const selectItemState = (state: RootState) => selectItemsStore(state).itemState;

export const selectItems = (state: RootState) => selectItemsStore(state).items;
