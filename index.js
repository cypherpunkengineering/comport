const crypto = require('crypto');
const mongo = require('./mongo');
const mailer = require('./mailer');
const message = require('./message');
const templates = require('./templates');
const discountCodes = require('./discountCodes');


// handle choose which users to send this mail to
let getUsers;
if (message.users === 'all') { getUsers = mongo.allUsers(); }
else if (message.users === 'confirmed') { getUsers = mongo.confirmedUsers(); }
else if (message.users === 'unconfirmed') { getUsers = mongo.unconfirmedUsers(); }
else if (message.users === 'testUser') { getUsers = mongo.testUser(); }
else { getUsers = mongo.testUsers(); }

// handle email subject line
let subject = message.subject;
if (!subject) { throw new Error('Subject not found'); }

// handle email template to use
let templateId = templates[message.templateId];
if (!templateId) { throw new Error('TemplateId not found'); }

// handle template substitutions
let substitutions = message.substitutions;

// send email to users
getUsers.then((users) => {
  let timer = 0;
  let discountCounter = 0;
  users.forEach((user) => {
    // scrap out cypherpunk emails
    if (user.endsWith('cypherpunk.com')) { return; }
    if (user.endsWith('uphyca.com')) { return; }
    if (user.endsWith('slickage.com')) { return; }

    // space email out by 100ms
    timer = timer + 100;

    // start timeout to send email
    setTimeout(() => {
      let token = encrypt(user);
      let unsub = `https://cypherpunk.com/unsubscribe?email=${user}&token=${token}`;
      substitutions.unsubLink = unsub;
      substitutions.discountCode = discountCodes[discountCounter];
      discountCounter++;

      // generate unsub token and url
      return mailer.mail({
        to: user,
        subject: subject,
        templateId: templateId,
        substitutions: substitutions
      });
    }, timer);
  });
})
.catch((err) => {
  console.log(err);
  console.log(err.response.body);
});


function encrypt(text){
  if (!text) { return ''; }
  var cipher = crypto.createCipher('aes-256-ctr', 'jsucksballsformakingmedothisshit');
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}
