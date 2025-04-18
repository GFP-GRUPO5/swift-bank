import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { ReactNode } from "react";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

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
    <View style={[style ,{ backgroundColor: 'transparent', marginBottom: 16 , flexDirection: 'row', alignItems: 'center'}]} {...props}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        { leftContent && leftContent}
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { typeof centerContent === 'string' ? <Text numberOfLines={1} ellipsizeMode="tail" style={{  }}>{centerContent}</Text> : centerContent }
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { typeof rigthContent === 'string' ? <Text>{rigthContent}</Text> : rigthContent }
      </View>
    </View>
  )
}
