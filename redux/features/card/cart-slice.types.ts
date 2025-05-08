import { ICreditCard } from "@/domains/cards/models/card";

export interface ICardSliceInitialState {
  cards: ICreditCard[];
  card: ICreditCard | undefined | null;
  currentCard: ICreditCard | null;
  loading: boolean;
  error: {
    hasError: boolean;
    message: string;
  } | null;
}
