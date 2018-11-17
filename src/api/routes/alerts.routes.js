const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/user-authentication/check.users.authentication");
const AlertController = require("../controllers/users.controller.js");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./audioUploads');//null makes that non-passing this won't throw error.
    },
    filename: function(req, file, cb) {
        const path = new Date().toISOString().replace(/:/g, '-') + file.originalname;
        req.avatar = path;
        cb(null, path);
    }
});

const upload = multer(
    { storage: storage, limits: {
        fields: 1, fileSize: 6000000, files: 1, parts: 2
        }
    });

//get all alerts
router.get("/", AlertController.get_all_alerts);

//get alert
router.get("/:alertId", AlertController.get_user);

//create alert with audio
router.post("/", AlertController.create_alert_audio);

//create alert without audio
router.post("/", AlertController.create_alert_no_audio);

//delete alert
router.delete("/:alertId", AlertController.delete_alert);

//modify audio
router.post('/audio/:userId', checkAuth, upload.single('audioUploads'), UserController.modify_img);

module.exports = router;