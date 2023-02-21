import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { alertReducer } from './alert/store/alertSlice';
import { artistsReducer } from './artists/store/artistsSlice';
import { authReducer } from './auth/store/authSlice';
import { circleReducer } from './circle/store/circleSlice';
import { eventDatesReducer } from './eventDates/store/eventDatesSlice';
import { eventsReducer } from './events/store/eventsSlice';
import { itemsReducer } from './items/store/itemsSlice';
import { medialibraryReducer } from './medialibrary/store/medialibrarySlice';
import { sidebarReducer } from './sidebarSlice/store/sidebarSlice';
import { taxonomyReducer } from './taxonomy/store/taxonomySlice';
import { ticketsReducer } from './tickets/store/ticketsSlice';
import { usersReducer } from './users/store/usersSlice';

const reducer = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  events: eventsReducer,
  eventDates: eventDatesReducer,
  items: itemsReducer,
  artists: artistsReducer,
  users: usersReducer,
  tickets: ticketsReducer,
  medialibrary: medialibraryReducer,
  alert: alertReducer,
  circle: circleReducer,
  taxonomy: taxonomyReducer,
});

const store = configureStore({ reducer });

export default store;

export type RootState = ReturnType<typeof store.getState>;
/**
 * @deprecated
 */
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
