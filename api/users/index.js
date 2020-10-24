const router = require('express').Router();

const { authenticateToken } = require('../../utils/auth');
const send = require('../../utils/send');
const controller = require('./controller');

router.get('/', (req, res, next) => {
  res.send('/user endpoint');
});

router.post('/', controller.create, send);

router.get('/secret', authenticateToken, (req, res, next) => {
  res.send(`yoooo you found the secret ${req.user.username}!!!! it is that cats are cute. ${JSON.stringify(req.user, 0, 2)}`)
})

module.exports = router;