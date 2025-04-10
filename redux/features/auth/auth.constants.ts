interface IInitialState {
  credentials: {
    accessToken: string | null
  }
}

export const initialState: IInitialState = {
  credentials: {
    accessToken: null
  }
}