import { CardService } from '@/domains/cards/services/card.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCards } from './fetch-all-cards';

export const setActiveCard = createAsyncThunk(
  'creditCard/setActiveCard',
  async (cardId: string, { dispatch, rejectWithValue }) => {
    try {
      await CardService.setActiveCard(cardId);
      await dispatch(fetchAllCards());
      return cardId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);