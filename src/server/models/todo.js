'use strict';

const Sequelize = require('sequelize');
const db = require('./db');

let Todo = db.define('Todo', {
  title: Sequelize.TEXT,
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Todo;
