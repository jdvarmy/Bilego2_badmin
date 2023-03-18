import { AxiosError } from 'axios';

import { isObjectGuard } from '../../../typings/types';

export const alertScope = 'alert' as const;

export type AlertState = {
  uid: string;
  date: string;
  delay: number;
  severity: 'success' | 'info' | 'warning' | 'error';
  title: string;
  text?: string;
};

export type ServerErrorStatus = { statusCode: number; message: number; error: string };
export function isServerErrorStatusGuard(value: unknown): value is ServerErrorStatus {
  if (!isObjectGuard(value)) {
    return false;
  }

  return (
    'statusCode' in value &&
    typeof value.statusCode === 'number' &&
    'message' in value &&
    typeof value.message === 'string' &&
    'error' in value &&
    typeof value.error === 'string'
  );
}
export function isAxiosErrorGuard(value: unknown): value is AxiosError {
  if (!isObjectGuard(value)) {
    return false;
  }

  return (
    'code' in value &&
    typeof value.code === 'string' &&
    'config' in value &&
    typeof value.config === 'object' &&
    'message' in value &&
    typeof value.message === 'string' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'request' in value &&
    typeof value.request === 'object' &&
    'response' in value &&
    typeof value.response === 'object'
  );
}

export type SuccessType = Pick<AlertState, 'title' | 'text'> & { ms?: number };
