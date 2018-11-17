const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/user-authentication/check.users.authentication");
const AlertController = require("../controllers/users.controller.js");

//get all alerts
router.get("/", AlertController.get_all_alerts);

//get alert
router.get("/:alertId", AlertController.get_user);

//create alert
router.post("/", AlertController.create_alert);

//delete alert
router.delete("/:alertId", AlertController.delete_alert);

module.exports = router;