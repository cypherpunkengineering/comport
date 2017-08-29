const mailer = require('./mailer');

// switch on args,
// either use mongo, or postgres
// email one template to all emails

// use a template

console.log(process.argv);


// {
//   to: 'taesup63@gmail.com',
//   subject: 'Sending with SendGrid is Fun',
//   templateId: '99f16955-a429-492b-8c45-5558d6c5b9a0',
//   substitutions: {
//     'titleText': "You're only one step away",
//     'regularText': "Click the button below to confirm your free preview invitation",
//     'buttonText': "CONFIRM MY INVITATION",
//     'buttonURL': 'https://www.google.com'
//   }
// }

mailer.mail({
  to: [
    'mike@cypherpunk.com',
    'kim@cypherpunk.com',
    'connie@cypherpunk.com',
    'tony@cypherpunk.com',
    'jon@cypherpunk.com',
    'chris@cypherpunk.com',
    'ed@cypherpunk.com'
  ],
  subject: 'Sending with SendGrid is Fun',
  templateId: 'd2d4eef0-05cb-460d-9085-5cfe3ddd7608',
  substitutions: {
    'titleText': "This is just a test",
    'regularText': "I can update the template later as needed",
    'buttonText': "Don't click this",
    'buttonURL': 'https://www.google.com'
  }
})
.catch((err) => {
  // console.log(err);
  console.log(err.response.body);
});
