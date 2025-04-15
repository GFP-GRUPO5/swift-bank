import { UserDTO } from "@/domain/models/User.dto"

interface IInitialState {
  credentials: {
    accessToken: string | null
  },
  loading: boolean
  user: UserDTO | null
  errors: any
}

export const initialState: IInitialState = {
  credentials: {
    accessToken: null
  },
  loading: false,
  user: null,
  errors: null,
}