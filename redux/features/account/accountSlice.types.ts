import { IAccount } from "@/domains/account/models/Account.dto"

export interface IAccountInitialState {
    loading: boolean
    currentAccount: IAccount | null
    errors: any
  }