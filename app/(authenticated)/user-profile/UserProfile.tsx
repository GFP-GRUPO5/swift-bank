import { Card } from "@/domain/components/atoms/card/Card";
import { HeaderGoBackButton } from "@/domain/components/atoms/header-go-back-button/HeaderGoBackButton";
import { AppHeader } from "@/domain/components/molecules/app-header/AppHeader";
import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { signOutUser } from "@/redux/features/auth/thunks/sign-out";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Redirect } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function UserProfile() {
  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  function handleSignOut() {
    dispatch(signOutUser())
    return <Redirect href='/(unauthenticated)/sign-in/SignIn' />
  }

  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton isModal />}
      />
      <Card>
        <Text>
          {user?.name} {' '}
          {user?.lastName}
        </Text>
        <Text>
          Ativo desde {JSON.stringify(user?.createdAt)}
        </Text>
        <Pressable onPress={handleSignOut}>
          <Text style={{ color: 'red' }}>Log Out</Text>
        </Pressable>
      </Card>
    </BackgroundGradient>
  )
}
