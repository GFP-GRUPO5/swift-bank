interface IInitialState {
  credentials: {
    accessToken: string | null
  },
  loading: boolean
}

export const initialState: IInitialState = {
  credentials: {
    accessToken: null
  },
  loading: false,
}