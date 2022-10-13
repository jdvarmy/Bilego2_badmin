import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosBaseUrl, RequestAuth, ResponseAuth, storageTokenName, User } from '../../typings/types';
import { AppThunk } from '../store';
import axios from 'axios';
import { loginRequest, logoutRequest, registerRequest } from '../../api/requests';

type State = {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: State = {
  loading: false,
  isAuthenticated: false,
  user: null,
};

const auth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      const { user, accessToken } = action.payload;

      localStorage.setItem(storageTokenName, accessToken);

      return { ...state, isAuthenticated: true, user };
    },
    clearUser: (state) => {
      localStorage.removeItem(storageTokenName);

      return { ...state, isAuthenticated: false, user: null };
    },
  },
});

export const { setLoading, setUser, clearUser } = auth.actions;

export default auth.reducer;

export const register =
  (userLoginData: RequestAuth): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await registerRequest(userLoginData);

      dispatch(setUser(data));
    } catch (e) {
      console.log('register', e);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const login =
  (userLoginData: RequestAuth): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await loginRequest(userLoginData);

      dispatch(setUser(data));
    } catch (e) {
      console.log('login', e);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const logout = (): AppThunk => async (dispatch) => {
  try {
    await logoutRequest();

    dispatch(clearUser());
  } catch (e) {
    console.log('logout', e);
  }
};
export const checkIsUserLogin =
  (to: () => void): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get<ResponseAuth>(`${axiosBaseUrl}auth/refresh`, {
        withCredentials: true,
      });

      dispatch(setUser(data));
    } catch (e) {
      dispatch(clearUser);
      to();
    } finally {
      dispatch(setLoading(false));
    }
  };
