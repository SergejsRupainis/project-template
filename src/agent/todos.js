export default {
  getList: listId =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (listId === 0) {
          reject(new Error('Sample error'));
        } else {
          resolve([
            { name: '54tr', completed: false },
            { name: 'dfgsdfs', completed: true },
            { name: 'sdfsdf', completed: true },
            { name: 'sdfs', completed: false },
          ]);
        }
      }, 3000);
    }),
};
