const todos = require('./todos');

// Define handlers for application routes
module.exports = (app) => {
  app.get('/', todos.index);
  app.get('/todos', todos.all);
  app.post('/todos', todos.create);
  app.put('/todos/:id', todos.update);
  app.delete('/todos/:id', todos.remove);
};
