import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';

import { alertReducer } from './alert/store/alertSlice';
import { artistsReducer } from './artists/store/artistsSlice';
import { authReducer } from './auth/store/authSlice';
import { circleReducer } from './circle/store/circleSlice';
import { eventDatesReducer } from './eventDates/store/eventDatesSlice';
import { eventsReducer } from './events/store/eventsSlice';
import { itemsReducer } from './itemsSlice/store/itemsSlice';
import medialibrarySlice from './medialibrarySlice/medialibrarySlice';
import sidebarSlice from './sidebarSlice/sidebarSlice';
import taxonomySlice from './taxonomy/store/taxonomySlice';
import { ticketsReducer } from './tickets/store/ticketsSlice';
import usersSlice from './users/usersSlice';

const reducer = combineReducers({
  sidebar: sidebarSlice,
  auth: authReducer,
  events: eventsReducer,
  eventDates: eventDatesReducer,
  items: itemsReducer,
  artists: artistsReducer,
  users: usersSlice,
  tickets: ticketsReducer,
  medialibrary: medialibrarySlice,
  alert: alertReducer,
  circle: circleReducer,
  taxonomy: taxonomySlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
/**
 * @deprecated
 */
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
