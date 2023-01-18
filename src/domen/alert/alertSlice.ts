import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AlertState = {
  uid: string;
  date: string;
  delay: number;
  severity: 'success' | 'info' | 'warning' | 'error';
  title: string;
  text?: string;
};

const initialState: { show: boolean; message: AlertState; archive: AlertState[] } = {
  show: false,
  message: null,
  archive: [],
};

const alert = createSlice({
  initialState,
  name: 'alert',
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => {
      state.show = true;
      state.message = action.payload;
    },
    clearAlert: (state, action: PayloadAction<AlertState>) => {
      state.show = false;
      addAlertToArchive(action.payload);
    },
    addAlertToArchive: (state, action: PayloadAction<AlertState>) => {
      state.archive.push(action.payload);
    },
  },
});

export const { setAlert, addAlertToArchive, clearAlert } = alert.actions;

export default alert.reducer;
