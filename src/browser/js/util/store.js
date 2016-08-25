'use strict';

var $ = require('jquery')

module.exports = {
  // Fetch todos from server
  fetch(callback) {
    $.ajax('/todos').done(function(data) {
      callback(null, data);
    }).fail(function(xhr, status, error) {
      callback(error);
    });
  },

  // Save list of todos on the server
  save(todos, callback) {
    todos.forEach(function(todo) {
      if (!todo.id) {
        // new Todo!
        $.ajax('/todos', {
          method: 'POST',
          data: {
            title: todo.title
          }
        }).done(function(data) {
          todo.id = data.id;
          callback(null);
        }).fail(function(xhr, status, error) {
          callback(error);
        });
      } else if (todo.id && todo.modified) {
        // update 
        $.ajax('/todos/'+todo.id, {
          method: 'PUT',
          data: {
            title: todo.title
          }
        }).done(function(data) {
          todo.modified = false;
          callback(null);
        }).fail(function(xhr, status, error) {
          callback(error);
        });
      }
    });
  },

  // Remove a TODO from the database
  remove(todos, callback) {
    todos.forEach(function(todo) {
      $.ajax('/todos/'+todo.id, {
        method: 'DELETE'
      }).done(function(data) {
        callback(null);
      }).fail(function(xhr, status, error) {
        callback(error);
      });
    });
  }
};
