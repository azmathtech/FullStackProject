//----------------------------------Notes--------------------------------------

//Testing queryies in the terminal before writing in all of the code

//In terminal in the project directory use command node
//This startes a terminal node session

//to test queryies copy over database info from index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cookieSession = require('cookie-session');
// const passport = require('passport');
// const bodyParser = require('body-parser');
//
// const keys = require('./config/keys');
// require('./models/User'); //just need the file to run, not passing anything
// require('./models/Survey');
// require('./services/passport'); //just need the file to run, not passing anything
//
// mongoose.connect(keys.mongoURI, {
//   useMongoClient: true
// });
// mongoose.Promise = global.Promise;

//then set up object - const Survey = mongoose.model('surveys')

// ---------------------------------------------------------------------------

//some queryies
//Survey.find({}).then(console.log)
//Survey.find({title: 'Super final test'}).then(console.log)
//Survey.find({ yes: 0 }).then(console.log)
