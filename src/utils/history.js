import createHistory from 'history/createBrowserHistory';

import packageJson from '../../package.json';

const history = createHistory({ basename: packageJson.homepage });

export default history;
