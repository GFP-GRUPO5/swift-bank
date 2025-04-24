import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICreditCard {
  id: string | null | undefined;
  number: string | null;
  name: string | null;
  expiry: string | null;
  cvv: string | null;
}

interface ICreditCardPartial extends Partial<Omit<ICreditCard, "id">> {
  id: string
}

interface IInitialState {
  cards: ICreditCard[];
}

const initialState: IInitialState = {
  cards: []
};

export const creditCardSlice = createSlice({
  name: 'creditCard',
  initialState,
  reducers: {
    addCard: (state, { payload }: PayloadAction<ICreditCard>) => {
      state.cards.push(payload);
    },
    removeCard: (state, { payload: id }) => {
      state.cards = state.cards.filter(card => card.id !== id);
    },
    updateCard: (state, { payload }: PayloadAction<ICreditCardPartial>) => {
      const newCards = state.cards.map(card => {
        if (card.id === payload.id) {
          return {
            ...card,
            ...payload
          }
        }
        return card;
      })
      state.cards = newCards;
    }
  }
})

export const { addCard, removeCard, updateCard } = creditCardSlice.actions;

export default creditCardSlice.reducer;