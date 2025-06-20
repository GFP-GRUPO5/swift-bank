export interface CreateStatementDTO {
  value: number
  type: string
  category: string
  createdAt: string
}

export interface IStatement extends CreateStatementDTO {
  id: string
}