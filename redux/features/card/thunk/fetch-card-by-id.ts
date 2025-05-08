import { CardService } from "@/domains/cards/services/card.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCardById = createAsyncThunk(
  "card/fetchCardById",
  async (cardId: string, { rejectWithValue }) => {
    try {
      return await CardService.fetchCardById(cardId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Erro ao buscar cartão");
    }
  }
);