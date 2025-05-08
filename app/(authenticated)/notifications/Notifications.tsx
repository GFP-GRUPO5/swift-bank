import { Card } from "@/domains/cards/components/card/Card";
import { fetchNotifications } from "@/redux/features/notifications/thunks/fetch-notifications";
import { setNotificationsRead } from "@/redux/features/notifications/thunks/set-notifications-read";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AppHeader } from "@/shared/components/app-header/AppHeader";
import { HeaderGoBackButton } from "@/shared/components/header-go-back-button/HeaderGoBackButton";
import { SwiftBankLogo } from "@/shared/icons/swiftBankLogo";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function NotificationsScreen() {
  const { notifications } = useAppSelector(state => state.notification)
  const [hasNotification, setHasNotification] = useState(notifications.some(notification => !notification.read))
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchNotifications())
    return () => {
      dispatch(setNotificationsRead({ notifications }))
    }
  }, [])

  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton label="Fechar" isModal />}
        centerContent={<SwiftBankLogo />}
      />
      <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>Novas notificações</Text>
      {!hasNotification && (
        <View style={{ marginBottom: 24, paddingBottom: 24, borderBottomWidth: .4 }}>
          <Card>
            <Text style={{ textAlign: 'center', fontWeight: 600 }}>
              Você não possuí novas notificações!
            </Text>
          </Card>
        </View>
      )}

      {notifications.map(notification => (
        <View
          key={notification.id}
          style={{
            backgroundColor: notification.read ? '#EEE' : '#FFF',
            padding: 16,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8
          }}
        >
          {!notification.read && <View style={{ height: 8, width: 8, borderRadius: '100%', backgroundColor: 'red' }} />}
          <Text>{notification?.info?.message}</Text>
        </View>
      ))}
    </BackgroundGradient>
  )
}
