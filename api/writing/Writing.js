const db = require('../../db/config');
const modelDefaults = require('../../utils/model-defaults');

function Writing({ id, user_id, content, for_day, ctime, mtime, wordcount }) {
  this.id = id || null;
  this.user_id = user_id;
  this.content = content;
  this.for_day = for_day;
  this.ctime = ctime || null;
  this.mtime = mtime || null;
  this.wordcount = wordcount;
}

Object.assign(Writing, modelDefaults('writings', Writing));

/**
 * Creates a new record for the writing in the database
 */
Writing.prototype.save = function () {
  // ctime and mtime are already made
  return db.one(`INSERT INTO writings (
    user_id, content, for_day, wordcount
  ) VALUES (
    $/user_id/, $/content/, $/for_day/, $/wordcount/
  ) RETURNING *`, this)
    .then(writing => new Writing(writing));
}

/**
 * Update the content of a day's writing that already exists
 * @param {object} updates Object literal with keys content and wordcount
 */
Writing.prototype.updateContent = function (updates) {
  // thought: perhaps should include some kind of check around
  // is the ctime more than 24hr away from the time we're trying
  // to modify this? hmmmm
  return db.one(`UPDATE writings
    SET content = $/content/, wordcount = $/wordcount/
    WHERE id = $/id/
    RETURNING *
  `, {...updates, id: this.id })
    .then(updated => new Writing(updated));
}

module.exports = Writing;
