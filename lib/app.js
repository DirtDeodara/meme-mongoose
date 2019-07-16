const express = require('express');
const app = express();
const logger = require('./middleware/logger');

app.use(logger);
app.use(express.json());

app.use('/api/v1/habits', require('./routes/habits'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
