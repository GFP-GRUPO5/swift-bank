import { CardService } from "@/modules/cards/infrastructure/services/card.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCards = createAsyncThunk(
  "card/fetchAllCards",
  async (_, { rejectWithValue }) => {
    try {
      return await CardService.fetchCards();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Erro ao buscar cartões");
    }
  }
);
