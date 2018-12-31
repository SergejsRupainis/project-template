import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { makeSelectLocale } from './selectors';
import * as actions from './actions';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../../config';

export default function withLocaleSwitch(WrappedComponent) {
  const LocaleSwitch = class extends React.PureComponent {
    static propTypes = {
      switchLocale: PropTypes.func.isRequired,
    };

    switchLocale = newLocale => {
      const { switchLocale } = this.props;
      switchLocale(newLocale);
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          supportedLocales={[...SUPPORTED_LOCALES]}
          defaultLocale={DEFAULT_LOCALE}
          onChange={this.switchLocale}
        />
      );
    }
  };

  const mapStateToProps = createStructuredSelector({
    locale: makeSelectLocale(),
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        switchLocale: actions.switchLocale,
      },
      dispatch
    );

  return hoistNonReactStatics(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(LocaleSwitch),
    WrappedComponent
  );
}
