import StoreProvider from "@/redux/StoreProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(updateAccessToken({ accessToken: 'goiaba' }))
  // }, [])

  return (
    <StoreProvider>
      <Slot />
    </StoreProvider>
  )
}
