const passport = require("passport");
require("dotenv").config();
const User = require("../models/user");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(User.createStrategy());

// Allowing passport to serialize and deserialize users into sessions
 passport.serializeUser((user, cb) => cb(null, user));
 passport.deserializeUser((obj, cb) => cb(null, obj));

// The callback that is invoked when an OAuth provider sends back user
// information. Normally, you would save the user to the database
// in this callback and it would be customized for each provider
 
passport.use (
    'google',
    new GoogleStrategy (
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://localhost:5000/auth/google/callback",
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    async (accessToken, refreshToken, profile, done) => {
        User.findOne ({ email: profile.emails[0].value}).then(existingUser => {
            if (existingUser) {
                let user = existingUser;
                done(null, user);
            }   else {
                new User ({
                    username: profile.displayName,
                    googleId: profile.id,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    email: profile.emails[0].value
                })
                .save()
                .then(newUser => {
                    let user = newUser;
                    done(null, user);
                });
            }
        });
    },
    )
);