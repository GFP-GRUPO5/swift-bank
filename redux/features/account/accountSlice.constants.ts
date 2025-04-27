import { IAccountInitialState } from "./accountSlice.types";

export const accountSliceInitialState: IAccountInitialState = {
    loading: false,
    currentAccount: null,
    errors: null,
  }