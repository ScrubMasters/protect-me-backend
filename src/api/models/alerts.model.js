const mongoose = require('mongoose');

const AlertSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  severity: {
    type: String,
    required: true
  },

  creation_date: {
    type: Date,
    default: new Date()
  },

  longitude: {
    type: Number,
    required: true
  },

  latitude: {
    type: Number,
    required: true
  },

/*TODO
  audio: {
    type:
  }
*/

  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  }

});

var AlertModel = mongoose.model('Alert', AlertSchema);

module.exports = AlertModel;