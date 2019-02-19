var user = require("../models/user");

module.exports = (req, res, next, done) => {
  let user = req.body;

  user.findOne({ email: user.user }).then(user => {
    console.log("this should be user.faovurite", user.favourite);
    var itineraries = user.favourite;
    console.log("this should be itineraries", itineraries);
    req.itineraries = itineraries;
    console.log("this should be re1.itineraries", req.itineraries);
  }),
    next();
};