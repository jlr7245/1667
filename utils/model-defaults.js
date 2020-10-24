const db = require('../db/config');

/**
 * Defaults for all models.
 * @param {string} tablename The name of the table in question
 * @param {function} Constructor The model itself so that new model objects may be returned
 */
module.exports = (tablename, Constructor) => ({
  findAll: () =>
    db
      .manyOrNone(`SELECT * FROM ${tablename}`)
      .then(
        (results) => results && results.map((record) => new Constructor(record))
      ),
  findById: (id) =>
    db
      .one(`SELECT * FROM ${tablename} WHERE id = $1`, id)
      .then((record) => new Constructor(record)),
  destroy: (id) => db.none(`DELETE FROM ${tablename} WHERE id = $1`, id),
});
