interface IInitialState {
  credentials: {
    accessToken: string | null
  },
  loading: boolean
  user: any
}

export const initialState: IInitialState = {
  credentials: {
    accessToken: null
  },
  loading: false,
  user: {}
}