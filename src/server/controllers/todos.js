const Todo = require('../models/todo');

// Render home page
exports.index = (request, response) => {
  response.render('index', {
    env: process.env.NODE_ENV
  });
};

// Fetch all TODOs
exports.all = (request, response) => {
  Todo.findAll({
    limit: 1000,
    order: [ ['createdAt', 'ASC'] ]
  }).then((todos) => {
    response.send(todos);
  }).catch((error) => {
    response.status(500).send(error);
  });
};

// Update a TODO
exports.update = (request, response) => {
  Todo.findById(request.param('id')).then((todo) => {
    if (!todo) return response.status(404);
    todo.title = request.body.title;
    todo.completed = !todo.completed;
    return todo.save();
  }).then((todo) => {
    response.send(todo);
  }).catch((error) => {
    response.status(500).send(error);
  });
};

// Create a TODO
exports.create = (request, response) => {
  Todo.create({
    title: request.body.title,
    completed: false
  }).then((todo) => {
    response.send(todo);
  }).catch((error) => {
    response.status(500).send(error);
  });
};

exports.remove = (request, response) => {
  Todo.destroy({
    where: {
      id: request.param('id')
    }
  }).then(() => {
    response.send();
  }).catch((error) => {
    response.status(500).send(error);
  });
};
