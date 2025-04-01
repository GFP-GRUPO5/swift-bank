import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import authReducer from './features/auth/authSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          REHYDRATE
        ],
      },
    }),
    devTools: process.env.NODE_ENV !== 'production'
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
