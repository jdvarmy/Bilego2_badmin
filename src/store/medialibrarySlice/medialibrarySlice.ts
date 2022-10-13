import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import {
  fetchMapItemsRequest,
  fetchMedialibraryRequest,
  removeFileMedialibraryRequest,
  uploadFileMapItemsRequest,
  uploadFileMedialibraryRequest,
} from '../../api/requests';
import { MapFile, MediaFile } from '../../typings/types';
import { MapContent } from '../../components/AddMapModal/AppMapModal';
import { deleteUserAsync } from '../usersSlice/usersSlice';

type State = {
  loading: boolean;
  files: MediaFile[] | null;
  maps: MapFile[] | null;
};

const initialState: State = {
  loading: false,
  files: null,
  maps: null,
};

const medialibrary = createSlice({
  initialState,
  name: 'medialibrary',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFileList: (state, action: PayloadAction<MediaFile[]>) => {
      state.files = action.payload;
    },
    setMapList: (state, action) => {
      state.maps = action.payload;
    },
  },
});

export const { setLoading, setFileList, setMapList } = medialibrary.actions;

export default medialibrary.reducer;

export const getFileListAsync = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await fetchMedialibraryRequest();

    dispatch(setFileList(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getMapListAsync = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await fetchMapItemsRequest();

    dispatch(setMapList(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const uploadFileAsync =
  (files: FileList): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('images[]', file);
      });
      const { data } = await uploadFileMedialibraryRequest(formData);

      if (data) {
        dispatch(getFileListAsync());
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const uploadFileMapAsync =
  (files: { map: MapContent; minimap: MapContent }): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const { map, minimap } = files;
    if (!map || !minimap) {
      return;
    }

    try {
      const formData = new FormData();
      Array.from(map).forEach((file) => formData.append('map', file));
      Array.from(minimap).forEach((file) => formData.append('minimap', file));
      const { data } = await uploadFileMapItemsRequest(formData);

      if (data) {
        dispatch(getMapListAsync());
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const removeFileAsync =
  (id: number): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await removeFileMedialibraryRequest(id);

      if (data) {
        dispatch(getFileListAsync());
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
