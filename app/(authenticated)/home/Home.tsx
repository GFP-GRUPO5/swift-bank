import { BackgroundGradient } from "@/domain/components/templates/background-gradient/BackgroundGradient";
import { HomeAccountCard } from "@/domain/components/organism/home-account-card/HomeAccountCard";
import { CardCreationCard } from "@/domain/components/molecules/card-creation-card/CardCreationCard";
import { Card } from "@/domain/components/atoms/card/Card";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from "expo-linear-gradient";
import { HomeHeader } from "@/domain/components/molecules/home-header/HomeHeader";

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
  return (
    <BackgroundGradient>
      <HomeHeader />
      <View style={{ marginBottom: 12 }}>
        <HomeAccountCard />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 80 }}>
        <LinearGradient colors={['transparent', 'transparent']}>
          <View style={{ paddingTop: 12 }}>
            <CardCreationCard />
          </View>
          <Link href={'/(authenticated)/loans/Loans'} style={{ marginBottom: 16 }}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 700, marginBottom: 8 }}>Empréstimos</Text>
                <Entypo name={"chevron-small-right"} size={24} color="black" />
              </View>
              <Text>Simule seu crédito e antecipe seus planos.</Text>
            </Card>
          </Link>
          <Link href={'/(authenticated)/loans/Loans'} style={{ marginBottom: 16 }}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 700, marginBottom: 8 }}>Investimentos</Text>
                <Entypo name={"chevron-small-right"} size={24} color="black" />
              </View>
              <Text>Invista e acelere a realização dos seus sonhos!</Text>
            </Card>
          </Link>

          <Card>
            <Link href={'/(authenticated)/loans/Loans'} style={{ paddingBottom: 12, marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontWeight: 700, marginBottom: 8 }}>Ultimas transações</Text>
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
                  }}>
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
        </LinearGradient>
      </ScrollView>
    </BackgroundGradient>
  )
}
