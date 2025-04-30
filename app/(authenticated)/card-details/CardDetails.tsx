import { cardDetailsStyle } from '@/domains/authentication/styles/CardDetails.styles';
import { deleteCard } from '@/redux/features/card/thunk/delete-card';
import { fetchAllCards } from '@/redux/features/card/thunk/fetch-all-cards';
import { setActiveCard } from '@/redux/features/card/thunk/set-activate-card';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AppHeader } from '@/shared/components/app-header/AppHeader';
import { HeaderGoBackButton } from '@/shared/components/header-go-back-button/HeaderGoBackButton';
import { BackgroundGradient } from '@/shared/templates/background-gradient/BackgroundGradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useEffect } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';


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
    Alert.alert(
      "Selecionar Cartão",
      "Quer visualizar este cartão na tela inicial?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Selecionar",
          onPress: () => {
            dispatch(setActiveCard(cardId));
          }
        }
      ]
    );
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
        style={cardDetailsStyle.header}
        leftContent={<HeaderGoBackButton isModal />}
        centerContent='Meus cartões'
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={cardDetailsStyle.title}>Meus Cartões</Text>
          {loading && !cards.length ? (
            <Text>Carregando cartões...</Text>
          ) : cards.length === 0 ? (
            <Text>Nenhum cartão cadastrado</Text>
          ) : (
            cards.map(card => {
              const isSelected = currentCard?.id === card.id;
              return (
                <View
                  key={card.id}
                  style={[cardDetailsStyle.cardContainer, isSelected && cardDetailsStyle.selectedCard]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[cardDetailsStyle.text, isSelected && cardDetailsStyle.selectedText]}>{card.name}</Text>
                    <Text style={[cardDetailsStyle.text, isSelected && cardDetailsStyle.selectedText]}>•••• •••• •••• {card.number.slice(-4)}</Text>
                    <View style={cardDetailsStyle.info}>
                      <Text style={[cardDetailsStyle.text, isSelected && cardDetailsStyle.selectedText]}>{card.expiry}</Text>
                      <Text style={[cardDetailsStyle.text, isSelected && cardDetailsStyle.selectedText]}>{card.cvv}</Text>
                    </View>
                  </View>
                  <View style={cardDetailsStyle.buttons}>
                    <TouchableOpacity onPress={() => handleSelectCard(card.id)}>
                      <MaterialCommunityIcons
                        name={isSelected ? "check-circle" : "checkbox-blank-circle-outline"}
                        size={24}
                        color={isSelected ? "#4CAF50" : "#888"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteCard(card.id)}>
                      <MaterialCommunityIcons name="trash-can-outline" size={24} color="#F4442E" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </BackgroundGradient>
  );
}