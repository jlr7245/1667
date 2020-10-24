const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/writing', require('./writing'));

module.exports = router;
