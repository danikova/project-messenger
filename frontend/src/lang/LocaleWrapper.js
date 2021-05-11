import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import Hungarian from './hu.json';
import English from './en.json';

const checkMessageKeys = () => {
    const hungariankeys = Object.keys(Hungarian);
    const englishkeys = Object.keys(English);
    let difference = hungariankeys
        .filter((x) => !englishkeys.includes(x))
        .concat(englishkeys.filter((x) => !hungariankeys.includes(x)));

    if (difference.length !== 0) {
        console.log(difference);
        throw new Error('missing message keys in: ./lang/*');
    }
};
checkMessageKeys();

export const Context = React.createContext();

const local = navigator.language;

let lang;
if (local === 'en') {
    lang = English;
} else {
    lang = Hungarian;
}

const LocaleWrapper = (props) => {
    const [locale, setLocale] = useState(local);
    const [messages, setMessages] = useState(lang);

    function selectLanguage(e) {
        const newLocale = e.target.value;
        setLocale(newLocale);
        if (local === 'en') {
            setMessages(English);
        } else {
            setMessages(Hungarian);
        }
    }

    return (
        <Context.Provider value={{ locale, selectLanguage }}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </Context.Provider>
    );
};

export default LocaleWrapper;
