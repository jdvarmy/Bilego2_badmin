import { select } from '../../selectors';
import { RootState } from '../../store';

export const selectUsersStore = (state: RootState) => select(state)?.users;

export const selectUsers = (state: RootState) => selectUsersStore(state)?.users;
