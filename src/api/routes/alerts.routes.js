const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/user-authentication/check.users.authentication");
const AlertController = require("../controllers/users.controller.js");

//get all alerts
router.get("/", AlertController.get_all_alerts);

//get alert
router.get("/:alertId", AlertController.get_alert);

//create alert with audio
router.post("/", AlertController.create_alert_audio);

//create alert without audio
router.post("/", AlertController.create_alert_no_audio);

//delete alert
router.delete("/:alertId", AlertController.delete_alert);

module.exports = router;