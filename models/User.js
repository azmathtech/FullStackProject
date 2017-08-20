const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);

//----------------------------------Notes--------------------------------------
//The two lines below are identicle statements.  Just different syntax
//const Schema = mongoose.Schema;
//const { Schema } = mongoose;

//When creating a schema you can assign a type or an object with several options
