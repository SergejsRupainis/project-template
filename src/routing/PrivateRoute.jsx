import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Route that will redirect to login page if a user is not authenticated
 */
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

PrivateRoute.defaultProps = {
  location: undefined,
};

export default PrivateRoute;
