import { CardService } from "@/modules/cards/infrastructure/services/card.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreditCard } from "../../models/card";

export const createNewCard = createAsyncThunk(
  "card/createNewCard",
  async (newCreditCard: ICreditCard, { rejectWithValue }) => {
    try {
      return await CardService.createNewCard(newCreditCard)
    }
    catch (error) {
      return rejectWithValue(error)
    }
  }
)
