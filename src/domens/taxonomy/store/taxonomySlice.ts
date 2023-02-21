import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { Taxonomy } from '../../../typings/types';
import { taxonomyScope } from '../types/types';
import { deleteTaxonomyAsync, getTaxonomyAsync, saveTaxonomyAsync, saveTaxonomyMediaAsync } from './taxonomyThunk';

type State = {
  status: StatusLoading;
  taxonomy: Taxonomy[] | null;
};

const initialState: State = {
  status: StatusLoading.init,
  taxonomy: null,
};

const slice = createSlice({
  initialState,
  name: 'taxonomy',
  reducers: {
    setTaxonomy: (state, action: PayloadAction<Taxonomy[] | null>) => {
      state.taxonomy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveTaxonomyMediaAsync.fulfilled, (state, action) => {
      // todo: переписать?!
      const changeTaxIndex = state.taxonomy.findIndex((tax) => tax.id === action.payload?.id);

      if (changeTaxIndex !== -1) {
        state.taxonomy.splice(changeTaxIndex, 1, action.payload);
      }
    });
    builder.addCase(deleteTaxonomyAsync.fulfilled, (state, action) => {
      // todo: переписать?!
      const changeTaxIndex = state.taxonomy.findIndex((tax) => tax.id === action.payload?.id);

      if (changeTaxIndex !== -1) {
        state.taxonomy.splice(changeTaxIndex, 1);
      }
    });

    builder.addMatcher(
      ({ type }) => [getTaxonomyAsync.fulfilled.type, saveTaxonomyAsync.fulfilled.type].includes(type),
      (state, action: PayloadAction<Taxonomy[]>) => {
        state.taxonomy = action.payload;
      },
    );

    builder.addMatcher(
      ({ type }) => type.startsWith(taxonomyScope) && type.endsWith('/pending'),
      (state) => {
        state.status = StatusLoading.loading;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(taxonomyScope) && type.endsWith('/fulfilled'),
      (state) => {
        state.status = StatusLoading.success;
      },
    );
    builder.addMatcher(
      ({ type }) => type.startsWith(taxonomyScope) && type.endsWith('/rejected'),
      (state) => {
        state.status = StatusLoading.error;
      },
    );
  },
});

export const { actions: taxonomyActions, reducer: taxonomyReducer } = slice;
