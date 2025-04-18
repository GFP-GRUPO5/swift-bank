import { signOutUser } from "@/redux/features/auth/thunks/sign-out";
import { useAppDispatch } from "@/redux/hooks";
import { AuthService } from "@/authentication/services/auth.service";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode
}

export function AuthSync({ children }: Props) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChange((user) => {
      if (!user) {
        dispatch(signOutUser())
      }
    })

    return () => { unsubscribe }
  }, [])

  return <>{children}</>

}