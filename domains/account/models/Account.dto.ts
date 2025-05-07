export type AccountType = 'savings' | 'debit'

export interface CreateAccountDTO {
  userId: string
  currentAmount: number
  accountType: AccountType
  createdAt: string
  updatedAt: string
  statements: any[]
}

export interface UpdateAccountDTO extends Partial<CreateAccountDTO> { }

export interface IAccount extends CreateAccountDTO {
  id: string
}