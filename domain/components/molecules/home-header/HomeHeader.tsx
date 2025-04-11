import { useAppSelector } from "@/redux/hooks";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export function HomeHeader() {
  const user = useAppSelector(state => state.auth.user)

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
      <Text style={{ fontSize: 24 }}>
        Olá, {' '}
        <Text style={{ fontWeight: 700 }}>{user?.name}</Text>
      </Text>
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
