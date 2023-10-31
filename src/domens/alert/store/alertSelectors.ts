import { RootState } from '../../../store/store';

export const selectAlertStore = (state: RootState) => state?.alert;

export const selectAlertShow = (state: RootState) => selectAlertStore(state)?.show;

export const selectAlertMessage = (state: RootState) => selectAlertStore(state)?.message;

export const selectAlertArchive = (state: RootState) => selectAlertStore(state)?.archive;
