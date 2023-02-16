import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

import { alertReducer } from './alert/store/alertSlice';
import artistsSlice from './artistsSlice/artistsSlice';
import authSlice from './authSlice/authSlice';
import circleSlice from './circleSlice/circleSlice';
import { eventDatesReducer } from './eventDates/store/eventDatesSlice';
import { eventsReducer } from './events/store/eventsSlice';
import itemsSlice from './itemsSlice/itemsSlice';
import medialibrarySlice from './medialibrarySlice/medialibrarySlice';
import sidebarSlice from './sidebarSlice/sidebarSlice';
import taxonomySlice from './taxonomy/store/taxonomySlice';
import { ticketsReducer } from './tickets/store/ticketsSlice';
import usersSlice from './users/usersSlice';

const reducer = combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
  events: eventsReducer,
  eventDates: eventDatesReducer,
  items: itemsSlice,
  artists: artistsSlice,
  users: usersSlice,
  tickets: ticketsReducer,
  medialibrary: medialibrarySlice,
  alert: alertReducer,
  circle: circleSlice,
  taxonomy: taxonomySlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
// todo: удалить, далее используется useAppDispatch
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
