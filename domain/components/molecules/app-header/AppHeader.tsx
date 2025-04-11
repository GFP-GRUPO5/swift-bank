import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { ReactNode } from "react";

interface Props {
  leftContent?: ReactNode,
  centerContent?: ReactNode | string,
  rigthContent?: ReactNode | string,
}

export function AppHeader({ centerContent, leftContent, rigthContent }: Props) {
  const router = useRouter()
  return (
    <View style={{ backgroundColor: 'transparent', marginBottom: 16 , flexDirection: 'row', alignItems: 'center'}}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        { leftContent && leftContent}
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { typeof centerContent === 'string' ? <Text>{centerContent}</Text> : centerContent }
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { typeof rigthContent === 'string' ? <Text>{rigthContent}</Text> : rigthContent }
      </View>
    </View>
  )
}
