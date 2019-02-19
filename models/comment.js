const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create comment Schema & Model
const commentSchema = new Schema({
    itinerary_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String
    },
    comment: {
        type: String
    }

});

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;