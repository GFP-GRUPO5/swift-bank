import { AuthService } from '@/modules/authentication/infrastructure/services/auth.service';
import { signOutUser } from '@/modules/authentication/presentation/thunks/sign-out';
import { useAppDispatch } from '@/shared/redux/hooks';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export function AuthSync({ children }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChange((user) => {
      if (!user) {
        dispatch(signOutUser());
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return <>{children}</>;
}
