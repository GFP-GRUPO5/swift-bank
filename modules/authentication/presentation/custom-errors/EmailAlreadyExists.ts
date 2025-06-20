export class EmailAlreadyExistsError extends Error {
  constructor() {
    super()
    this.message = 'Email already exists'
  }
}