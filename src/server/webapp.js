'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controllers/routes');

let app = express();

// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure middleware
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

// Static file serving happens everywhere but in production
if (process.env.NODE_ENV !== 'production') {
  let staticPath = path.join(__dirname, '..', '..', 'public');
  app.use('/static', express.static(staticPath));
}

// Mount application routes
routes(app);

// Export Express webapp instance
module.exports = app;
