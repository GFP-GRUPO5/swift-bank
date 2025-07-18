import { fetchNotifications } from '@/modules/notifications/presentation/thunks/fetch-notifications';
import { setNotificationsRead } from '@/modules/notifications/presentation/thunks/set-notifications-read';
import { AppHeader } from '@/shared/presentation/components/app-header/AppHeader';
import { Card } from '@/shared/presentation/components/card/Card';
import { HeaderGoBackButton } from '@/shared/presentation/components/header-go-back-button/HeaderGoBackButton';
import { SwiftBankLogo } from '@/shared/presentation/icons/swiftBankLogo';
import { BackgroundGradient } from '@/shared/presentation/templates/background-gradient/BackgroundGradient';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './Notifications.styles';

export default function NotificationsScreen() {
  const { notifications } = useAppSelector((state) => state.notification);
  const [hasNotification, _setHasNotification] = useState(
    notifications.some((notification) => !notification.read),
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
    return () => {
      dispatch(setNotificationsRead({ notifications }));
    };
  }, []);

  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton label="Fechar" isModal />}
        centerContent={<SwiftBankLogo />}
      />
      <Text style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>
        Novas notificações
      </Text>
      {!hasNotification && (
        <View
          style={{
            marginBottom: 24,
            paddingBottom: 24,
            borderBottomWidth: 0.4,
          }}
        >
          <Card>
            <Text style={{ textAlign: 'center', fontWeight: 600 }}>
              Você não possuí novas notificações!
            </Text>
          </Card>
        </View>
      )}

      {notifications.map((notification) => (
        <View key={notification.id} style={styles.notificationCard}>
          {!notification.read && <View style={styles.dot} />}
          <Text>{notification?.info?.message}</Text>
        </View>
      ))}
    </BackgroundGradient>
  );
}
