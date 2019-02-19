const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router
.route('/google')
.post(
  passport.authenticate('google', { scope: ['profile'] }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      {
        email: user.email,
        name: user.firstName + " " + user.lastName
      },
      process.env.JWT_KEY,
      {
        expiresIn: "24h"
      }
    );
    res.status(200).json({ user: user, token: token });
  }
);

// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"]
//   })
// );

// router.get("/logout", (req, res) => {
//   res.send("logouting");
// });


// router.get("/google/callback", passport.authenticate("google"), (req, res) => {
//   //console.log(req);
//   const user = req.user;
//   const token = jwt.sign(
//     {
//       email: user.email,
//       name: user.firstName + " " + user.lastName
//     },
//     process.env.JWT_KEY,
//     {
//       expiresIn: "24h"
//     }
//   );
//   const accessToken = token;
//   res.render("https://localhost:3000/accountlogin", { token: accessToken });
// });

// router
//   .route("/googlelogin")
//   .post(
//     googleLogin,
//     (req, res) => {
//       const user = req.user;
//       const token = jwt.sign(
//         {
//           email: user.email,
//           name: user.firstName + " " + user.lastName
//         },
//         process.env.JWT_KEY,
//         {
//           expiresIn: "24h"
//         }
//       );
//       res.status(200).json({ user: user, token: token });
//     }
//   );



// router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/profile');
//   });

module.exports = router;

