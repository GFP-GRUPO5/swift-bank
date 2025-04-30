import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { BackgroundGradient } from '@/shared/templates/background-gradient/BackgroundGradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { fetchAllCards } from '@/redux/features/card/thunk/fetch-all-cards';
import { setActiveCard } from '@/redux/features/card/cardSlice';
import { fetchCardById } from '@/redux/features/card/thunk/fetch-card-by-id';
import { deleteCard } from '@/redux/features/card/thunk/delete-card';
import { AppHeader } from '@/shared/components/app-header/AppHeader';
import { HeaderGoBackButton } from '@/shared/components/header-go-back-button/HeaderGoBackButton';
import { Card } from '@/domains/cards/components/card/Card';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { cards, currentCard, loading, error } = useAppSelector(state => state.card);

  useEffect(() => {
    dispatch(fetchAllCards());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert("Erro", error.message);
    }
  }, [error]);

  const handleSelectCard = (cardId: string) => {
    dispatch(setActiveCard(cardId));
    dispatch(fetchCardById(cardId));
  };

  const handleDeleteCard = (cardId: string) => {
    Alert.alert(
      "Remover Cartão",
      "Tem certeza que deseja remover este cartão?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => dispatch(deleteCard(cardId)) }
      ]
    );
  };

  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton isModal />}
        centerContent='Meus cartões'
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Meus Cartões</Text>
          {loading && !cards.length ? (
            <Text>Carregando cartões...</Text>
          ) : cards.length === 0 ? (
            <Text>Nenhum cartão cadastrado</Text>
          ) : (
            cards.map(card => (
              <Card
                key={card.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 16,
                  backgroundColor: currentCard?.id === card.id ? "#000" : "#FFF",
                  borderRadius: 8,
                  marginBottom: 8,
                  elevation: 2
                }}
              >
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => handleSelectCard(card.id)}
                >
                  <Text style={{ fontWeight: 'bold' }}>{card.name}</Text>
                  <Text style={{ borderColor: currentCard?.id === card.id ? "000" : "none" }}>•••• •••• •••• {card.number.slice(-4)}</Text>
                  <View style={{ flexDirection: "row", gap: 32 }}>
                    <Text style={{ borderColor: currentCard?.id === card.id ? "000" : "none" }}>{card.expiry}</Text>
                    <Text style={{ borderColor: currentCard?.id === card.id ? "000" : "none" }}>{card.cvv}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDeleteCard(card.id)}
                  style={{ marginLeft: 16 }}
                >
                  <MaterialCommunityIcons name="trash-can-outline" size={24} color="red" />
                </TouchableOpacity>
              </Card>
            ))
          )
          }
        </View >
      </ScrollView >
    </BackgroundGradient >
  );
}