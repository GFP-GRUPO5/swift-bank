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
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import { AppState, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./index.styles";

const lastTransaction = [
  {
    id: '00001',
    icon: <MaterialIcons name="fastfood" size={24} color="#2C2C2C" />,
    title: 'Compra no iFood',
    value: 'R$ 25,90'
  },
  {
    id: '00002',
    icon: <MaterialIcons name="work" size={24} color="#2C2C2C" />,
    title: 'Compra na Leroy Merlin',
    value: 'R$ 1480,90'
  },
  {
    id: '00003',
    icon: <MaterialIcons name="shopping-bag" size={24} color="#2C2C2C" />,
    title: 'Compra na Leroy Merlin',
    value: 'R$ 1480,90'
  },
];

export default function HomeScreen() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  const { currentAccount } = useAppSelector(state => state.account)
  const { card: { currentCard } } = useAppSelector(state => state)
  const { notifications } = useAppSelector(state => state.notification)
  const lastThreeStatements = currentAccount?.statements?.slice().reverse().slice(0, 3);
  const router = useRouter()

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
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.section}>
          <HomeAccountCard />
        </View>
        <CreditCardModel card={currentCard} />
        <CardButtons />
        <Link href={'/(authenticated)/loans/Loans'} style={styles.link}>
          <Card>
            <View style={styles.row}>
              <Text style={styles.title}>
                Empréstimos
              </Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="#2C2C2C" />
            </View>
            <Text>
              Simule seu crédito e antecipe seus planos.
            </Text>
          </Card>
        </Link>
        <Link href={'/(authenticated)/loans/Loans'} style={styles.link}>
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
        <Card style={styles.cardMargin}>
          <Link
            href={`/account/debit/Debit`}
            style={styles.link}
          >
            <View
              style={styles.fullWidth}
            >
              <Text
                style={styles.largeTitle}
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
