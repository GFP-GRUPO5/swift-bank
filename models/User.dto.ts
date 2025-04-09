export interface UserDTO {
  id: string | number
  name: string
  lastName: string
  age: number
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDOT {
  name: string
  lastName: string
  age: number
  email: string
}

export interface FEUserDOT extends Partial<UserDTO> { }
