const mongoose = require('mongoose');

const AlertSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    severity: {
        type: String,
        required: true
    },

    data: {
        type: Date,
        default: new Date()
    },


    audio: {
        type: AudioBuffer
    },


    created_by: {
        type: String
    },

    longitude:{
        type: Number
    },

    latitude:{
        type: Number
    }




});