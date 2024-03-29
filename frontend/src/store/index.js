import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user', 'users', 'settings'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

let middleware;
if (process.env.NODE_ENV === 'production') middleware = applyMiddleware(thunk);
else middleware = applyMiddleware(thunk, logger);

const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { store, persistor };

export const StoreProvider = (props) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>{props.children}</PersistGate>
        </Provider>
    );
};
