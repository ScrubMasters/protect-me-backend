const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/user-authentication/check.users.authentication");
const UserController = require("../controllers/users.controller.js");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'./imageUploads');//null makes that non-passing this won't throw error.
  },
  filename: function(req, file, cb) {
    const path = new Date().toISOString().replace(/:/g, '-') + file.originalname;
    req.avatar = path;
    cb(null, path);
  }
});
//Check if its an accepted image format.
const fileFilter = (req, file, cb) => {
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage, limits:{
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter
}); //We can pass a config to multer

//get_all_users
router.get('/', UserController.get_all_users);

//get_user (auth or not?)
router.get('/:userId', UserController.get_user);
//modify image
router.post('/avatar/:userId', checkAuth, upload.single('imageUploads'), UserController.modify_img);
//signUp
router.post('/signup', UserController.user_signUp);

//login
router.post('/login', UserController.user_login);

//Delete user
router.delete('/:userId', checkAuth, UserController.delete_user);

module.exports = router;