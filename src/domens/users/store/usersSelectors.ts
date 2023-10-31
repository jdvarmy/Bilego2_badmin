import { select } from '../../../store/selectors';
import { RootState } from '../../../store/store';

export const selectUsersStore = (state: RootState) => select(state)?.users;

export const selectUsers = (state: RootState) => selectUsersStore(state)?.users;
