import { IAccount } from "@/modules/account/models/Account.dto"

export interface IAccountInitialState {
  loading: boolean
  currentAccount: IAccount | null
  errors: any
  accountChartData: IChartData[] | null
}

export interface IChartData {
  name: string
  total: number
  color: string
  legendFontColor: string
  legendFontSize: number
}
