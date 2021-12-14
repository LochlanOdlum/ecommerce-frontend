import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import reducers from './reducers';

const persistConfig = {
  key: 'reduxPersist',
  storage: storage,
  whitelist: ['cart', 'auth'], // which reducer want to store
};

const pReducer = persistReducer(persistConfig, reducers);

// const store = createStore(reducers, applyMiddleware(thunk));
export const store = createStore(pReducer, composeWithDevTools(applyMiddleware(thunk)));

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
);
