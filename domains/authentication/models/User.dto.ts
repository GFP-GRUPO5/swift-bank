export interface UserDTO {
  id: string
  name: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
}

/**
 * @field id: string
 * @field name: string
 * @field lastName: string
 * @field email: string
 */
export interface CreateUserDOT {
  id: string
  name: string
  lastName: string
  email: string
}

export interface UpdateAuthUserDTO {
  displayName: string
  email: string
}