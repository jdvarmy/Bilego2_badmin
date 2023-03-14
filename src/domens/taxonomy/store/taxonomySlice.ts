import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { StatusLoading } from '../../../typings/enum';
import { ItemsPageProps } from '../../post/types/types';
import { ITaxonomy, taxonomyScope } from '../types/types';
import { fetchTaxonomyAsync } from './taxonomyThunk';

type State = {
  status: StatusLoading;
  taxonomy: ITaxonomy[] | undefined;
  pagination: ItemsPageProps | undefined;
};

const initialState: State = {
  status: StatusLoading.init,
  taxonomy: null,
  pagination: undefined,
};

const slice = createSlice({
  initialState,
  name: 'taxonomy',
  reducers: {
    setTaxonomy: (state, action: PayloadAction<ITaxonomy[] | null>) => {
      state.taxonomy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTaxonomyAsync.fulfilled, (state, action) => {
      // Не используется
      state.taxonomy = action.payload?.items ?? undefined;
      state.pagination = action.payload?.props ?? undefined;
    });

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
