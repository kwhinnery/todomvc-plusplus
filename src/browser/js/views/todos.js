'use strict';

const Vue = require('vue');
const todoStorage = require('../util/store');

let filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
};

let app = {

  // the root element that will be compiled
  el: '.todoapp',

  // app initial state
  data: {
    todos: [],
    newTodo: '',
    editedTodo: null,
    visibility: 'all'
  },

  // Initialize TODOs from database
  created() {
    todoStorage.fetch((err, todos) => {
      this.todos = todos;
    });
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos);
    },
    remaining: function () {
      return filters.active(this.todos).length;
    },
    allDone: {
      get: function () {
        return this.remaining === 0;
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value;
        });
      }
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {

    addTodo: function () {
      let value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({ title: value, completed: false });
      todoStorage.save(this.todos, function(err) {
        if (err) console.log(err);
      });
      this.newTodo = '';
    },

    removeTodo: function (todo) {
      this.todos.$remove(todo);
      todoStorage.remove([todo], function(err) {
        if (err) console.log(err);
      });
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      todo.modified = true;
      if (!todo.title) {
        this.removeTodo(todo);
      } else {
        todoStorage.save(this.todos, function(err) {
          if (err) console.log(err);
        });
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeCompleted: function () {
      // remove them in the database async
      todoStorage.remove(filters.completed(this.todos), function(err) {
        if (err) console.log(err);
      });
      this.todos = filters.active(this.todos);
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (value) {
      if (!value) {
        return;
      }
      let el = this.el;
      Vue.nextTick(function () {
        el.focus();
      });
    }
  }
};

module.exports = app;
