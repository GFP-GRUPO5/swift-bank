import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export function CardCreationCard() {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 16, fontWeight: 700 }}>Você possui nenhum cartão</Text>
      <Link href={'/(authenticated)/card-creation/CardCreation'}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            backgroundColor: '#FFF',
            padding: 16,
            position: 'relative',
            justifyContent: 'center',
            borderRadius: 8,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Adiconar cartão</Text>
          <AntDesign name="pluscircleo" size={24} color="black" style={{ position: 'absolute', right: 16 }} />
        </View>
      </Link>
    </View>
  )
}
