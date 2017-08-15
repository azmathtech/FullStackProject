const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
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
