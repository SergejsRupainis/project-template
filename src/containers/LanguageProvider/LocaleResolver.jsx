import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { frontloadConnect } from 'react-frontload';

import { makeSelectLocale } from './selectors';
import * as actions from './actions';

class LocaleResolver extends React.Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
  };

  render() {
    return null;
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocaleResolver);
