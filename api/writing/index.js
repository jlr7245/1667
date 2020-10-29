const { authenticateToken } = require('../../utils/auth');
const controller = require('./controller');
const send = require('../../utils/send');

const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('/writing endpoint');
});

router.post('/', authenticateToken, controller.create, send);
router.put('/:for_day', authenticateToken, controller.updateContent, send);
router.get('/:for_day', authenticateToken, controller.findOne, send);

module.exports = router;
