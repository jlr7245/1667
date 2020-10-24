module.exports = (req, res, next) => {
  res
    .status(res.locals.status || 200)
    .json({ message: 'ok', data: res.locals.data });
};
