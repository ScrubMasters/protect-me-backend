const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: { type: String,
    required: true,
    unique: true,
    //Email validation regex.
    match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  userImage: { type: String, required:true, default: "imageUploads\\default.PNG"},
  firstName:{type: String, default: "John"},
  lastName:{type: String, default: "Doe"},
  displayName:{type:String, default: "John Doe"},

  created_at: {
    type: Date,
    default: new Date()
  }
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;