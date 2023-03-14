import { createAsyncThunk } from '@reduxjs/toolkit';

import { workerAddError } from '../../alert/store/workers';
import { PagePostProps } from '../../post/types/types';
import {
  deleteTaxonomyRequest,
  fetchTaxonomyRequest,
  putTaxonomyRequest,
  saveTaxonomyRequest,
} from '../api/taxonomyRequest';
import { ITaxonomy, taxonomyScope } from '../types/types';

export const fetchTaxonomyAsync = createAsyncThunk(
  `${taxonomyScope}/getTaxonomyAsync`,
  async (pageProps: PagePostProps<ITaxonomy>, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchTaxonomyRequest(pageProps);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const saveTaxonomyAsync = createAsyncThunk(
  `${taxonomyScope}/saveTaxonomyAsync`,
  async (taxonomy: ITaxonomy, { dispatch, rejectWithValue }) => {
    const clearTax = {
      ...taxonomy,
      icon: typeof taxonomy.icon === 'object' ? +taxonomy.icon.id : taxonomy.icon,
      image: typeof taxonomy.image === 'object' ? +taxonomy.image.id : taxonomy.image,
    };

    try {
      const { data } = await saveTaxonomyRequest(clearTax);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const editTaxonomyAsync = createAsyncThunk(
  `${taxonomyScope}/editTaxonomyAsync`,
  async (taxonomy: Partial<ITaxonomy>, { dispatch, rejectWithValue }) => {
    const clearTax = {
      ...taxonomy,
      icon: typeof taxonomy.icon === 'object' ? +taxonomy.icon.id : taxonomy.icon,
      image: typeof taxonomy.image === 'object' ? +taxonomy.image.id : taxonomy.image,
    } as ITaxonomy;

    try {
      const { data } = await putTaxonomyRequest(clearTax);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const deleteTaxonomyAsync = createAsyncThunk(
  `${taxonomyScope}/deleteTaxonomyAsync`,
  async ({ uid }: { uid: string; pageProps?: PagePostProps<ITaxonomy> }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await deleteTaxonomyRequest(uid);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);
