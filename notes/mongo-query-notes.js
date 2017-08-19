email = 'a@a.com';
choice = 'yes' || 'no'; //reminder of the values for choice

// this function will search the database for a record
Survey.findOne({
  _id: surveyId,
  recipients: {
    $elemMatch: { email: email, responded: false }
  }
});

// this function will search the database for a record and then update that record
Survey.updateOne(
  {
    _id: surveyId,
    recipients: {
      $elemMatch: { email: email, responded: false }
    }
  },
  {
    $inc: { [choice]: 1 },
    $set: { 'recipients.$.responded': true }
  }
);

// $inc represents a mongo operator - allows to put in logic to the database
// $inc is specificaly increment
//$inc: { [choice]: 1 } //[choice] -> is not an array, will return yes or no
