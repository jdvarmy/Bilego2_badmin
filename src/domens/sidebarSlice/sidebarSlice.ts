import { createSlice } from '@reduxjs/toolkit';

type State = {
  isShow: boolean;
};

const initialState: State = {
  isShow: false,
};

const sidebar = createSlice({
  initialState,
  name: 'sidebar',
  reducers: {
    toggleSidebar: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export const { toggleSidebar } = sidebar.actions;

export default sidebar.reducer;
