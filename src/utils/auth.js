export function isLoggedIn(user) {
  return !!user;
}

export function getUserRoles(user) {
  const userRoles = (user || {})['auth_user:roles'] || [];

  return typeof userRoles === 'string' ? [userRoles] : userRoles;
}

export function checkRoles(user, allowedRoles) {
  if (allowedRoles.length === 0) {
    return true;
  }
  const userIsLoggedIn = isLoggedIn(user);

  if (allowedRoles === 'all' && userIsLoggedIn) {
    return true;
  }
  if (allowedRoles === 'anonymous' && !userIsLoggedIn) {
    return true;
  }

  return getUserRoles(user).some(role => allowedRoles.includes(role));
}

export const ROLES_PROPERTY_NAME = 'auth_user:roles';
