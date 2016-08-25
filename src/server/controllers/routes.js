const todos = require('./todos');
const changeheaders = require('./changeheaders');

// Define handlers for application routes
module.exports = (app) => {
  app.get('/', todos.index);
  app.get('/todos', [changeheaders(), todos.all] );
  app.post('/todos', todos.create);
  app.put('/todos/:id', todos.update);
  app.delete('/todos/:id', todos.remove);
};
