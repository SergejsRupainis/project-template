import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';

class LanguageProvider extends React.PureComponent {
  static propTypes = {
    locale: PropTypes.string,
    messages: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.element.isRequired,
  };

  static defaultProps = {
    locale: 'en',
  };

  render() {
    const { locale, messages, children } = this.props;

    return (
      <React.Fragment>
        <Helmet htmlAttributes={{ lang: locale }} />
        <IntlProvider
          locale={locale}
          key={locale}
          messages={messages[locale]}
          textComponent={React.Fragment}
        >
          {React.Children.only(children)}
        </IntlProvider>
      </React.Fragment>
    );
  }
}

export default LanguageProvider;
