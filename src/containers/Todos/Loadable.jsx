import React from 'react';
import loadable from '@loadable/component';

// you may wnat to add prefetching: https://www.smooth-code.com/open-source/loadable-components/docs/prefetching/
export default loadable(() => import('./index'), {
  fallback: <div>Loading...</div>,
});
