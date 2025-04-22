import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { setUserDataFromAsyncStorage } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getItemAsyncStorage } from "@/shared/utils/AsyncStorage";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { USER_DATA_KEY } from "@/domains/authentication/constants/async-storage-user";
import { SignInAppUser } from "@/domains/authentication/types/user";
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync()

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
    }
  }

  useEffect(() => {
    getUserData()
  }, [])



  return (
    <BackgroundGradient style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View>
        <Text
          style={{
            fontSize: 48,
            fontWeight: "700",
            marginTop: 56,
            textAlign: "center",
          }}
        >
          Swift <Text style={{ fontWeight: 300 }}>Bank</Text>
        </Text>
        <Text style={{ fontSize: 18 }}>O banco feito justamente para você ;) </Text>
      </View>
      <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={'#c76a0c'} />
      </View>
    </BackgroundGradient>
  )
}
