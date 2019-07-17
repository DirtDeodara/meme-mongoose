const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('./middleware/logger');

app.use(cors());
app.use(logger);
app.use(express.json());

app.use('/api/v1/memes', require('./routes/memes'));
app.use('/api/v1/submissions', require('./routes/submissions'));

app.use(require('./middleware/notFound'));
app.use(require('./middleware/error'));

module.exports = app;
