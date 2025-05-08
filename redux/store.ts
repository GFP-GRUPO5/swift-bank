import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import accountReducer from './features/account/account-slice';
import authReducer from './features/auth/auth-slice';
import cardReducer from './features/card/card-slice';
import notificationReducer from './features/notifications/notifications-slice';
import usersReducer from './features/user/user-slice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer = combineReducers({
  auth: authReducer,
  card: cardReducer,
  account: accountReducer,
  user: usersReducer,
  notification: notificationReducer,
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
