import { Link } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function SignInScreen() {
  return (
    <SafeAreaView>
      <Link href={'/(unathenticated)/sign-up/SignUp'}>
        <Text>Create Account</Text>
      </Link>
    </SafeAreaView>
  )
}
