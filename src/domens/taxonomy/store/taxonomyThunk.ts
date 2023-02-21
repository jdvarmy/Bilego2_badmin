import { createAsyncThunk } from '@reduxjs/toolkit';
import { Key } from 'react';

import { TermType, TermTypeLink } from '../../../typings/enum';
import { Taxonomy } from '../../../typings/types';
import { addAlertErrorAsync } from '../../alert/store/alertThunk';
import { ServerErrorStatus } from '../../alert/types/types';
import {
  deleteTaxonomyRequest,
  fetchTaxonomyRequest,
  patchTaxonomyRequest,
  saveTaxonomyRequest,
} from '../api/taxonomyRequest';
import { taxonomyScope } from '../types/types';

export const getTaxonomyAsync = createAsyncThunk(
  `${taxonomyScope}/getTaxonomyAsync`,
  async ({ type }: { type: TermType }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchTaxonomyRequest(TermTypeLink.event, type);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);

export const saveTaxonomyAsync = createAsyncThunk(
  `${taxonomyScope}/saveTaxonomyAsync`,
  async (taxonomy: Taxonomy, { dispatch, rejectWithValue }) => {
    const clearTax = {
      ...taxonomy,
      icon: typeof taxonomy.icon === 'object' ? +taxonomy.icon.id : taxonomy.icon,
      image: typeof taxonomy.image === 'object' ? +taxonomy.image.id : taxonomy.image,
    };

    try {
      const { data } = await saveTaxonomyRequest(clearTax);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);

export const editTaxonomyAsync = createAsyncThunk(
  `${taxonomyScope}/editTaxonomyAsync`,
  async (taxonomy: Partial<Taxonomy>, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await patchTaxonomyRequest(taxonomy);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);

export const saveTaxonomyMediaAsync = createAsyncThunk(
  `${taxonomyScope}/saveTaxonomyMediaAsync`,
  async (taxonomy: Pick<Taxonomy, 'id' | 'image' | 'icon'>, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await patchTaxonomyRequest(taxonomy);

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);

export const deleteTaxonomyAsync = createAsyncThunk(``, async ({ id }: { id: Key }, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await deleteTaxonomyRequest(id);

    return data;
  } catch (error) {
    dispatch(addAlertErrorAsync(error as ServerErrorStatus));
    return rejectWithValue(error);
  }
});
