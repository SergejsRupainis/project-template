import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import * as actions from './actions';
import {
  makeSelectUser,
  makeSelectSessionRequiresChecking,
  makeSelectIsLoggedIn,
} from './selectors';

import Todos from '../Todos/Loadable';
import LocaleResolver from '../LocaleProvider/LocaleResolver';

const DefaultLocaleResolver = props => (
  <LocaleResolver {...props} defaultPage="todos" />
);

const App = ({ sessionRequiresChecking, isLoggedIn }) => (
  <div role="main">
    {sessionRequiresChecking && <div>Loading user info ...</div>}
    <div>Is logged in: {JSON.stringify(isLoggedIn)}</div>
    <React.Fragment>
      <Route exact path="/" component={DefaultLocaleResolver} />
      <Route path="/:locale" component={DefaultLocaleResolver} />
      {!sessionRequiresChecking && (
        <Switch>
          <Route exact path="/:locale/todos" component={Todos} />
        </Switch>
      )}
    </React.Fragment>
  </div>
);

App.propTypes = {
  sessionRequiresChecking: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  // user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  // user: null,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  sessionRequiresChecking: makeSelectSessionRequiresChecking(),
  isLoggedIn: makeSelectIsLoggedIn(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserInfo: actions.fetchUserInfoIfNeeded,
    },
    dispatch
  );

const frontload = async props => props.fetchUserInfo();

const FrontloadApp = frontloadConnect(frontload, {
  onMount: true,
  onUpdate: false,
})(App);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const appReducer = injectReducer({
  key: 'app',
  reducer,
});

export default compose(
  appReducer,
  withConnect
)(FrontloadApp);
