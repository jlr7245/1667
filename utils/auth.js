require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StatusError = require('./StatusError');

/**
 * Generates a JWT token for a user
 * @param {string} username
 */
const generateAccessToken = (username) =>
  jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '30d' });

/**
 * Middleware requiring authentication by token before continuing on to
 * next middleware in the chain.
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Express's "next" function
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) throw new StatusError(401, 'Token required');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) throw new StatusError(403, 'Invalid token for user');
    req.user = user;
    next();
  });
};

/**
 * bcrypt comparison of raw password and hashed password in db.
 * @param {string} userPass password the user entered to try and log in
 * @param {string} dbPass password_digest for that username in the database
 */
const comparePass = (userPass, dbPass) => bcrypt.compareSync(userPass, dbPass);

/**
 * Takes in the raw password and digests it.
 * @param {string} rawPass On register, user's initial plain text password
 */
const digest = (rawPass) => bcrypt.hashSync(rawPass, bcrypt.genSaltSync());

module.exports = {
  generateAccessToken,
  authenticateToken,
  comparePass,
  digest,
};
