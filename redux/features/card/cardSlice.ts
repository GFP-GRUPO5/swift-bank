// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createNewCard } from './thunk/create-new-card';

// export interface ICreditCard {
//   id: string | null | undefined;
//   number: string | null;
//   name: string | null;
//   expiry: string | null;
//   cvv: string | null;
// }

// interface ICreditCardPartial extends Partial<ICreditCard> {
// }

// interface IInitialState {
//   cards: ICreditCard[];
//   card: ICreditCard | undefined | null;
//   loading: boolean;
//   error: null | {
//     hasError: boolean,
//     message: string
//   }
// }

// const initialState: IInitialState = {
//   cards: [],
//   card: undefined,
//   loading: false,
//   error: null
// };

// export const creditCardSlice = createSlice({
//   name: 'creditCard',
//   initialState,
//   reducers: {
//     addCard: (state, { payload }: PayloadAction<ICreditCard>) => {
//       state.cards.push(payload);
//     },
//     removeCard: (state, { payload: id }) => {
//       state.cards = state.cards.filter(card => card.id !== id);
//     },
//     updateCard: (state, { payload }: PayloadAction<ICreditCardPartial>) => {
//       const newCards = state.cards.map(card => {
//         if (card.id === payload.id) {
//           return {
//             ...card,
//             ...payload
//           }
//         }
//         return card;
//       })
//       state.cards = newCards;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createNewCard.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(createNewCard.fulfilled, (state, { payload }) => {
//         state.loading = false
//         state.card = payload
//       })
//       .addCase(createNewCard.rejected, (state, { payload }) => {
//         state.loading = false
//         state.error = {
//           hasError: true,
//           message: payload as string
//         }
//       })
//   }
// })

// export const { addCard, removeCard, updateCard } = creditCardSlice.actions;

// export default creditCardSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewCard } from './thunk/create-new-card';
import { fetchAllCards } from './thunk/fetch-all-cards';
import { fetchCardById } from './thunk/fetch-card-by-id';
import { deleteCard } from './thunk/delete-card';

export interface ICreditCard {
  id: string;
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  isActive?: boolean;
}

// interface ICreditCardPartial extends Partial<ICreditCard> { }

interface IInitialState {
  cards: ICreditCard[];
  card: ICreditCard | undefined | null;
  currentCard: ICreditCard | null;
  loading: boolean;
  error: {
    hasError: boolean;
    message: string;
  } | null;
}

const initialState: IInitialState = {
  cards: [],
  card: undefined,
  currentCard: null,
  loading: false,
  error: null
};

export const creditCardSlice = createSlice({
  name: 'creditCard',
  initialState,
  reducers: {
    setActiveCard: (state, { payload }: PayloadAction<string>) => {
      state.cards = state.cards.map(card => ({
        ...card,
        isActive: card.id === payload
      }));
      state.currentCard = state.cards.find(card => card.id === payload) || null;
    },
    clearCards: (state) => {
      state.cards = [];
      state.currentCard = null;
    }
  },
  extraReducers: (builder) => {
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
      });
  }
});

export const { setActiveCard, clearCards } = creditCardSlice.actions;
export default creditCardSlice.reducer;