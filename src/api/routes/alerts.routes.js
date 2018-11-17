const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/user-authentication/check.users.authentication");
const AlertController = require("../controllers/alerts.controller.js");

//get all alerts
router.get("/", checkAuth, AlertController.get_all_alerts);

//get alert
router.get("/:alertId", checkAuth, AlertController.get_alert);

//create alert with audio
router.post("/audio", checkAuth, AlertController.create_alert_audio);

//create alert without audio
router.post("/", checkAuth, AlertController.create_alert_no_audio);

//delete alert
router.delete("/:alertId", checkAuth, AlertController.delete_alert);

module.exports = router;