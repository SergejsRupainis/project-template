import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

import isServer from './isServer';
import packageJson from '../../package.json';

const history = isServer()
  ? createMemoryHistory()
  : createBrowserHistory({ basename: packageJson.homepage });

export default history;
