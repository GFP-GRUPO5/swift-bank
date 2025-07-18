import { UserData } from '@/modules/users/domain/types/user.type';

export interface IUserInitialState {
  loading: boolean;
  error: null | {
    hasError: boolean;
    message: string | null;
  };
  user: UserData | null;
}
