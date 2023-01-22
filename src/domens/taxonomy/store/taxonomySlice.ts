import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Taxonomy } from '../../../typings/types';

type State = {
  taxonomy: Taxonomy[] | null;
};

const initialState: State = {
  taxonomy: null,
};

const taxonomy = createSlice({
  initialState,
  name: 'taxonomy',
  reducers: {
    setTaxonomy: (state, action: PayloadAction<Taxonomy[] | null>) => {
      state.taxonomy = action.payload;
    },
  },
});

export const { setTaxonomy } = taxonomy.actions;

export default taxonomy.reducer;
