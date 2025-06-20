import { ICardSliceInitialState } from "./cart-slice.types";

export const cardSliceInitialState: ICardSliceInitialState = {
  cards: [],
  card: undefined,
  currentCard: null,
  loading: false,
  error: null
};
