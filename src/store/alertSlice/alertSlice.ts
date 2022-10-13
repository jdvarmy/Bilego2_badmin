import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';

type State = {
  severity?: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  text?: string;
};

const delay = 10000;

const initialState: State = {
  severity: undefined,
  title: undefined,
  text: undefined,
};

const alert = createSlice({
  initialState,
  name: 'alert',
  reducers: {
    setAlert: (_, action: PayloadAction<Required<State>>) => {
      return action.payload;
    },
    clearAlert: () => {
      return {};
    },
  },
});

export const { setAlert, clearAlert } = alert.actions;

export default alert.reducer;

export const setAlertAsync =
  (data: Required<State>): AppThunk =>
  async (dispatch) => {
    dispatch(setAlert(data));

    const timeout = setTimeout(() => {
      dispatch(clearAlert());
      clearTimeout(timeout);
    }, delay);
  };
