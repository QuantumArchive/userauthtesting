const express = require('express');
const app = express();
const morgan = require('morgan');
const artistsRoute = require('./routes/artists');
const errorHandler = require('./error-handler');

app.use(morgan('dev'));
app.use('/users', artistsRoute);
app.use(errorHandler);

module.exports = app;