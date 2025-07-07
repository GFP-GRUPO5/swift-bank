export interface CreateUserDTO {
  id: string
  name: string
  email: string
}

export interface UserData extends CreateUserDTO {
  createdAt: string
}