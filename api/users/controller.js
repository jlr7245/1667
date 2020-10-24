const { digest, generateAccessToken } = require('../../utils/auth');
const StatusError = require('../../utils/StatusError');
const User = require('./User');

const create = (req, res, next) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password_digest: digest(password) });
  newUser
    .save()
    .then((user) => {
      const token = generateAccessToken({
        username: user.username,
      });
      console.log('HERE IS THE TOKEN!!!', token);
      return user.setAuthToken(token);
    })
    .then((userWithToken) => {
      res.locals.data.user = userWithToken;
      next();
    })
    .catch((err) => {
      console.log(err);
      throw new StatusError(500, err.message);
    });
};

module.exports = {
  create,
};
