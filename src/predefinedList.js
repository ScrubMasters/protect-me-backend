const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./api/models/users.model');

module.exports = {
    create_prof:
        function() {
            //checking username not used
            User.find({username: "professor1"})
                .exec()
                .then(user => {
                    if(user.length >= 1){ }
                    else {//checking email not used
                        bcrypt.hash("password", 10, (err, hash) => {
                            if (err) {
                                res.status(500).json({
                                    error: "Server could not manage your petition, please try again"
                                });
                            } else {
                                const prof1 = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    username: "professor1",
                                    password: hash,
                                    email: "prof1@gmail.com",
                                    firstName: "Professor",
                                    lastName: "1",
                                    userRole: "Teacher",
                                    created_at: new Date().toLocaleString()
                                });
                                const prof2 = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    username: "professor2",
                                    password: hash,
                                    email: "prof2@gmail.com",
                                    firstName: "Professor",
                                    lastName: "2",
                                    userRole: "Teacher",
                                    created_at: new Date().toLocaleString()
                                });
                                const prof3 = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    username: "professor3",
                                    password: hash,
                                    email: "prof3@gmail.com",
                                    firstName: "Professor",
                                    lastName: "3",
                                    userRole: "Teacher",
                                    created_at: new Date().toLocaleString()
                                });
                                const prof4 = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    username: "professor4",
                                    password: hash,
                                    email: "prof4@gmail.com",
                                    firstName: "Professor",
                                    lastName: "4",
                                    userRole: "Teacher",
                                    created_at: new Date().toLocaleString()
                                });
                                const prof5 = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    username: "professor5",
                                    password: hash,
                                    email: "prof5@gmail.com",
                                    firstName: "Professor",
                                    lastName: "5",
                                    userRole: "Teacher",
                                    created_at: new Date().toLocaleString()
                                });
                                //
                                prof1.save();
                                prof2.save();
                                prof3.save();
                                prof4.save();
                                prof5.save();
                            }
                        });
                    }
                });
    }
};

