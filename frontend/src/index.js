import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import './shared/axios.config';
import AppRouter from './components';
import LocaleWrapper from './lang/LocaleWrapper';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <LocaleWrapper>
                <AppRouter />
            </LocaleWrapper>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
