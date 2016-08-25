'use strict';

const assert = require('chai').assert;
const Sequelize = require('sequelize');
const db = require('../server/models/db');
const Todo = require('../server/models/todo');

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
    return Todo.create({ 
      body: todoText
    }).then(function(todo) {
      assert.equal(todo.body, todoText, 'Saved text should match');
    });
  });

});
