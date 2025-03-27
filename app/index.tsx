import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from '../components/atoms/button/Button';
import { TextInput } from '../components/atoms/text-input/TextInput';

export default function Index() {
  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Button label="Botão com label" />
        <Button>
          <FontAwesome6 name="magnifier" size={24} color="black" />
        </Button>
        <TextInput />
      </View>
    </GestureHandlerRootView>
  );
}
