import { CardService } from "@/domains/cards/services/card.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteCard = createAsyncThunk(
  "card/deleteCard",
  async (cardId: string, { rejectWithValue }) => {
    try {
      await CardService.deleteCard(cardId);
      return cardId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Erro ao deletar cartão");
    }
  }
);