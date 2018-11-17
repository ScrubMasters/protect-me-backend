const express = require('express');
const mongoose = require('mongoose');
const Alert = require('../models/alerts.model');
const User = require('../models/users.model');
const UserController = require('../controllers/users.controller');

var AlertController = {
  get_all_alerts: (req, res, next) => {
    Alert.find()
    .select('severity creation_data created_by')//afegir audio
    //.populate('user', '_id')
    .exec()
    .then(result => {
      res.status(200).json({
        alerts: result.map(alert => {
          return {
            _id: alert._id,
            severity: alert.severity,
            creation_date: alert.creation_date,
            //audio: alert.audio,
            created_by: alert.created_by,

            request: {
              name: "get_alert",
              type: "GET",
              url: "http://localhost:3000/alerts/" + alert._id
            }
          }
      })
    });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  },

  get_alert: (req, res) => {
    const id = req.params.alertId;
    Alert.findById(id)
    .select('severity creation_data created_by')//afegir audio
    .exec()
    .then(alert => {
      if(!alert) {
        res.status(404).json({
          message: "Alert not found, this id:" + alert._id + " does not belong to any created alert."
        });
      }
      res.status(200).json({
        alert: alert,
        request: {
          name: "get_all_alerts",
          type: "GET",
          url: "http://localhost:3000/alerts"
        }
      });
    });

  },
  //create alert with audio
  create_alert_audio: (req, res) => {
    const alert = new Alert({
      _id: new mongoose.Types.ObjectId(),
      severity: req.body.severity,
      creation_date: req.body.creation_date,
      //audio: req.body.audio,
      created_by: "Me"
    });
    alert.save()
    .then(result => {
      res.status(201).json({
        message: "Alert created correctly",
        alert: alert,
        get_alert: {
          type: "GET",
          url: "http://localhost:3000/alerts/" + alert._id
        },
        create_alert_no_audio: {
          type:"POST",
          url: "http://localhost:3000/alerts/"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }, 
  create_alert_no_audio: (req, res) => {
    const alert = new Alert({
      _id: new mongoose.Types.ObjectId(),
      severity: req.body.severity,
      creation_date: req.body.creation_date,
      created_by: "Me"
    });
    alert.save()
    .then(result => {
      res.status(201).json({
        message: "Alert created correctly",
        alert: alert,
        get_alert: {
          type: "GET",
          url: "http://localhost:3000/alerts/" + alert._id
        },
        create_alert_audio: {
          type:"POST",
          url: "http://localhost:3000/alerts/audio"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  },

  delete_alert: (req, res) => {
    Alert.deleteOne({_id: req.params.alertId})
    .exec()
    .then( result => {
      res.status(200).json({
        message: "Alert with id " + req.params.alertId + " deleted succesfully"
      });
    })
    .catch( err => {
      res.status(500).json({
        error: err
      });
    });
  }
}

module.exports = AlertController