import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import './index.scss';
import App from './App/App';
import store from './store';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
