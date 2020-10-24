const User = require('./api/users/User');
const { digest } = require('./utils/auth');

// const self = new User({ username: 'j', password_digest: digest('test') });

// self
//   .save()
//   .then((savedRecord) => {
//     console.log(savedRecord);
//     console.log(savedRecord.__proto__);
//     process.exit();
//   })
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   });

User.findById(1)
  .then(user => {
    console.log(user);
    console.log(user.__proto__);
    process.exit();
  }).catch(err => {
    console.log(err);
    process.exit('1');
  })
