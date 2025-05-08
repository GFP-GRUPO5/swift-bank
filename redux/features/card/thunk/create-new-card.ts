import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreditCard } from "../cardSlice";
import { CardService } from "@/domains/cards/services/card.service";

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
