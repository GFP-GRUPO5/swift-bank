import { CreateStatementDTO } from "@/modules/account/types/statements.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccountService } from "../../infrastructure/services/account.service";

export const addStatement = createAsyncThunk(
  'account/addStatement',
  async (data: { accountId: string, statement: CreateStatementDTO }, { rejectWithValue }) => {
    try {
      const { accountId, statement } = data
      return await AccountService.updateStatement(accountId, statement)
    } catch (error) {
      throw new Error('Erro criando um extrato')
    }
  }
)
