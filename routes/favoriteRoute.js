var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Itinerary = require("../models/itinerary");
// const checkItin = require("../middleware/check-itineraries");


router.put("/favourites", (req, res) => {
  User.find({ email: req.body.email})
        .exec()
        .then(user => { 
          console.log(user);
        if (user[0].favourites.includes(req.body.favourites)) {
            res.send("This favorite already exists"); 
        } else 
        User.update(
            {
            email: req.body.email
            },
            {$push: {favourites: req.body.favourites}}
        ).then(result => {
            res.status(200).json({
                result
            })
        })  
    })
})
//     .then(itineraries => {
//       Itinerary.find({ _id: { $in: itineraries } }).then(itinerariesFull => {
//         res.status(200).send(itinerariesFull);
//         return itinerariesFull;
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// });

router.post("/getFavoriteItinerary", (req, res) => {
    Itinerary.find({ _id: { $in: req.body.id } }).then(itineraries => {
      res.send(itineraries);
    });
  });
  
  router.post("/deleteFavorite", (req, res) => {
    User.findOneAndUpdate(
      { email: req.body.user.email },
      { $pull: { favorite: req.body.id } },
      { upsert: true }
    )
      .then(account => {
        var newFavorites = account.favorite;
        res.status(200).send(newFavorites);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  
  module.exports = router;