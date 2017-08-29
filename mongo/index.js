const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const uri = config.mongo.uri;

// Use connect method to connect to the server
MongoClient.connect(uri, function(err, db) {
  if (err) { return console.log(err); }

  // Get emails for all confirmed users
  var collection = db.collection('user');
  collection.find({ "data.confirmed": true })
  .map((user) => { return user.data.email; })
  .toArray()
  .then((result) => {
    console.log(result);
    db.close();
  });
});
