import { CreateUserDOT } from "@/models/User.dto";
import { UserService } from "@/services/user.services";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Entry() {
  const [user, setUser] = useState<Partial<CreateUserDOT>>({})

  function handleSubmitForm() {
    console.log('paaaaa')
    console.log(JSON.stringify(user))
    if (user?.["age"] && user?.["name"] && user?.["lastName"] && user?.["email"]) {
      console.log('Poooowwwww')
      UserService.createUser(user as CreateUserDOT)
    }
  }

  return (
    <SafeAreaView
      style={{
        width: '100%',
        flex: 1,

      }}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'orange',
        width: '100%',
        padding: 4,
      }}>
        <TextInput
          placeholder="Name"
          style={{
            backgroundColor: 'white',
            padding: 8,
            marginBottom: 8,
          }}
          onChangeText={(name) => setUser(state => ({
            ...state,
            name
          }))}
          value={user?.name}
        />
        <TextInput
          placeholder="Last Name"
          style={{
            backgroundColor: 'white',
            padding: 8,
            marginBottom: 8,
          }}
          onChangeText={(lastName) => setUser(state => ({
            ...state,
            lastName,
          }))}
          value={user?.lastName}
        />
        <TextInput
          placeholder="Email"
          style={{
            backgroundColor: 'white',
            padding: 8,
            marginBottom: 8,
          }}
          onChangeText={(email) => setUser(state => ({
            ...state,
            email,
          }))}
          value={user?.email}
        />
        <TextInput
          placeholder="Age"
          keyboardType="numeric"
          style={{
            backgroundColor: 'white',
            padding: 8,
          }}
          onChangeText={(age) => setUser({
            age: +age
          })}
          value={`${user?.age}`}
        />
        <Button
          title="Submit"
          onPress={handleSubmitForm}
          color={'#FF0000'}

        />
      </View>
    </SafeAreaView>
  )
}
