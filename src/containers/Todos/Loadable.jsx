import React from 'react';
import loadable from '@loadable/component';

export default loadable(() => import('./Todos'), {
  fallback: <div>Loading...</div>,
});
