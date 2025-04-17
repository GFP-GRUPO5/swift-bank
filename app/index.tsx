import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { USER_DATA_KEY } from "@/domain/constants/async-storage-user";
import { UserDTO } from "@/domain/models/User.dto";
import { setUserDataFromAsyncStorage } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getItemAsyncStorage } from "@/utils/AsyncStorage";
import { Redirect } from "expo-router";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Entry() {
  const dispatch = useAppDispatch()
  const [loadingStates, setLoadingState] = useState(true)
  const [hasError, setHasError] = useState(false)

  async function getUserData() {
    try {
      const result = await getItemAsyncStorage<User>(USER_DATA_KEY)

      if (!result) {
        setLoadingState(false)
        setHasError(true)
        return
      }

      dispatch(setUserDataFromAsyncStorage(result))
      setLoadingState(false)
    } catch (error) {
      setHasError(true)
    } finally {
      setLoadingState(false)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  if (loadingStates) {
    return (
      <BackgroundGradient>
        <View>
          <ActivityIndicator />
        </View>
      </BackgroundGradient>
    )
  }

  return <Redirect href="/(unauthenticated)/sign-in/SignIn" />;
}
