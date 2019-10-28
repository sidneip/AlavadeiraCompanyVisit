import React from 'react';

import '~/config/ReactotronConfig';

import { Provider } from 'react-redux';
import {store, persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react'

import Routes from '~/routes';

import { setNavigator } from './services/navigation'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes ref={setNavigator}  />
    </PersistGate>
  </Provider>
);

export default App;
