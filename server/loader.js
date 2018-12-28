import path from 'path';
import fs from 'fs';

import history from '../src/utils/history';
import configureStore from '../src/store/configureStore';

export default (req, res) => {
  // Load in our HTML file from our build

  fs.readFile(
    path.resolve(__dirname, '../build/index.html'),
    'utf8',
    (err, htmlData) => {
      // If there's an error... serve up something nasty
      if (err) {
        console.error('Read error', err);

        return res.status(404).end();
      }

      // Create a store (with a memory history) from our current url. Full url should be provided.
      const initialState = {};
      const store = configureStore(initialState, history);

      console.log(store);
    }
  );
};
