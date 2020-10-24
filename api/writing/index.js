const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('/writing endpoint');
});

module.exports = router;
