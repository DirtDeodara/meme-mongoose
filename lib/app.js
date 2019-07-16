const express = require('express');
const app = express();
const logger = require('./middleware/logger');

app.use(logger);
app.use(express.json());

app.use('/api/v1/memes', require('./routes/memes'));

app.use(require('./middleware/notFound'));
app.use(require('./middleware/error'));

module.exports = app;
