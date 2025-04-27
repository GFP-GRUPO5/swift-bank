import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import accountReducer from './features/account/accountSlice';
import authReducer from './features/auth/authSlice';
import cardReducer from './features/card/cardSlice';
import usersReducer from './features/user/userSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  auth: authReducer,
  card: cardReducer,
  account: accountReducer,
  user: usersReducer
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
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
