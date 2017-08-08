const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id }); //returns a promise

      if (existingUser) {
        //we already have a record with the given profile ID
        return done(null, existingUser);
      }
      //we dont have a user record with this ID, make a new record
      const user = await new User({ googleId: profile.id }).save(); //returns a promise
      done(null, user);
    }
  )
);

//----------------------------------Notes--------------------------------------

// console.log('access Token', accessToken);
// console.log('refresh Token', refreshToken);
// console.log('profile: ', profile);

//Example async/await arrow function
// const fetchAlbums = async () => {
//   const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
//   const json = await res.json();
//
//   console.log(json);
// };
//
// fetchAlbums();

//passport/async arrow function prior to refactor
// (accessToken, refreshToken, profile, done) => {
//   User.findOne({ googleId: profile.id }) //returns a promise
//     .then(existingUser => {
//       if (existingUser) {
//         //we already have a record with the given profile ID
//         done(null, existingUser);
//       } else {
//         //we dont have a user record with this ID, make a new record
//         new User({ googleId: profile.id })  //returns a promise
//           .save()
//           .then(user => done(null, user));
//       }
//     });
// }

//async code prior to further reduction
//removed the else case in the production code above
//adding a return statement inside the if statement eliminates the need for the else
// async (accessToken, refreshToken, profile, done) => {
//   const existingUser = await User.findOne({ googleId: profile.id }); //returns a promise
//
//   if (existingUser) {
//     //we already have a record with the given profile ID
//     done(null, existingUser);
//   } else {
//     //we dont have a user record with this ID, make a new record
//     const user = await new User({ googleId: profile.id }).save(); //returns a promise
//     done(null, user);
//   }
// }
