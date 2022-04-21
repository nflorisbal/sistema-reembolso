import { legacy_createStore, compose } from 'redux';
import rootReducer from './reducers';

//#region Redux DevTools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//#endregion Redux DevTools

const store = legacy_createStore(rootReducer, composeEnhancers());

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;