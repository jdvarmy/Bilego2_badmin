import { select } from '../../../store/selectors';
import { RootState } from '../../../store/store';

export const selectAuthStore = (state: RootState) => select(state)?.auth;

export const selectAuthStatus = (state: RootState) => selectAuthStore(state).status;

export const selectAuthUser = (state: RootState) => selectAuthStore(state).user;

export const selectAuthIsAuthenticated = (state: RootState) => selectAuthStore(state).isAuthenticated;
