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
  userImage: { type: String, default: "imageUploads\\default.PNG"},
  userRole: {type: String, default: "Volunteer"},
  firstName:{type: String, default: ""},
  lastName:{type: String, default: ""},
  displayName:{type:String, default: ""},


  created_at: {
    type: Date,
    default: new Date()
  }
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;