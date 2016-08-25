'use strict';

// Application configuration - environment settings here are the same across
// all environments. To override settings locally, move "user.example.js" to
// "user.js"
let config = {};

// ---------------------------------------------------------------
// Config values common across environments (overridable defaults)
// ---------------------------------------------------------------

// HTTP port for Express
config.port = process.env.PORT || 3000;

// Options for Sequelize ORM connection - overrides in production and test
// environments
config.databaseUrl = 'postgres://localhost:5432/todos';
config.databaseOptions = {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
};


// ----------------------------------------------------
// Assign values based on current execution environment
// ----------------------------------------------------
let environmentSettings = {};
switch (process.env.NODE_ENV) {
  case 'production': environmentSettings = require('./production'); break;
  case 'test': environmentSettings = require('./test'); break;
  default: environmentSettings = require('./development'); break;
}
config = Object.assign(config, environmentSettings);


// ---------------------------------------
// Override with user settings, if present
// ---------------------------------------
try {
  let userSettings = require('./user');
  config = Object.assign(config, userSettings);
} catch(e) {
  // nbd if we don't have user settings
}

// Export final configuration object
module.exports = config;
