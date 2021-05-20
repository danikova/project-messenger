import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './shared/axios.config';
import AppRouter from './components';
import LocaleWrapper from './lang/LocaleWrapper';
import { StoreProvider } from './store';

ReactDOM.render(
    <StoreProvider>
        <LocaleWrapper>
            <AppRouter />
        </LocaleWrapper>
    </StoreProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
