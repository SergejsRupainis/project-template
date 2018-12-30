/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 */

import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import fiLocaleData from 'react-intl/locale-data/fi';
import areIntlLocalesSupported from 'intl-locales-supported';

import enTranslationMessages from '../translations/en';
import fiTranslationMessages from '../translations/fi';
import { SUPPORTED_LOCALES } from '../config';

[enLocaleData, fiLocaleData].forEach(addLocaleData);

export const translationMessages = {
  en: enTranslationMessages,
  fi: fiTranslationMessages,
};

const loadIntlPolyfill = async () => {
  const Intl = await import('intl');

  await import('intl/locale-data/jsonp/en.js');
  await import('intl/locale-data/jsonp/de.js');

  return Intl;
};

export async function setupLocalization() {
  if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported([...SUPPORTED_LOCALES])) {
      // `Intl` exists, but it doesn't have the data we need, so load the
      // polyfill and patch the constructors we need with the polyfill's.
      const Intl = await loadIntlPolyfill();
      global.Intl.NumberFormat = Intl.NumberFormat;
      global.Intl.DateTimeFormat = Intl.DateTimeFormat;
    }
  } else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = await loadIntlPolyfill();
  }

  return translationMessages;
}
