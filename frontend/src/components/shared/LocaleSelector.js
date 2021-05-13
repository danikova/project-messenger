import React from 'react';
import { Select } from 'react95';
import { useLocale } from '../../lang/LocaleWrapper';


export function LocaleSelector() {
    const { locale, selectLanguage } = useLocale();

    const options = [
        { value: 'hu', label: '🇭🇺' },
        { value: 'en', label: '🇬🇧' },
    ];

    return (
        <Select
            defaultValue={locale}
            options={options}
            onChange={selectLanguage} />
    );
}
