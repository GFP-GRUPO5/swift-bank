import AntDesign from "@expo/vector-icons/AntDesign";
import { ExternalPathString, Link, RelativePathString } from "expo-router";
import { Text, View, ViewProps } from "react-native";
import { styles } from "./CardCreationCard.styles";

interface Props extends ViewProps {
  sectionTitle: string
  href: RelativePathString | ExternalPathString | any
  buttonTitle: string
}

export function CardCreationCard({ buttonTitle, href, sectionTitle, style, ...props }: Props) {
  return (
    <View style={style} {...props}>
      <Text style={{ marginBottom: 16, fontWeight: 700 }}>{sectionTitle}</Text>
      <Link href={href}>
        <View
          style={styles.cardButton}
        >
          <Text style={{ textAlign: 'center' }}>{buttonTitle}</Text>
          <AntDesign name="pluscircleo" size={24} color="black" style={{ position: 'absolute', right: 16 }} />
        </View>
      </Link>
    </View>
  )
}
