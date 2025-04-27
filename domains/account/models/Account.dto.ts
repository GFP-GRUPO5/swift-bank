export type AccountType = 'savings' | 'debit'

export interface CreateAccountDTO {
  userId: string
  currentAmount: number
  accountType: AccountType
  createdAt: Date
  updatedAt: Date
  statements: any[]
}

export interface UpdateAccountDTO extends Partial<CreateAccountDTO> { }

export interface IAccount extends CreateAccountDTO {
  id: string
}