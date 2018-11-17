const mongoose = require('mongoose');

const AlertSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  severity: {
    type: String,
    required: true
  },

  creation_data: {
    type: Date,
    default: new Date()
  },

/*TODO
  audio: {
    type:
  }
*/

  created_by: {
    type: String
  }

});