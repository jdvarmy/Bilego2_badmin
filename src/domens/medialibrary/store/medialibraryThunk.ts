import { createAsyncThunk } from '@reduxjs/toolkit';

import { MediaFile } from '../../../typings/types';
import { workerAddError } from '../../alert/store/workers';
import { PagePostProps, defaultCountPost } from '../../post/types/types';
import {
  fetchMapItemsRequest,
  fetchMedialibraryRequest,
  removeFileMedialibraryRequest,
  uploadFileMapItemsRequest,
  uploadFileMedialibraryRequest,
} from '../api/medialibraryRequest';
import { MapContent } from '../components/AddMapModal/AppMapModal';
import { medialibraryScope } from '../types/types';

export const fetchMediaFilesAsync = createAsyncThunk(
  `${medialibraryScope}/fetchMediaFilesAsync`,
  async (pageProps: PagePostProps<MediaFile> | undefined, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchMedialibraryRequest(pageProps);

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const getMapListAsync = createAsyncThunk(
  `${medialibraryScope}/getMapListAsync`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchMapItemsRequest();

      return data;
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const uploadFileAsync = createAsyncThunk(
  `${medialibraryScope}/uploadFileAsync`,
  async ({ files }: { files: FileList }, { dispatch, rejectWithValue }) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('images[]', file);
    });

    try {
      const { data } = await uploadFileMedialibraryRequest(formData);

      if (data) {
        dispatch(fetchMediaFilesAsync({ count: defaultCountPost }));
      }
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const uploadFileMapAsync = createAsyncThunk(
  `${medialibraryScope}/uploadFileMapAsync`,
  async (files: { map: MapContent; minimap: MapContent }, { dispatch, rejectWithValue }) => {
    const { map, minimap } = files;
    if (!map || !minimap) {
      return;
    }

    const formData = new FormData();
    Array.from(map).forEach((file) => formData.append('map', file));
    Array.from(minimap).forEach((file) => formData.append('minimap', file));

    try {
      const { data } = await uploadFileMapItemsRequest(formData);

      if (data) {
        dispatch(getMapListAsync());
      }
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);

export const removeFileAsync = createAsyncThunk(
  `${medialibraryScope}/removeFileAsync`,
  async ({ id }: { id: number }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await removeFileMedialibraryRequest(id);

      if (data) {
        dispatch(fetchMediaFilesAsync({ count: defaultCountPost }));
      }
    } catch (error) {
      dispatch(workerAddError(error));
      return rejectWithValue(error);
    }
  },
);
