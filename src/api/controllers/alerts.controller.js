const express = require('express');
const mongoose = require('mongoose');
const Alert = require('../models/alerts.model');

var AlertController = {
  get_all_alerts: (req, res, next) => {
    Alert.find()
    .select('severity creation_date latitude longitude createdBy')//afegir audio
    .populate('createdBy')
    .exec()
    .then(result => {
      res.status(200).json({
        alerts: result.map(alert => {
          return {
            _id: alert._id,
            severity: alert.severity,
            latitude: alert.latitude,
            longitude: alert.longitude,
            creation_date: alert.creation_date,
            audio: alert.audio,
            createdBy: alert.createdBy,

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
        error: "Server could not serve GET all alerts petition."
      });
    });
  },

  get_alert: (req, res) => {
    const id = req.params.alertId;
    Alert.findById(id)
    .select('severity creation_date latitude longitude createdBy')//afegir audio
    .populate('createdBy')
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
    console.log(req);
    const alert = new Alert({
      _id: new mongoose.Types.ObjectId(),
      severity: req.body.severity,
      creation_date: req.body.creation_date,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      audio: req.audio,
      createdBy: req.body.createdBy
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
        error: "Server could not create an alert with audio."
      });
    });
  }, 
  create_alert_no_audio: (req, res) => {
    const alert = new Alert({
      _id: new mongoose.Types.ObjectId(),
      severity: req.body.severity,
      creation_date: req.body.creation_date,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      createdBy: req.body.createdBy
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
        error: "Server could not create an alert without audio."
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
        error: "Server could not serve DELETE petition."
      });
    });
  }
}

module.exports = AlertController