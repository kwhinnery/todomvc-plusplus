'use strict';

const assert = require('chai').assert;
const Sequelize = require('sequelize');
const db = require('../models/db');
const Todo = require('../models/todo');

// reset the test database
before(function(done) {
  db.drop().then(function() {
    return db.sync({ force: true });
  }).then(function() {
    done();
  }).catch(function(err) {
    console.log(err);
  });
});

describe('The Todo Model', function() {

  it('should accept text for the TODO item', function() {
    let todoText = 'this is a super todo';
    let completed = false;
    return Todo.create({
      title: todoText,
      completed: completed
    }).then(function(todo) {
      assert.equal(todo.title, todoText, 'Saved text should match');
      assert.equal(todo.completed, false, 'Saved text should match');
    });
  });

});
