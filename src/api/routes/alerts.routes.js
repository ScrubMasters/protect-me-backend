const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/user-authentication/check.users.authentication");
const AlertController = require("../controllers/alerts.controller.js");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'./imageUploads');//null makes that non-passing this won't throw error.
  },
  filename: function(req, file, cb) {
    const path = new Date().toISOString().replace(/:/g, '-') + file.originalname.replace(/ /g, '-');
    req.audio = path;
    cb(null, path);
  }
});
//Check if its an accepted image format.
const fileFilter = (req, file, cb) => {
  if(file.mimetype === "audio/mpeg" || file.mimetype === "audio/mp4" || file.mimetype === "text/plain"){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage, limits:{
    fileSize: 1024 * 1024 * 100
  }//,
  //fileFilter: fileFilter
}); //We can pass a config to multer
//get all alerts
router.get("/", checkAuth, AlertController.get_all_alerts);

//get alert
router.get("/:alertId", checkAuth, AlertController.get_alert);

//create alert with audio
router.post("/audio", checkAuth, upload.single('imageUploads'), AlertController.create_alert_audio);

//create alert without audio
router.post("/", checkAuth, AlertController.create_alert_no_audio);

//delete alert
router.delete("/:alertId", checkAuth, AlertController.delete_alert);

module.exports = router;