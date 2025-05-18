import { useAppSelector } from "@/redux/hooks";
import { SwiftBankLogo } from "@/shared/icons/swiftBankLogo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./home-header.styles";

export function HomeHeader() {
  const user = useAppSelector(state => state.auth.user)
  const { notifications } = useAppSelector(state => state.notification)
  const [ hasNotification, setHasNotifications ] = useState(false)

  useEffect(() => {
    const theresNotifications = notifications.some(notification => !notification.read)
    setHasNotifications(theresNotifications)
  }, [notifications])

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
            <View style={styles.profileRow}>
              <Text style={{ fontSize: 20 }}>Olá,</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', marginRight: 8 }}>
                {user?.displayName}
              </Text>
              <MaterialIcons name="settings" size={20} color="#2C2C2C" />
            </View>
          </Link>
        </View>
        <Link href={'/(authenticated)/notifications/Notifications'}>
          <View style={styles.notificationIconWrapper}>
            <Ionicons name="notifications" size={24} color="black" />
            {hasNotification && <View
              style={styles.notificationDot }
            />}
          </View>
        </Link>
      </View>
    </View>
  )
}
