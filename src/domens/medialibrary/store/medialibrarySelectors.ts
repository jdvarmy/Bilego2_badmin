import { select } from '../../selectors';
import { RootState } from '../../store';

export const selectMedialibraryStore = (state: RootState) => select(state)?.medialibrary;

export const selectMedialibraryStatus = (state: RootState) => selectMedialibraryStore(state)?.status;

export const selectMedialibraryFiles = (state: RootState) => selectMedialibraryStore(state)?.files;

export const selectMedialibraryMaps = (state: RootState) => selectMedialibraryStore(state)?.maps;
