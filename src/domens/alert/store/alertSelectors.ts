import { RootState } from '../../store';
import { AlertState } from '../types/types';

export const selectAlertStore = (state: RootState) => state?.alert;

export const selectAlertMessage = (state: RootState): AlertState => selectAlertStore(state)?.message;

export const selectAlertArchive = (state: RootState): AlertState[] => selectAlertStore(state)?.archive;