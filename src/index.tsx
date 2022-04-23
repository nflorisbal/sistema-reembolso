import ReactDOM from 'react-dom/client';
import Router from './router';
import {store, persistor} from './store';
import { Provider } from 'react-redux';

import { GlobalStyle } from './global.styles';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <GlobalStyle />
    <Router />
    </PersistGate>
  </Provider>
);
