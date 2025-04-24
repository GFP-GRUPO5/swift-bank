import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { ButtonAction } from '@/shared/components/button-action/ButtonAction';

export default function CardButtons() {
  return (
    <View style={{ gap: 16, marginBottom: 16, flexDirection: 'row', justifyContent: 'center' }}>
      <ButtonAction
        style={{ backgroundColor: "#2C2C2C", padding: 16, borderRadius: 24 }}
        onPress={() => router.navigate('/(authenticated)/card-creation/CardCreation')}
      >
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFF' }}>Adicionar cartão</Text>
      </ButtonAction>
      <ButtonAction
        style={{ backgroundColor: "#2C2C2C", padding: 16, borderRadius: 24 }}
        onPress={() => router.navigate('/(authenticated)/card-creation/CardCreation')}
      >
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFF' }}>Gerenciar cartões</Text>
      </ButtonAction>
    </View>
  );
}
