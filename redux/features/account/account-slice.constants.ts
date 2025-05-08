import { IAccountInitialState } from "./account-slice.types";

export const accountSliceInitialState: IAccountInitialState = {
    loading: false,
    currentAccount: null,
    errors: null,
  }