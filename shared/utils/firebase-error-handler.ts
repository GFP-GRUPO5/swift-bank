import { FirebaseError } from "firebase/app";

export function getFirebaseErrorMessage(error: FirebaseError): string {
  let message: string

  switch (error.code) {
    case 'auth/invalid-email':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      message = 'Email ou senha inválidos'
      break
    case 'auth/user-disabled':
      message = 'Usuário não habilitado'
      break
    case 'auth/user-not-found':
      message = 'Usuário não encontrado'
      break
    case 'auth/too-many-requests':
      message = 'Erro no sistema'
      break
    default:
      message = 'Erro não conhecido'
  }

  return message
}