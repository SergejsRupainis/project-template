import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider, addLocaleData } from 'react-intl';
import areIntlLocalesSupported from 'intl-locales-supported';
import Intl from 'intl';

import en from 'react-intl/locale-data/en';
import fi from 'react-intl/locale-data/fi';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fi';

import { SUPPORTED_LANGUAGES } from '../../config';

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported([...SUPPORTED_LANGUAGES])) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    global.Intl.NumberFormat = Intl.NumberFormat;
    global.Intl.DateTimeFormat = Intl.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = Intl;
}

[en, fi].forEach(addLocaleData);

class LanguageProvider extends React.PureComponent {
  static propTypes = {
    locale: PropTypes.string,
    messages: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.element.isRequired,
  };

  static defaultProps = {
    locale: 'en',
    messages: { 'home.hello': 'Hello my dear friend!' },
  };

  render() {
    const { locale, messages, children } = this.props;

    return (
      <React.Fragment>
        <Helmet htmlAttributes={{ lang: locale }} />
        <IntlProvider
          locale={locale}
          key={locale}
          messages={messages}
          textComponent={React.Fragment}
        >
          {React.Children.only(children)}
        </IntlProvider>
      </React.Fragment>
    );
  }
}

export default LanguageProvider;
