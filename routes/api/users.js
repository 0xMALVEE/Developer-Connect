const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const axios = require("axios");
const auth = require("../../middleware/auth");

// User Model
const User = require('../../models/User');
const Post = require("../../models/Post");

//Get All User
router.get("/get_all_users",function(req,res){
  User.find()
  .sort({ _id: -1 })
  .skip(parseInt(req.query.skip))
  .limit(parseInt(req.query.count))
  .then(data => res.json(data));
});

//Get User and User Posts With Username
router.get("/",function(req,res){
  User.find({username:req.query.username})
  .then(data => {
    Post.find({user: data[0]._id})
    .then( postData =>{
       res.json({userData:data[0],userPosts:postData});
      })
    .catch(err => res.json(err))
  })
  .catch(err => res.json(err))
})

//Get Only User Data With User name
router.get("/only",function(req,res){
  User.find({username:req.query.username})
  .then(data => {
    res.json(data)
  })
  .catch(err => res.json(err))
})

//Update/Complete User Profile
router.post("/complete", auth, function(req,res){
  User.findOneAndUpdate({_id:req.user.id}, { 
    developer_type:req.body.developer_type,
    location: req.body.location,
    work: req.body.work,
    gender: req.body.gender,
    bio: req.body.bio,
    github_link: req.body.github_link,
    twitter_link: req.body.twitter_link,
    youtube_link: req.body.youtube_link,
    website_link: req.body.website_link
  } )
  .then(data => {
    res.json(data);
  })
  .catch(err => res.json(err))
})


// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password, github_profile, username } = req.body;

  // Simple validation
  if(!name || !email || !password || !github_profile || !username) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'Email already exists' });
      
      User.findOne({ username: username.split(/\s/).join('') })
        .then(user =>{
          if(user) return res.status(400).json({msg: "Username Already Exists"})

          else{
            // Create User Here
            axios
            .get(
              `https://api.github.com/users/${
                github_profile
              }?client_id=1f7d4bd7d76b1c687133&client_secret=e32a1efe1bd61540225d67e99796d8b6f6d865ca`
            )
            .then(gitres => {
              const newUser = new User({
                name,
                email,
                password,
                username: username.split(/\s/).join(''),
                github_profile,
                github_profile_img:gitres.data.avatar_url
              });
        
              // Create salt & hash
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if(err) throw err;
                  newUser.password = hash;
                  newUser.save()
                    .then(userData => {
                      console.log(userData.id)
                      jwt.sign(
                        { id: userData.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                          console.log(token);
                          res.json({
                            token,
                            user: {
                              id: userData.id,
                              name: userData.name,
                              email: userData.email
                            }
                          });
                        }
                      )
                    });
                })
              });
              
            })
            .catch(error => res.status(400).json({msg: "Github Username Is Not Valid"}));
          }
        })
    })
});

module.exports = router;
