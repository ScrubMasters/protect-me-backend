const express = require('express');
const mongoose = require('mongoose');
const Alert = require('../models/alerts.model');

var AlertController = {
  get_all_alerts: (req, res, next) => {
    Alert.find()
    .select('severity creation_data created_by')//afegir audio
    .exec()
    .then(result => {
      alerts: result.map(alert => {
        return {
          _id: alert._id,
          severity: alert.severity,
          //audio: alert.audio,
          created_by: alert.created_by,

          request: {
            name: "get_alert",
            type: "GET",
            url: "http://localhost:3000/alerts/" + alert._id
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }
}