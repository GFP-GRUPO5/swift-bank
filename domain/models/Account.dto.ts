export interface CreateAccountDTO {
  userId: string
  currentAmmount: number
  accountType: 'savings' | 'debit'
  createdAt: Date
  updatedAt: Date
}
