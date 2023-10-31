import { select } from '../../../store/selectors';
import { RootState } from '../../../store/store';

export const selectSidebarStore = (state: RootState) => select(state)?.sidebar;

export const selectSidebarShow = (state: RootState) => selectSidebarStore(state)?.isShow;
