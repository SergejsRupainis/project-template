import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { checkRoles } from 'utils/auth';

import { makeSelectUser, makeSelectIsLoggedIn } from './selectors';

const AccessControl = ({
  children,
  renderNoAccess,
  accessCheck,
  user,
  allowedRoles,
}) => {
  let permitted;

  // when an accessCheck function is provided, ensure that passes as well as the roles
  if (accessCheck) {
    permitted = accessCheck(user) && checkRoles(user, allowedRoles);
  } else {
    // otherwise only check permissions
    permitted = checkRoles(user, allowedRoles);
  }

  if (permitted) {
    return children;
  }
  return renderNoAccess();
};

AccessControl.defaultProps = {
  allowedRoles: [],
  renderNoAccess: () => null,
};

export default connect(
  createStructuredSelector({
    user: makeSelectUser(),
    isLoggedIn: makeSelectIsLoggedIn(),
  })
)(AccessControl);
