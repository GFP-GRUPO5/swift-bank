import { useAppSelector } from "@/redux/hooks";
import { SwiftBankLogo } from "@/shared/icons/swiftBankLogo";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";

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
        justifyContent: 'space-between',
        marginBottom: 32,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ gap: 8 }}>
          <SwiftBankLogo />
          <Link href={'/(authenticated)/user-profile/UserProfile'}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
              <Text style={{ fontSize: 20 }}>Olá,</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', marginRight: 8 }}>
                {user?.displayName}
              </Text>
              <MaterialIcons name="settings" size={20} color="#2C2C2C" />
            </View>
          </Link>
        </View>
        <Link href={'/(authenticated)/notifications/Notifications'}>
          <View style={{ position: 'relative' }}>
            <MaterialIcons name="notifications" size={24} color="#2C2C2C" />
            <View
              style={{
                height: 6,
                width: 6,
                backgroundColor: 'red',
                position: 'absolute',
                borderRadius: 100,
                right: 4,
                top: 2,
              }}
            />
          </View>
        </Link>
      </View>
    </View>
  )
}
