const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);

//----------------------------------Notes--------------------------------------
//The two lines below are identicle statements.  Just different syntax
//const Schema = mongoose.Schema;
//const { Schema } = mongoose;
