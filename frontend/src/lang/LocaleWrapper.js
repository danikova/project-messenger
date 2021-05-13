import React, { useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';

import Hungarian from './hu.json';
import English from './en.json';
import { getCookie, setCookie } from '../shared/cookie.service';

const LANG_COOKIE = 'lang.cookie';

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

const LangContext = React.createContext();

const local = getCookie(LANG_COOKIE) || navigator.language.substring(0, 2);

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
        setCookie(LANG_COOKIE, newLocale);
        setLocale(newLocale);
        if (newLocale === 'en') {
            setMessages(English);
        } else {
            setMessages(Hungarian);
        }
    }

    return (
        <LangContext.Provider value={{ locale, selectLanguage }}>
            <IntlProvider messages={messages} locale={locale}>
                {props.children}
            </IntlProvider>
        </LangContext.Provider>
    );
};

export default LocaleWrapper;

export function useLocale(){
    const context = useContext(LangContext);
    return {
        locale: context.locale,
        selectLanguage: context.selectLanguage,
    };
}