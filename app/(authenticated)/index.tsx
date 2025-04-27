import { HomeAccountCard } from "@/domains/account/components/home-account-card/HomeAccountCard";
import { USER_EXPIRATION_TIME } from "@/domains/authentication/constants/async-storage-user";
import { CardCreationCard } from "@/domains/cards/components/card-creation-card/CardCreationCard";
import { Card } from "@/domains/cards/components/card/Card";
import { fetchAccount } from "@/redux/features/account/thunks/fetch-account";
import { signOutUser } from "@/redux/features/auth/thunks/sign-out";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { HomeHeader } from "@/shared/components/home-header/HomeHeader";
import { BackgroundGradient } from "@/shared/templates/background-gradient/BackgroundGradient";
import { getItemAsyncStorage } from "@/shared/utils/AsyncStorage";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { isAfter } from "date-fns";
import { Link, Redirect } from "expo-router";
import { useEffect } from "react";
import { AppState, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const lastTransaction = [
  {
    id: '00001',
    icon: <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#555" />,
    title: 'Compra no iFood',
    value: 'R$ 25,90'
  },
  {
    id: '00002',
    icon: <MaterialCommunityIcons name="briefcase" size={24} color="#555" />,
    title: 'Compra na Leroy Merlin',
    value: 'R$ 1480,90'
  },
  {
    id: '00003',
    icon: <MaterialCommunityIcons name="bank-transfer-in" size={24} color="#555" />,
    title: 'Compra na Leroy Merlin',
    value: 'R$ 1480,90'
  },
]

export default function HomeScreen() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  const { currentAccount } = useAppSelector(state => state.account)

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

  if (!user) {
    return <Redirect href={'/(unauthenticated)/sign-in/SignIn'} />
  }

  return (
    <BackgroundGradient>
      <HomeHeader />
      <View style={{ marginBottom: 12 }}>
        <HomeAccountCard />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 80 }}>
        <View style={{ paddingTop: 12 }}>
          <CardCreationCard
            style={{ marginBottom: 24 }}
            sectionTitle="Você possui nenhum cartão"
            buttonTitle="Adicionar cartão"
            href={"/(authenticated)/card-creation/CardCreation"}
          />
        </View>
        <Link href={'/(authenticated)/loans/Loans'} style={{ marginBottom: 16 }}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 700, marginBottom: 8 }}>
                Empréstimos
              </Text>
              <Entypo name={"chevron-small-right"} size={24} color="black" />
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
              <Entypo name={"chevron-small-right"} size={24} color="black" />
            </View>
            <Text>
              Invista e acelere a realização dos seus sonhos!
            </Text>
          </Card>
        </Link>
        <Card>
          <Link
            href={'/(authenticated)/loans/Loans'}
            style={{ paddingBottom: 12, marginBottom: 12 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ fontWeight: 700, marginBottom: 8 }}>
                Ultimas transações
              </Text>
              <Entypo name={"chevron-small-right"} size={24} color="black" />
            </View>
          </Link>
          {lastTransaction.map(transaction => (
            <View key={transaction.id} style={{ flexDirection: 'row', gap: 16 }}>
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: '100%',
                  borderWidth: 1,
                  borderColor: '#555',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16
                }}
              >
                {transaction.icon}
              </View>
              <View>
                <Text>
                  {transaction.title}
                </Text>
                <Text>
                  {transaction.value}
                </Text>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </BackgroundGradient>
  )
}
