import { USER_DATA_KEY } from "@/domains/authentication/constants/async-storage-user";
import { SignInAppUser } from "@/domains/authentication/types/user";
import { setUserDataFromAsyncStorage } from "@/redux/features/auth/auth-slice";
import { useAppDispatch } from "@/redux/hooks";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { getItemAsyncStorage } from "@/shared/utils/AsyncStorage";
import { SplashScreen, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { styles } from "./index.styles";

SplashScreen.preventAutoHideAsync()

export default function Entry() {
  const dispatch = useAppDispatch()
  const [loadingStates, setLoadingState] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const router = useRouter()

  async function getUserData() {
    try {
      const result = await getItemAsyncStorage<SignInAppUser>(USER_DATA_KEY)

      if (!result) {
        setLoadingState(false)
        router.push('/(unauthenticated)/sign-in/SignIn')
        return
      }

      dispatch(setUserDataFromAsyncStorage(result))
      setTimeout(() => {
        setIsValid(true)
        setLoadingState(false)
        router.push('/(authenticated)')
      }, 1000)
    } catch (error) {
      Alert.alert('Error')
    } finally {
      setLoadingState(false)
      SplashScreen.hideAsync()
    }
  }

  useEffect(() => {
    getUserData()
  }, [])



  return (
    <BackgroundGradient style={styles.container}>
      <View>
        <Text
          style={styles.logoText}
        >
          Swift <Text style={styles.light}>Bank</Text>
        </Text>
        <Text style={styles.subtitle}>O banco feito justamente para você ;) </Text>
      </View>
      <View style={styles.loaderWrapper}>
        <ActivityIndicator size={'large'} color={'#c76a0c'} />
      </View>
    </BackgroundGradient>
  )
}
