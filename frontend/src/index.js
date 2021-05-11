import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import './shared/Axios.config';
import AppRouter from './Router';

import English from './lang/en.json';
import { IntlProvider } from 'react-intl';

const locale = navigator.language;

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={locale} messages={English}>
            <AppRouter />
        </IntlProvider>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
