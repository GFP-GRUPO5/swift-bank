export interface TransactionDTO {
  id: string | number
  cardId: string | number
  categoryId: string | number
  type: 'income' | 'outcome'
  value: number
  createdAt: Date
  updatedAt: Date
}
