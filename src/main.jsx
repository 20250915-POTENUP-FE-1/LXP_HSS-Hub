import { createRoot } from 'react-dom/client';
import './index.css';
// import './assets/styles/variables.css';
// import './assets/styles/font.css';
// import './assets/styles/responsive.css';

import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
