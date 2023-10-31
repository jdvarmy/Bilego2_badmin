import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { alertReducer } from '../domens/alert/store/alertSlice';
import { artistsReducer } from '../domens/artists/store/artistsSlice';
import { authReducer } from '../domens/auth/store/authSlice';
import { circleReducer } from '../domens/circle/store/circleSlice';
import { eventDatesReducer } from '../domens/eventDates/store/eventDatesSlice';
import { eventsReducer } from '../domens/events/store/eventsSlice';
import { itemsReducer } from '../domens/items/store/itemsSlice';
import { medialibraryReducer } from '../domens/medialibrary/store/medialibrarySlice';
import { sidebarReducer } from '../domens/sidebarSlice/store/sidebarSlice';
import { taxonomyReducer } from '../domens/taxonomy/store/taxonomySlice';
import { ticketsReducer } from '../domens/tickets/store/ticketsSlice';
import { usersReducer } from '../domens/users/store/usersSlice';

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

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
