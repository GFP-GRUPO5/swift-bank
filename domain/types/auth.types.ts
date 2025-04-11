export interface CreateAuthUserDTO {
  email: string
  name: string
  lastName: string
  password: string
}

export interface SignInUserDTO {
  email: string
  password: string
}
