const db = require('../../db/config');
const modelDefaults = require('../../utils/model-defaults');

function User({ id, username, password_digest, auth_token }) {
  this.id = id || null;
  this.username = username;
  this.password_digest = password_digest;
  this.auth_token = auth_token;
}

Object.assign(User, modelDefaults('users', User));

User.findByUserName = function (username) {
  return db
    .oneOrNone('SELECT * FROM users WHERE username = $1', username)
    .then((user) => user && new User(user));
};

User.prototype.save = function () {
  return db
    .one(
      `INSERT INTO users (
      username, password_digest
      ) VALUES (
        $/username/, $/password_digest/
      )
      RETURNING *
    `,
      this
    )
    .then((user) => new User(user));
};

User.prototype.setAuthToken = function () {
  return db
    .one(`UPDATE users SET auth_token = $/auth_token/ WHERE id = $/id/`, this)
    .then((user) => new User(user));
};

module.exports = User;
