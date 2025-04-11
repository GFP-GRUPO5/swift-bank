import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export function HeaderGoBackButton() {
  const router = useRouter()
  
  return (
    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.back()}>
      <Entypo name="chevron-small-left" size={24} color="black" />
      <Text style={{ fontSize: 16 }}>voltar</Text>
    </Pressable>
  )
}
