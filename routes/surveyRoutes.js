const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body) //const events = (only used this for testing, no longer need the events variable)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact() //removes any undefined element
      .uniqBy('email', 'surveyId') //removes any duplicate based on email and surveyId
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    //console.log(events);

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    //create new survey
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

//----------------------------------Notes--------------------------------------

// we just put requireLogin rather than requireLogin() because we are just telling
// express app object that there is a reference to a function that it should run

//const survey = new Survey use a lowercase survey because its an instance of a Survey

//title: title is the same as title

//recipients.split(',') - takes the list of recipients and returns an array of
//the recipients seperated by a comma
//then the .map() function turns the values in the array into an object with the
//email address as a property of the object.

//map(email => { return { email: email }}) can be simplified to
//map(email => { return { email }}) can be simplified to
//map(email =>  ({ email }))
//because we needed to add the trim() function to eleminate white space the
//shorthand was no longer an option

//Prior to destructuring
// const events = _.map(req.body, event => {
//   const pathname = new URL(event.url).pathname;
//   const p = new Path('/api/surveys/:surveyId/:choice');
//   //console.log(p.test(pathname));
//   const match = p.test(pathname);
//   if (match) {
//     return {
//       email: event.email,
//       surveyId: match.surveyId,
//       choice: match.choice
//     };
//   }
// });

// ---------------------------------------------------------------------------

//lodash compact function goes through an array and removes any elements that
//are undefined

// ---------------------------------------------------------------------------

//Prior to refactor/clean up
// app.post('/api/surveys/webhooks', (req, res) => {
//   const events = _.map(req.body, ({ email, url }) => {
//     const pathname = new URL(url).pathname;
//     const p = new Path('/api/surveys/:surveyId/:choice');
//     //console.log(p.test(pathname));
//     const match = p.test(pathname);
//     if (match) {
//       return { email, surveyId: match.surveyId, choice: match.choice };
//     }
//   });
//
//   //console.log(events);
//   const compactEvents = _.compact(events); //removes any undefined element
//   const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId'); //removes any duplicate based on email and surveyId
//
//   console.log(uniqueEvents);
//
//   res.send({});
// });
//First phase of refactor
// app.post('/api/surveys/webhooks', (req, res) => {
//   const p = new Path('/api/surveys/:surveyId/:choice');
//
//   const events = _.map(req.body, ({ email, url }) => {
//     const match = p.test(new URL(url).pathname);
//     if (match) {
//       return { email, surveyId: match.surveyId, choice: match.choice };
//     }
//   });
//
//   //console.log(events);
//   const compactEvents = _.compact(events); //removes any undefined element
//   const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId'); //removes any duplicate based on email and surveyId
//
//   console.log(uniqueEvents);
//
//   res.send({});
// });
//refactor after implementing the lodash chain function
// app.post('/api/surveys/webhooks', (req, res) => {
//   const p = new Path('/api/surveys/:surveyId/:choice');
//
//   const events = _.chain(req.body)
//     .map(req.body, ({ email, url }) => {
//       const match = p.test(new URL(url).pathname);
//       if (match) {
//         return { email, surveyId: match.surveyId, choice: match.choice };
//       }
//     })
//     .compact() //removes any undefined element
//     .uniqBy('email', 'surveyId') //removes any duplicate based on email and surveyId
//     .value();
//
//   console.log(events);
//
//   res.send({});
// });

// ---------------------------------------------------------------------------
//Queries
//Survey.find({ _user: req.user.id }) returns a query object
//you can then attach query functions to the end of the query object
//Survey.find({ _user: req.user.id }).select()

//to include or exclude a value from a query
// // include a and b, exclude other fields
// query.select('a b');
//
// // exclude c and d, include other fields
// query.select('-c -d');
//
// // or you may use object notation, useful when
// // you have keys already prefixed with a "-"
// query.select({ a: 1, b: 1 });
// query.select({ c: 0, d: 0 });

// actual code example -
// const surveys = await Survey.find({ _user: req.user.id }).select({
//   recipients: false
// });
