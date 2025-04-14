import AntDesign from "@expo/vector-icons/AntDesign";
import { ExternalPathString, Link, RelativePathString } from "expo-router";
import { Text, View } from "react-native";

interface Props {
  sectionTitle: string
  href: RelativePathString | ExternalPathString | any
  buttonTitle: string
}

export function CardCreationCard({ buttonTitle, href, sectionTitle }: Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 16, fontWeight: 700 }}>{sectionTitle}</Text>
      <Link href={href}>
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
          <Text style={{ textAlign: 'center' }}>{buttonTitle}</Text>
          <AntDesign name="pluscircleo" size={24} color="black" style={{ position: 'absolute', right: 16 }} />
        </View>
      </Link>
    </View>
  )
}
