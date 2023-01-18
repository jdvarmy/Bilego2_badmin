import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../../typings/types';

type State = {
  users: User[] | null;
};

const initialState: State = {
  users: null,
};

const users = createSlice({
  initialState,
  name: 'users',
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = users.actions;

export default users.reducer;
