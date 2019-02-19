const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;


//create comment Schema & Model
const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    country: {
        type: String
    },
    favourites: {
        type: Array
      }
});

const User = mongoose.model('users', userSchema);
userSchema.plugin(findOrCreate);

module.exports = User;