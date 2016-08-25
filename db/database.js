// Our application's configuration lives in ../config, but our database config
// for Sequelize CLI operations lives in this file. Pull in database config 
// from our main config - this file should never have to change.
const config = require('../config');

// Configuration object for Sequelize migrations - we configure these separately
// elsewhere based on the current NODE_ENV, because our app's config object is
// not structured to have separate "production" or "test" properties
let sequelizeConfig = { url: config.databaseUrl, dialect: 'postgres' };
sequelizeConfig.production = sequelizeConfig;
sequelizeConfig.test = sequelizeConfig;
sequelizeConfig.development = sequelizeConfig;

// Export final database config
module.exports = sequelizeConfig;
