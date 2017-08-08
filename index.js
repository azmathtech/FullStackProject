const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user'); //just need the file to run, not passing anything
require('./services/passport'); //just need the file to run, not passing anything

mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //in milliseconds - this is for 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; //either use what heroku assigns or 5000 for the port
app.listen(PORT);

console.log('Running on port 5000');

//----------------------------------Notes--------------------------------------
// Route Handler
// app.get('/', (req, res) => {
//   res.send({ bye: 'buddy' });
// });

//just using mongoose.connect(keys.mongoURI); give a deprication warning
//the below line of code removes the deprication warning
//mongoose.connnect(keys.mongoURI, {
//   useMongoClient: true
// });

//the below takes care of a deprication warning concerning mongoose default promise library
// mongoose.Promise = global.Promise;

// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
// - the above two lines of code are the same as the below -
//require('./routes/authRoutes')(app);
