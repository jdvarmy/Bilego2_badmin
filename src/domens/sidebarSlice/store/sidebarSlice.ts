import { createSlice } from '@reduxjs/toolkit';

type State = {
  isShow: boolean;
};

const initialState: State = {
  isShow: false,
};

const slice = createSlice({
  initialState,
  name: 'sidebar',
  reducers: {
    toggleSidebar: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export const { actions: sidebarActions, reducer: sidebarReducer } = slice;
