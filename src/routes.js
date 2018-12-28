import Todos from './containers/Todos/Loadable';

/**
 * Global site routes
 */
const routes = [
  {
    key: 'switch',
    type: 'switch',
    routes: [
      {
        key: 'home',
        path: '/',
        exact: true,
        component: Todos,
      },
    ],
  },
];

export default routes;
