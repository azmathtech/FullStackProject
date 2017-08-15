const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, //may need to not use lowercase here or change file to use capital
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);

//----------------------------------Notes--------------------------------------

//_user is a reference field rather than raw data
//the name can be anything but the _ before the name is a conviention to identify
//that its a reference to a value in another table
