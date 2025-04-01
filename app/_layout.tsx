import { updateAccessToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import StoreProvider from "@/redux/StoreProvider";
import { Slot } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(updateAccessToken({ accessToken: 'goiaba' }))
  }, [])

  return (
    <StoreProvider>
      <Slot />
    </StoreProvider>
  )
}
