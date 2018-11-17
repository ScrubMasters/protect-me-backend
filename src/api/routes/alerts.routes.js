const express = require('express');
const router = express.Router();

const checkAuth = require("../middlewares/user-authentication/check.users.authentication");
const alertController = require("../controllers/users.controller.js");

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

const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});