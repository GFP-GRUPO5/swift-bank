import { createSlice } from '@reduxjs/toolkit';
import { cardSliceInitialState } from './card.constants';
import { cardExtraFunctions } from './extra-reducers';

export const creditCardSlice = createSlice({
  name: 'creditCard',
  initialState: cardSliceInitialState,
  reducers: {
    clearCards: (state) => {
      state.cards = [];
      state.currentCard = null;
    }
  },
  extraReducers: cardExtraFunctions,
});

export const { clearCards } = creditCardSlice.actions;
export default creditCardSlice.reducer;
