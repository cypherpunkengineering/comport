const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const uri = config.mongo.uri;

function allUsers() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(uri, function(err, db) {
      if (err) { return reject(err); }
      else { return resolve(db); }
    });
  })
  .then((db) => {
    return db.collection('user')
    .find()
    .map((user) => { return user.data.email; })
    .toArray()
    .then((result) => {
      console.log(result.length);
      console.log(result);
      db.close();
      return result;
    });
  });
}

function confirmedUsers() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(uri, function(err, db) {
      if (err) { return reject(err); }
      else { return resolve(db); }
    });
  })
  .then((db) => {
    return db.collection('user')
    .find({ $or: [ {"data.confirmed": "true"}, {"data.confirmed": true} ]})
    .map((user) => { return user.data.email; })
    .toArray()
    .then((result) => {
      console.log(result.length);
      console.log(result);
      db.close();
      return result;
    });
  });
}

function unconfirmedUsers() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(uri, function(err, db) {
      if (err) { return reject(err); }
      else { return resolve(db); }
    });
  })
  .then((db) => {
    return db.collection('user')
    .find({ $or: [
      { "data.confirmed": "false" },
      { "data.confirmed": false },
      { "data.confirmed": null }
    ]})
    .map((user) => { return user.data.email; })
    .toArray()
    .then((result) => {
      console.log(result.length);
      console.log(result);
      db.close();
      return result;
    });
  });
}

function testUsers() {
  return Promise.resolve([
    'mike@cypherpunk.com',
    'kim@cypherpunk.com',
    'connie@cypherpunk.com',
    'tony@cypherpunk.com',
    'jon@cypherpunk.com',
    'chris@cypherpunk.com',
    'ed@cypherpunk.com'
  ]);
}

function testUser() {
  return Promise.resolve('ed@cypherpunk.com');
}

module.exports = {
  allUsers: allUsers,
  confirmedUsers: confirmedUsers,
  unconfirmedUsers: unconfirmedUsers,
  testUsers: testUsers,
  testUser: testUser
}
