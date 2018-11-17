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

/*TODO
  audio: {
    type:
  }
*/

  created_by: {
    type: String
    /*type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true*/
  }

});

var AlertModel = mongoose.model('Alert', AlertSchema);

module.exports = AlertModel;