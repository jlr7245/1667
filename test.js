const User = require('./api/users/User');
const Writing = require('./api/writing/Writing');
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

// User.findById(1)
//   .then((user) => {
//     console.log(user);
//     console.log(user.__proto__);
//     process.exit();
//   })
//   .catch((err) => {
//     console.log(err);
//     process.exit('1');
//   });

// const newWriting = new Writing({
//   content: 'heres another writing',
//   wordcount: 22,
//   user_id: 6,
//   for_day: 3,
// });

// newWriting
//   .save()
//   .then((writing) => {
//     console.log(writing), console.log(writing.__proto__);
//   })
//   .then(() => {
//     return Writing.findAll();
//   })
//   .then(writings => {
//     console.log(JSON.stringify(writings, 0, 2));
//     process.exit();
//   })
//   .catch((err) => {
//     console.log(err);
//     process.exit('1');
//   });

Writing.findById(3).then((writing) => {
  return writing.updateContent({
    content: (writing.content += ' and now Im adding this new content to it'),
    wordcount: 15,
  })
}).then(updatedWriting => {
  console.log(updatedWriting);
  process.exit();
}).catch(err => {
  console.log(err);
  process.exit(1);
});
