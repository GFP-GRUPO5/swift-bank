import { HomeAccountCard } from "@/domains/account/components/home-account-card/HomeAccountCard";
import { USER_EXPIRATION_TIME } from "@/domains/authentication/constants/async-storage-user";
import CardButtons from "@/domains/cards/components/card-buttons/CardButtons";
import { Card } from "@/domains/cards/components/card/Card";
import { CreditCardModel } from "@/domains/cards/components/credit-card-model/CreditCardModel";
import { listenToNotifications } from "@/domains/notifications/services/notification.listeners";
import { fetchAccount } from "@/redux/features/account/thunks/fetch-account";
import { signOutUser } from "@/redux/features/auth/thunks/sign-out";
import { setNotifications } from "@/redux/features/notifications/notifications-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AccountStatement } from "@/shared/components/account-statement";
import { HomeHeader } from "@/shared/components/home-header/HomeHeader";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { getItemAsyncStorage } from "@/shared/utils/AsyncStorage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { isAfter } from "date-fns";
import { Link, Redirect, useNavigation } from "expo-router";
import { useEffect } from "react";
import { AppState, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  const { currentAccount } = useAppSelector(state => state.account)
  const { card: { currentCard } } = useAppSelector(state => state)
  const { notifications } = useAppSelector(state => state.notification)
  const lastThreeStatements = currentAccount?.statements?.slice().reverse().slice(0, 3);

  async function checkIfTokenIsValid() {
    const now = Date.now()
    const storageExpiresIn = await getItemAsyncStorage<string>(USER_EXPIRATION_TIME)


    if (storageExpiresIn) {
      const then = new Date(storageExpiresIn!).valueOf()

      if (isAfter(now, then)) {
        dispatch(signOutUser())
      }
    } else {
      dispatch(signOutUser())
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      checkIfTokenIsValid()
    }, 60 * 60 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    AppState.addEventListener('change', (something) => {
      checkIfTokenIsValid()
    })
  }, [])

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchAccount(user?.uid))
    }
  }, [user, currentAccount?.currentAmount])

  useEffect(() => {
    const unsubscribe = listenToNotifications((notifications) => {
      dispatch(setNotifications(notifications))
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (!user) {
    return <Redirect href={'/(unauthenticated)/sign-in/SignIn'} />
  }

  return (
    <BackgroundGradient>
      <HomeHeader />
      <View style={{ marginBottom: 16 }}>
        <HomeAccountCard />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 80 }}>
        <CreditCardModel card={currentCard} />
        <CardButtons />
        <Link href={'/(authenticated)/loans/Loans'} style={{ marginBottom: 16 }}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 700, marginBottom: 8 }}>
                Empréstimos
              </Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#2C2C2C" />
            </View>
            <Text>
              Simule seu crédito e antecipe seus planos.
            </Text>
          </Card>
        </Link>
        <Link href={'/(authenticated)/loans/Loans'} style={{ marginBottom: 16 }}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 700, marginBottom: 8 }}>Investimentos</Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#2C2C2C" />
            </View>
            <Text>
              Invista e acelere a realização dos seus sonhos!
            </Text>
          </Card>
        </Link>
        <Card>
          <Link
            href={`/account/debit/Debit`}
            style={{ marginBottom: 8 }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600'
                }}
              >
                Últimas Transações
              </Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#2C2C2C" />
            </View>
          </Link>
          <AccountStatement statements={lastThreeStatements ?? []} />
        </Card>
      </ScrollView>
    </BackgroundGradient>
  );
}
