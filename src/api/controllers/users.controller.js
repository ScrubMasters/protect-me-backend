const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

var UserController = {
  get_all_users: (req,res) => {
    User.find()
    .select('username userRole displayName email userImage created_at')
    .exec()
    .then(result => {
      res.status(200).json({
        users: result.map(user => {
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
            userRole: user.userRole,
            userImage: user.userImage,
            firstName: user.firstName,
            lastName: user.lastName,
            displayName: user.displayName,
            created_at: user.created_at,
            
            request: {
              name: "get_user",
              type: "GET",
              url: "https://protect-me-backend.herokuapp.com/users/" + user._id

            }
          }
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: "Server could not get users, please try again"
      });
    });
  },
  get_user: (req, res) => {
    const id= req.params.userId;
    User.findById(id)
    .select("username userRole displayName email userImage created_at")
    .exec()
    .then(user => {
      if(!user){
        res.status(404).json({
          message: "User not found, by the id you searched"
        });
      }
      res.status(200).json({
        user: user,
        request: {
          name: "get_all_users",
          type: "GET",
          url:"https://protect-me-backend.herokuapp.com/users"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: "Server could not get user, please try again"
      });
    });
  },

  modify_img: (req, res, next) => {
    const id = req.params.userId;
    console.log(req.avatar);
    User.updateOne({_id: id}, {$set: {userImage: req.avatar} })//2nd argument, how we want to update this.
              .exec()
              .then(result => {
                res.status(200).json({
                  message: "User updated",
                  user: result,
                  request: {
                    type: "GET",
                    url: "https://protect-me-backend.herokuapp.com/users/" + id
                  }
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: "Server could not save the image, please try again"
                });
              });
  },
  user_signUp: (req,res,next) => {
    //checking username not used
    User.find({username: req.body.username})
    .exec()
    .then(user => {
      if(user.length >= 1){
        res.status(409).json({
          message: "This username is already taken. Use another username to create your user."
        });
      } 
      else {//checking email not used
        User.find({email: req.body.email})
        .exec()
        .then(result => {
          if(result.length >= 1){    
            res.status(409).json({
              message: "This email is already taken. Use another email to create your user."
            });
          } else { //if all gone well we go inside here
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if(err) {
                res.status(500).json({
                  error: "Server could not manage your petition, please try again"
                });
              } else {
                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  username: req.body.username,
                  password: hash,
                  email: req.body.email,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  displayName: req.body.displayName,
                  userImage: req.body.photoURL,
                  userRole: req.body.userRole,
                  created_at: req.body.created_at
                });
                user.save()
                .then(result => {
                  res.status(201).json({
                    message:"User " + user.username + " created correctly",
                    user: user,
                    login_request: {
                      type: "POST",
                      url: "https://protect-me-backend.herokuapp.com/users/login"
                    },
                    get_request: {
                      type: "GET",
                      url: "https://protect-me-backend.herokuapp.com/users/" + user._id
                    }
                  });
                })
                .catch(err => {
                  res.status(404).json({
                    error: "User creation error."
                  });
                });
              }
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            error: "Server could not create a user, please try again"
          });
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "Server could not manage the petition, please try again"
      });
    });
  },

  user_login: (req, res, next) => {
    User.find({username: req.body.username})
    .exec()
    .then(user => {
      if(user.length < 1){
        res.status(401).json({
          message: "Invalid credentials, authentication failed"
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if(err){
            res.status(401).json({
              message: "Invalid credentials, authentication failed"
            });
          }
          if(result){
            const token = jwt.sign(
              {
                username: user[0].username,
                email: user[0].email,
                userId: user[0]._id,
              },
              process.env.SECRET_KEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Thanks for login In " + user[0].username,
              user: user[0],
              token: token
            });
          }
          res.status(401).json({
            message: "Invalid credentials, authentication failed"
          }) 
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "Server could not serve log in petition, please try again"
      });
    });
  },

  delete_user: (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted succesfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: "Serve could not delete user, please try again"
      })
    });
  }

}

module.exports = UserController