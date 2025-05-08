import { cardDetailsStyle } from '@/domains/authentication/styles/CardDetails.styles';
import { CreditDebitCard } from '@/domains/cards/components/credit-debit-card/CreditDebitCard';
import { deleteCard } from '@/redux/features/card/thunk/delete-card';
import { fetchAllCards } from '@/redux/features/card/thunk/fetch-all-cards';
import { setActiveCard } from '@/redux/features/card/thunk/set-active-card';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AppHeader } from '@/shared/components/app-header/AppHeader';
import { HeaderGoBackButton } from '@/shared/components/header-go-back-button/HeaderGoBackButton';
import { IconSwiftBankLogo } from '@/shared/icons/IconSwiftBankLogo';
import { BackgroundGradient } from '@/shared/templates/background-gradient/BackgroundGradient';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Dialog from 'react-native-dialog';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { cards, currentCard, loading, error } = useAppSelector(state => state.card);

  const [selectDialogVisible, setSelectDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllCards());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  function openSelectDialog(cardId: string) {
    setSelectedCardId(cardId);
    setSelectDialogVisible(true);
  };

  function confirmSelectCard() {
    if (selectedCardId) {
      dispatch(setActiveCard(selectedCardId));
    }
    setSelectDialogVisible(false);
  };

  function openDeleteDialog(cardId: string) {
    setSelectedCardId(cardId);
    setDeleteDialogVisible(true);
  };

  function confirmDeleteCard() {
    if (selectedCardId) {
      dispatch(deleteCard(selectedCardId));
    }
    setDeleteDialogVisible(false);
  };

  return (
    <BackgroundGradient>
      <AppHeader
        style={{ paddingTop: 16, borderBottomWidth: 1 }}
        leftContent={<HeaderGoBackButton />}
        rigthContent={<IconSwiftBankLogo />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={cardDetailsStyle.title}>Meus Cartões</Text>
          {loading && !cards.length ? (
            <Text>Carregando cartões...</Text>
          ) : cards.length === 0 ? (
            <Text>Nenhum cartão cadastrado</Text>
          ) : (
            cards.map(card => (
              <CreditDebitCard
                card={card}
                currentCardId={currentCard?.id!}
                openDeleteDialog={() => openDeleteDialog(card.id)}
                openSelectDialog={() => openSelectDialog(card.id)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <Dialog.Container visible={selectDialogVisible}>
        <Dialog.Title>Selecionar Cartão</Dialog.Title>
        <Dialog.Description>Quer visualizar este cartão na tela inicial?</Dialog.Description>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Dialog.Button style={{ backgroundColor: "#2C2C2C", padding: 16, borderRadius: 24, color: "#FFF", fontWeight: "700" }} label="Cancelar" onPress={() => setSelectDialogVisible(false)} />
          <Dialog.Button style={{ backgroundColor: "#2C2C2C", padding: 16, borderRadius: 24, color: "#FFF", fontWeight: "700" }} label="Selecionar" onPress={confirmSelectCard} />
        </View>
      </Dialog.Container>

      <Dialog.Container visible={deleteDialogVisible}>
        <Dialog.Title>Remover Cartão</Dialog.Title>
        <Dialog.Description>Tem certeza que deseja remover este cartão?</Dialog.Description>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Dialog.Button style={{ backgroundColor: "#2C2C2C", padding: 16, borderRadius: 24, color: "#FFF", fontWeight: "700" }} label="Cancelar" onPress={() => setDeleteDialogVisible(false)} />
          <Dialog.Button style={{ backgroundColor: "#2C2C2C", padding: 16, borderRadius: 24, color: "#FFF", fontWeight: "700" }} label="Remover" onPress={confirmDeleteCard} />
        </View>
      </Dialog.Container>
    </BackgroundGradient>
  );
}
