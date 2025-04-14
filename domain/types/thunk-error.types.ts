interface CustomThunkError {
  message: string
}

export interface IThunkError {
  hasError: boolean
  error: CustomThunkError
}
