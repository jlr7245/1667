const Writing = require('./Writing');

const create = (req, res, next) => {
  const { content, for_day, wordcount } = req.body;
  const { id } = req.user;
  const newWriting = new Writing({ content, for_day, wordcount, user_id: id });
  newWriting
    .save()
    .then((savedWriting) => {
      res.locals.data.writing = savedWriting;
      next();
    })
    .catch(next);
};

const updateContent = (req, res, next) => {
  const { content, wordcount } = req.body;
  Writing.findByUserAndForDay({
    for_day: req.params.for_day,
    user_id: req.user.id,
  })
    .then((foundWriting) => {
      return foundWriting.updateContent({ content, wordcount });
    })
    .then((updatedWriting) => {
      res.locals.data.writing = updatedWriting;
      next();
    })
    .catch(next);
};

const findOne = (req, res, next) => {
  const { for_day } = req.params;
  Writing.findByUserAndForDay({ for_day, user_id: req.user.id })
    .then((writing) => {
      res.locals.data.writing = writing;
      next();
    })
    .catch(next);
};

module.exports = {
  create,
  updateContent,
  findOne,
};
