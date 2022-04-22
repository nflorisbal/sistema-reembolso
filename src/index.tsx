import ReactDOM from 'react-dom/client';
import Router from './router';
import store from './store';
import { Provider } from 'react-redux';

import { GlobalStyle } from './global.styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router />
  </Provider>
);
