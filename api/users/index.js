const router = require('express').Router();

const send = require('../../utils/send');
const controller = require('./controller');

router.get('/', (req, res, next) => {
  res.send('/user endpoint');
});

router.post('/', controller.create, send);

module.exports = router;