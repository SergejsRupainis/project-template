import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import { makeSelectLocale } from './selectors';

class LanguageProvider extends React.PureComponent {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.element.isRequired,
  };

  static defaultProps = {};

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

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

const withConnect = connect(mapStateToProps);

const localeReducer = injectReducer({
  key: 'locale',
  reducer,
});

export default compose(
  localeReducer,
  withConnect
)(LanguageProvider);
