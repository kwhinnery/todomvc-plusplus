'use strict';
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controllers/routes');

const morgan = require('morgan');
let app = express();
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Add logging
app.use(morgan('combined', {stream: accessLogStream}));

// Configure middleware
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
