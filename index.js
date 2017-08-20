const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User'); //just need the file to run, not passing anything
require('./models/Survey');
require('./services/passport'); //just need the file to run, not passing anything

mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json()); //middleware to parse the request object we get back from a post request

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //in milliseconds - this is for 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static('client/build'));

  // Express with serve up the index.html file
  // if it doesnt recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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

//Notes on the two higher order functions below:
// require('./routes/authRoutes')(app);
// require('./routes/billingRoutes')(app);
//the required statement returns a function.  That function then calls (app) as
//the argument that is passed to the function
