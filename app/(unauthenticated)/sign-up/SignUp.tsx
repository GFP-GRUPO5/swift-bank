import { signUpUserWithEmail } from "@/redux/features/auth/thunks/sign-up";
import { useAppDispatch } from "@/redux/hooks";
import { CreateAuthUserDTO } from "@/domain/types/auth.types";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialState: CreateAuthUserDTO = {
  name: '',
  lastName: '',
  email: '',
  password: '',
}

export default function SignUp() {
  const dispatch = useAppDispatch()
  const [userData, setUserData] = useState<CreateAuthUserDTO>(initialState)

  function handleSubmit() {
    dispatch(signUpUserWithEmail(userData))
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'orange',
        flex: 1,
        width: '100%'
      }}
    >
      <View>
        <TextInput
          style={{ color: '#111', backgroundColor: 'white', marginBottom: 8, padding: 16, fontSize: 16 }}
          placeholder="Name"
          value={userData?.name}
          onChangeText={(text) => setUserData(state => ({ ...state, name: text }))}
        />
        <TextInput
          style={{ color: '#111', backgroundColor: 'white', marginBottom: 8, padding: 16, fontSize: 16 }}
          placeholder="Last Name"
          value={userData?.lastName}
          onChangeText={(text) => setUserData(state => ({ ...state, lastName: text }))}
        />
        <TextInput
          style={{ color: '#111', backgroundColor: 'white', marginBottom: 8, padding: 16, fontSize: 16 }}
          placeholder="Email"
          autoCapitalize="none"
          value={userData?.email}
          onChangeText={(text) => setUserData(state => ({ ...state, email: text }))}
        />
        <TextInput
          style={{ color: '#111', backgroundColor: 'white', marginBottom: 8, padding: 16, fontSize: 16 }}
          secureTextEntry
          placeholder="Password"
          value={userData?.password}
          onChangeText={(text) => setUserData(state => ({ ...state, password: text }))}
        />
      </View>
      <Pressable
        style={{
          width: '100%',
          backgroundColor: 'blue',
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontWeight: 700, fontSize: 24 }}>Cadastrar</Text>
      </Pressable>
    </SafeAreaView>
  )
}
