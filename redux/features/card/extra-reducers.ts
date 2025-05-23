import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ICardSliceInitialState } from "./cart-slice.types";
import { createNewCard } from "./thunk/create-new-card";
import { deleteCard } from "./thunk/delete-card";
import { fetchAllCards } from "./thunk/fetch-all-cards";
import { fetchCardById } from "./thunk/fetch-card-by-id";
import { setActiveCard } from "./thunk/set-active-card";

export function cardExtraFunctions(builder: ActionReducerMapBuilder<ICardSliceInitialState>) {
  builder
    .addCase(createNewCard.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createNewCard.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.cards = [...state.cards, payload];
      state.currentCard = payload;
    })
    .addCase(createNewCard.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = {
        hasError: true,
        message: payload as string
      };
    })
    .addCase(fetchAllCards.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllCards.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.cards = payload;
      state.currentCard = payload.find(card => card.isActive) || payload[0] || null;
    })
    .addCase(fetchAllCards.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = {
        hasError: true,
        message: payload as string
      };
    })
    .addCase(fetchCardById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCardById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.currentCard = payload;
    })
    .addCase(fetchCardById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = {
        hasError: true,
        message: payload as string
      };
    })
    .addCase(deleteCard.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteCard.fulfilled, (state, { payload: cardId }) => {
      state.loading = false;
      state.cards = state.cards.filter(card => card.id !== cardId);

      if (state.currentCard?.id === cardId) {
        state.currentCard = state.cards.length > 0 ? state.cards[0] : null;
      }
    })
    .addCase(deleteCard.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = {
        hasError: true,
        message: payload as string
      };
    })
    .addCase(setActiveCard.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(setActiveCard.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.cards = state.cards.map(card => ({
        ...card,
        isActive: card.id === payload
      }));
      state.currentCard = state.cards.find(card => card.id === payload) || null;
    })
    .addCase(setActiveCard .rejected, (state, { payload }) => {
      state.loading = false;
      state.error = {
        hasError: true,
        message: payload as string
      };
    });
}
