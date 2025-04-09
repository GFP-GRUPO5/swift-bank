import { TextInput } from "@/components/atoms/text-input/TextInput";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Expense() {
    return (
        <SafeAreaView>
            <TextInput placeholder="Name" />
            <TextInput placeholder="lastName" />
            <TextInput placeholder="E-Mail" />
            <TextInput placeholder="Age" />
            <Pressable style={{}}>
                <Text>Submit</Text>
            </Pressable>
        </SafeAreaView>
    )
}