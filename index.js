const mongo = require('./mongo');
const mailer = require('./mailer');
const templates = require('./templates');

// switch on args,
// either use mongo, or postgres
// email one template to all emails
// use a template

// {
//   to: 'taesup63@gmail.com',
//   subject: 'Sending with SendGrid is Fun',
//   templateId: templates.transactional,
//   substitutions: {
//     'titleText': "You're only one step away",
//     'regularText': "Click the button below to confirm your free preview invitation",
//     'buttonText': "CONFIRM MY INVITATION",
//     'buttonURL': 'https://www.google.com'
//   }
// }

mongo.testUsers()
.then((users) => {
  return mailer.mail({
    to: users,
    subject: 'Sending with SendGrid is Fun',
    templateId: templates.simple,
    substitutions: {
      'titleText': "This is just a test",
      'regularText': "I can update the template later as needed",
      'buttonText': "Don't click this",
      'buttonURL': 'https://www.google.com'
    }
  });
})
.catch((err) => {
  // console.log(err);
  console.log(err.response.body);
});

// mailer.mail({
//   to: 'ed@cypherpunk.com',
//   subject: 'Sending with SendGrid is Fun',
//   templateId: templates.simple,
//   substitutions: {
//     'titleText': "This is just a test",
//     'regularText': "I can update the template later as needed",
//     'buttonText': "Don't click this",
//     'buttonURL': 'https://www.google.com'
//   }
// })
// .catch((err) => {
//   console.log(err);
//   console.log(err.response.body);
// });
