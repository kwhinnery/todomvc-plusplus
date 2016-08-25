'use strict'

const Sequelize = require('sequelize');
const config = require('../../../config');

// Create shared instance to be used across models
let db = new Sequelize(config.databaseUrl, config.databaseOptions);

module.exports = db;
