import { legacy_createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'],
  blacklist: ['list'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(pReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
