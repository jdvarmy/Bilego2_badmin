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

export type AlertType = ServerErrorStatus & { ms?: number };
export type SuccessType = Pick<AlertState, 'title' | 'text'> & { ms?: number };
