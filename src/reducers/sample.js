export default (
  state = {
    title: 'bac',
    visibilityFilter: 'SHOW_ACTIVE',
    todos: [
      { name: 'test', completed: false },
      { name: 'test2', completed: true },
      { name: 'test3', completed: true },
      { name: 'test4', completed: false },
    ],
  }
) => state;
