export interface CardDTO {
  id: string | number
  userId: string
  lastFourDigits: string
  flag: string
  expeditionDate: Date
  color: string
  type: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateCardDTO extends Partial<CardDTO>{}