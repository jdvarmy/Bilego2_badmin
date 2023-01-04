import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import sidebarSlice from './sidebarSlice/sidebarSlice';
import eventsSlice from './events/eventsSlice';
import itemsSlice from './itemsSlice/itemsSlice';
import artistsSlice from './artistsSlice/artistsSlice';
import ticketsSlice from './ticketsSlice/ticketsSlice';
import authSlice from './authSlice/authSlice';
import usersSlice from './usersSlice/usersSlice';
import medialibrarySlice from './medialibrarySlice/medialibrarySlice';
import alertSlice from './alertSlice/alertSlice';
import circleSlice from './circleSlice/circleSlice';
import taxonomySlice from './taxonomy/taxonomySlice';

const reducer = combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
  events: eventsSlice,
  items: itemsSlice,
  artists: artistsSlice,
  users: usersSlice,
  tickets: ticketsSlice,
  medialibrary: medialibrarySlice,
  alert: alertSlice,
  circle: circleSlice,
  taxonomy: taxonomySlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
