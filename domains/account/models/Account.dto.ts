export type AccountType = 'savings' | 'debit'

export interface CreateAccountDTO {
  userId: string
  currentAmmount: number
  accountType: AccountType
  createdAt: Date
  updatedAt: Date
}

export interface UpdateAccountDTO extends Partial<CreateAccountDTO> { }

export interface IAccount extends CreateAccountDTO { }