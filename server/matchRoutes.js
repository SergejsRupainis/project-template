import { matchPath } from 'react-router';

/**
 * Returns array of matched routes. Supports only one level of routes.
 * @param {string} url
 * @param {array} routes
 */
function matchRoutes(url, routes) {
  const matchedRoutes = routes.reduce((accumulator, route) => {
    if (route.type === 'switch') {
      const matchedRoute = route.routes.find(switchRoute => {
        switchRoute.match = matchPath(url, switchRoute);
        return switchRoute.match;
      });

      if (matchedRoute) {
        accumulator.push(matchedRoute);
      }
    } else {
      route.match = matchPath(url, route);
      if (route.match) {
        accumulator.push(route);
      }
    }

    return accumulator;
  }, []);

  return matchedRoutes;
}

export default matchRoutes;
