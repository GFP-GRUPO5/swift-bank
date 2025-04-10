export interface UserDTO {
  id: string | number
  name: string
  lastName: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDOT {
  name: string
  lastName: string
  email: string
}

export interface FEUserDOT extends Partial<UserDTO> { }
