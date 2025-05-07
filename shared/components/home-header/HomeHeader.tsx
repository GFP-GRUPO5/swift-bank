import { useAppSelector } from "@/redux/hooks";
import { Logo } from "@/shared/components/logo/Logo";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

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
        <Logo />
        <Link href={'/(authenticated)/notifications/Notifications'}>
          <View style={{ position: 'relative' }}>
            <Ionicons name="notifications" size={24} color="black" />
            {hasNotification && <View
              style={{
                height: 6,
                width: 6,
                backgroundColor: 'red',
                position: 'absolute',
                borderRadius: '100%',
                right: 4,
                top: 2,
              }}
            />}
          </View>
        </Link>
      </View>
      <Link href={'/(authenticated)/user-profile/UserProfile'}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 8,
        }}>
          <Text style={{ fontSize: 20 }}>
            Olá,
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 700, marginRight: 8 }}>
            {user?.displayName}
          </Text>
          <AntDesign name="edit" size={20} color="black" />
        </View>
      </Link>
    </View>
  )
}
