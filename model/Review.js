const mongoose = require('mongoose');

//schema for reviews

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
        max: 1000
    },
    username: {
        type: String,
        required: true,
        max: 255
    },
    rating: {
        type: Number,
        max: 5,
        min: 0,
        required: true
    },
    song:{
        type: String,
        required:true,
        max:30
    },


});

module.exports = mongoose.model('Review', reviewSchema);