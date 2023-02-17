import { UserRole } from '../../../typings/enum';
import { User } from '../../../typings/types';

export const authScope = 'auth' as const;

export type RequestAuth = {
  email: string;
  password: string;
  name?: string;
};

export type ResponseAuth = {
  accessToken: string;
  user: User;
};

export type RequestUser = RequestAuth & {
  uid?: string;
  status?: number;
  role?: UserRole;
  sendMail?: boolean;
  avatar?: number;
  surname?: string;
  birthdate?: Date | null;
  phone?: string;
  concertManagerInfo?: string;
  concertManagerPercentage?: number;
};
