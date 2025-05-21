import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { styles } from "./AppHeader.styles";

interface Props extends ViewProps {
  leftContent?: ReactNode,
  centerContent?: ReactNode | string,
  rigthContent?: ReactNode | string,
}

/**
 * @param centerContent
 * @param leftContent
 * @param rigthContent
 */
export function AppHeader({ centerContent, leftContent, rigthContent, style, ...props }: Props) {
  const router = useRouter()

  return (
    <View style={[style ,styles.header]} {...props}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        { leftContent && leftContent}
      </View>

      <View style={styles.center}>
        { typeof centerContent === 'string' ? <Text numberOfLines={1} ellipsizeMode="tail" style={{  }}>{centerContent}</Text> : centerContent }
      </View>

      <View style={styles.right}>
        { typeof rigthContent === 'string' ? <Text>{rigthContent}</Text> : rigthContent }
      </View>
    </View>
  )
}
