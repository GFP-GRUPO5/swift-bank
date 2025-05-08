export class UnauthenticatedError extends Error {
  constructor() {
    super('Usuário não encontrado')
  }
}
