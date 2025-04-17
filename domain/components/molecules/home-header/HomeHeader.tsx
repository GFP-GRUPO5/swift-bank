import { useAppSelector } from "@/redux/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { Linking, Pressable, Text, View } from "react-native";

export function HomeHeader() {
  const user = useAppSelector(state => state.auth.user)
  const router = useRouter()

  function handleProfileNavigation() {
    router.push('/(authenticated)/user-profile/UserProfile')
  }

  return (
    <View
      style={{
        paddingTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
      }}
    >
      <Link href={'/(authenticated)/user-profile/UserProfile'}>
        <Text style={{ fontSize: 24 }}>
          Olá, {' '}
          <Text style={{ fontWeight: 700 }}>{user?.displayName}</Text>
        </Text>
      </Link>
      <Link href={'/(authenticated)/notifications/Notifications'}>
        <View style={{ position: 'relative' }}>
          <Ionicons name="notifications" size={24} color="black" />
          <View
            style={{
              height: 6,
              width: 6,
              backgroundColor: 'red',
              position: 'absolute',
              borderRadius: '100%',
              right: 4,
              top: 2,
            }}
          />
        </View>
      </Link>
    </View>
  )
}
