import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Taxonomy } from '../../typings/types';
import { AppThunk } from '../store';
import { fetchTaxonomyRequest, saveTaxonomyRequest } from '../../api/requests';
import { TermType } from '../../typings/enum';

type State = {
  selected: Taxonomy | null;
  taxonomy: Taxonomy[] | null;
};

const initialState: State = {
  selected: null,
  taxonomy: null,
};

const taxonomy = createSlice({
  initialState,
  name: 'taxonomy',
  reducers: {
    setSelectedTaxonomy: (state, action: PayloadAction<Taxonomy | null>) => {
      state.selected = action.payload;
    },
    setTaxonomy: (state, action: PayloadAction<Taxonomy[] | null>) => {
      state.taxonomy = action.payload;
    },
  },
});

export const { setSelectedTaxonomy, setTaxonomy } = taxonomy.actions;

export default taxonomy.reducer;

export const getTaxonomyAsync =
  (type: TermType): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await fetchTaxonomyRequest(type);
      dispatch(setTaxonomy(data));
    } catch (e) {
      console.log(e);
    }
  };

export const saveTaxonomyAsync =
  (tax: Taxonomy): AppThunk =>
  async (dispatch) => {
    try {
      const clearTax = { ...tax, icon: typeof tax.icon === 'object' ? +tax.icon.id : undefined };

      const { data } = await saveTaxonomyRequest(clearTax);
      dispatch(setTaxonomy(data));
    } catch (e) {
      console.log(e);
    }
  };
