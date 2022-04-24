import { legacy_createStore, compose } from 'redux';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { AuthDTO } from '../models/AuthDTO';
import { WebStorage } from 'redux-persist/lib/types';


const persistConfig = {
  key: 'root',
  storage: storage,
};


const pReducer = persistReducer(persistConfig, rootReducer);

//#region Redux DevTools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//#endregion Redux DevTools

export const store = legacy_createStore(pReducer, composeEnhancers());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store)