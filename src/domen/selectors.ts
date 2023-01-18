import { RootState } from './store';

export const select = (state: RootState) => state;

export const selectSidebar = (state: RootState) => select(state)?.sidebar;

export const selectAuth = (state: RootState) => select(state)?.auth;

export const selectUsers = (state: RootState) => select(state)?.users;

export const selectMedialibrary = (state: RootState) => select(state)?.medialibrary;

export const selectCircleStore = (state: RootState) => select(state)?.circle;
