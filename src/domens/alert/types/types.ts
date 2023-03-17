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

export type SuccessType = Pick<AlertState, 'title' | 'text'> & { ms?: number };
