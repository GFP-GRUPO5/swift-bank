import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

interface Props {
  isModal?: boolean
  label?: string
}

export function HeaderGoBackButton({ isModal, label }: Props) {
  const router = useRouter()

  return (
    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.back()}>
      <Entypo name={isModal ? "chevron-small-down" : "chevron-small-left"} size={24} color="black" />
      <Text style={{ fontSize: 16 }}>{label ? label : 'voltar'}</Text>
    </Pressable>
  )
}
