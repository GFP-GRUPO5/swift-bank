import { ButtonAction } from '@/shared/components/button-action/ButtonAction';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function CardButtons() {
  return (
    <View style={{ gap: 16, marginBottom:16, flexDirection: 'row', justifyContent:'space-between'}}>
      <ButtonAction
        style={{ backgroundColor: "#2C2C2C", padding: 16, borderRadius: 24 }}
        onPress={() => router.navigate('/(authenticated)/card-creation/CardCreation')}
      >
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFF' }}>Adicionar cartão</Text>
      </ButtonAction>
      <ButtonAction
        style={{ backgroundColor: "#2C2C2C", padding: 16, borderRadius: 24 }}
        onPress={() => router.navigate('/(authenticated)/card-details/CardDetails')}
      >
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFF' }}>Gerenciar cartões</Text>
      </ButtonAction>
    </View>
  );
}
