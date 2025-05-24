import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

interface Props {
  isModal?: boolean
  label?: string
}

export function HeaderGoBackButton({ isModal = false, label }: Props) {
  const router = useRouter()

  return (
    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.back()}>
      <MaterialIcons name={isModal ? "keyboard-arrow-down" : "keyboard-arrow-left"} size={24} color="#2C2C2C" />
      <Text style={{ fontSize: 16 }}>{label ? label : 'voltar'}</Text>
    </Pressable>
  )
}
