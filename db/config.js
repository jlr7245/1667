require('dotenv').config();

const options = {
  query: (e) => {
    console.log(e.query);
  },
};

const pgp = require('pg-promise')(options);

const setDb = () => {
  if (process.env.NODE_ENV === 'dev' || !process.env.NODE_ENV) {
    return pgp({
      database: process.env.DB_NAME,
      port: 5432,
      host: 'localhost',
    });
  } else if (process.env.NODE_ENV === 'production') {
    return pgp(process.env.DATABASE_URL);
  } else
    throw new Error(`Unrecognized node environment ${process.env.NODE_ENV}.`);
};

module.exports = setDb();
