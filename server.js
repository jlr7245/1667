const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const StatusError = require('./utils/StatusError');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.data = {};
  next();
});

app.get('/', (req, res) => {
  res.send('this is not the endpoint yr looking for');
});

app.use('/api', require('./api'));

app.use('*', (req, res) => {
  throw new StatusError(404, 'Not found');
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, stack: err.stack });
});
