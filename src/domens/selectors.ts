import { RootState } from './store';

export const select = (state: RootState) => state;

export const selectSidebar = (state: RootState) => select(state)?.sidebar;

export const selectUsers = (state: RootState) => select(state)?.users;
