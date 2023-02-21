import { select } from '../../selectors';
import { RootState } from '../../store';

export const selectSidebarStore = (state: RootState) => select(state)?.sidebar;

export const selectSidebarShow = (state: RootState) => selectSidebarStore(state)?.isShow;
