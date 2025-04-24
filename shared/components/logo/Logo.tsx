import { Text } from "react-native"

export function Logo() {
  return (
    <Text style={{
      fontSize: 24,
      fontWeight: "700",
      textAlign: "left",
      wordWrap: 'nowrap',
      display: 'flex',
      marginBottom: 8
    }}>
      Swift <Text style={{ fontWeight: 300 }}>Bank</Text>
    </Text>
  )
}

