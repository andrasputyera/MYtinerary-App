const express = require('express');
const router = express.Router();
const multer = require('multer');
const city = require("./../models/city");
const Itinerary = require("./../models/itinerary");
const Activity = require("./../models/activity");
const Comment = require("./../models/comment");
const User = require("./../models/user");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');


//creating storage for uploaded files
const storage = multer.diskStorage ({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
cb(null, file.originalname);
}
});

const upload = multer({storage: storage});


//get city from mlab db
router.get('/city', function(req, res){
    city.find().then(cities => res.send(cities));
});

//get itinerary from mlab db

router.get('/itinerary', function(req, res){
    console.log("in")
    Itinerary.find().then(itineraries => res.send(itineraries));
});

//get itineraries by city

router.get('/itinerary/:city_id', function(req, res){
    Itinerary.find({city_id:req.params.city_id}).then(results => res.send(results));
});

//get activities from mlab db

router.get('/activity', function(req, res){
    console.log("in")
    Activity.find().then(activities => res.send(activities));
});


//get activities by itinerary

router.get('/activity/:itinerary_id', function(req, res){
    Activity.find({itinerary_id:req.params.itinerary_id}).then(results => res.send(results));
});

//get comments from mlab

router.get('/comments', function(req, res){
    Comment.find().then(comments => res.send(comments));
});


//get comments by itinerary

router.get('/comments/:itinerary_id', function(req, res){
    console.log("in",req.params.itinerary_id)
    Comment.find({itinerary_id:req.params.itinerary_id}).then(results => res.send(results));
});


//add city to the mlab db

router.post('/city', function(req, res){
// res.send({type:'POST'});
city.create(req.body).then(function(city){
res.send(city);
});
});

//add itinerary to mlab db

router.post('/itinerary', upload.single('profilePic'), (req, res) => {
    console.log(req.file)
    const itinerary = Itinerary({
        city_id: req.body.city_id,
        title: req.body.title,
        profilePic: req.file.path,
        rating: req.body.rating,
        duration: req.body.duration,
        cost: req.body.cost,
        hashtags: req.body.hashtags,
    });
    Itinerary.create(itinerary).then(function(results){
    res.send(results);
    });
});

//add activity to mlab db

router.post('/activity', upload.single('activityPic'), (req, res) => {
    console.log(req.file)
    const activity = Activity({
        itinerary_id: req.body.itinerary_id,
        title: req.body.title,
        activity: req.body.activity,
        activityPic: req.file.path,
        city_id: req.body.city_id,
    });
    Activity.create(activity).then(function(results){
    res.send(results);
    });
});

//add comments to mlab db

router.post('/comments', checkAuth, (req, res) => {
    console.log("here",req.body);
    const comment = Comment({
        itinerary_id: req.body.itinerary_id,
        username: req.body.username,
        comment: req.body.comment
    });
    Comment.create(comment).then(function(results){
    res.send(results);
    });
});

// add users to mlab db

router.post('/user/register', (req, res, next) => {
    console.log("In Post User")
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >=1) {
            if(req.body.provider == 'google' || req.body.provider == 'facebook'){
               var query = {email: req.body.email},
                    update = {
                        firstname: req.body.firstname,
                        lastname: req.bodylastname
                    },           
                    options = { upsert: true, new: true};

                User.findOneAndUpdate(query, update, options, function(err,data) {
                  if (err) return next(err);
                  //res.status(201).json({message: 'User login'});
                  JWTToken(user[0],res);
                });
            }else{
                return res.status(409).json({
                    message: 'Email exists'
                });
            }
            
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } 
                else {
                    
                    const user = User({
                        username: req.body.username,
                        password: hash,
                        email: req.body.email,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        country: req.body.country
                    });
                    User
                        .create(user)
                        .then(result => {
                            console.log(result);
                            
                            if(req.body.provider == 'google' || req.body.provider == 'facebook'){
                                JWTToken(result,res)
                            }else{
                                res.status(201).json({message: 'User created'});
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                        error: err
                    });
                });
                }
            });
        }
    })
});

function JWTToken (user,res){
    const token = jwt.sign(
                { email: user.email,userId: user._id,username: user.username}, 'mytineraryapp',
                { expiresIn: "24h" }
            );
            return res.status(200).json({
                message: "Authorization successful",
                token: token,
                user:{ userName: user.username,  userId: user._id,email: user.email}
    });
}

//login users who are already registered in mlab

router.post('/user/login', (req, res, next) => {
    console.log(req.body);
User.find({ email: req.body.email})
.exec()
.then(user => {
    if (user.length < 1) {
        return res.status(401).json({
            message: "Authorization failed"
        });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
            return res.status(401).json({
                message: "Authorization failed"
            });
        }
        if (result) {
            const token = jwt.sign(
                {
                email: user[0].email,
                userId: user[0].id,
                username: user[0].username
                }, 
                process.env.JWT_KEY,
                {
                expiresIn: "24h"
                }
            );
            return res.status(200).json({
                message: "Authorization successful",
                token: token,
                user:{ userName: user[0].username,  userId: user[0].id,   email: user[0].email}
            });
        }
        res.status(401).json({
                message: "Authorization failed"
                
        });
    });
})
    .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
        });
    });
});

//delete users with same id from mlab

// router.delete("/userId", (req, res, next) => {
//     User.remove({_id:req.params.userId})
//     .exec()
//     .then(result => {
//         res.status(200).json({
//             message: 'User deleted'
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     });
// });





router.post('/user/socialLogin', (req, res, next) => {
    console.log("In Post User")
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length >=1) {
               var query = {email: req.body.email},
                    update = {
                        firstname: req.body.firstname,
                        lastname: req.bodylastname
                    },           
                    options = { upsert: true, new: true};

                User.findOneAndUpdate(query, update, options, function(err,data) {
                  if (err) return next(err);
                  //res.status(201).json({message: 'User login'});
                  JWTToken(user[0],res);
                });  
        } else {                    
            const user = User({
                username: req.body.username,
                password: null,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                country: req.body.country
            });
            User.create(user).then(result => {
                        JWTToken(result,res)
                 
            }).catch(err => {
                res.status(500).json({error: err});
            });
                
            
        }
    })
});

router.get('/profiles',checkAuth, function(req, res){
    var token = req.userData;
    User.find({ email: token.email}).exec().then(user => {
        if (user.length < 0) {
            return res.status(401).json({
                message: "Authorization failed"
            });
        }else{
            return res.status(200).json(user[0]);
        }
    });
});

module.exports = router;