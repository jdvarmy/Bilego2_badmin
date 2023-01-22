import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import alertSlice from './alert/alertSlice';
import artistsSlice from './artistsSlice/artistsSlice';
import authSlice from './authSlice/authSlice';
import circleSlice from './circleSlice/circleSlice';
import eventsSlice from './events/store/eventsSlice';
import itemsSlice from './itemsSlice/itemsSlice';
import medialibrarySlice from './medialibrarySlice/medialibrarySlice';
import sidebarSlice from './sidebarSlice/sidebarSlice';
import taxonomySlice from './taxonomy/store/taxonomySlice';
import ticketsSlice from './tickets/store/ticketsSlice';
import usersSlice from './users/usersSlice';

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
