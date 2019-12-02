const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 30
    },
    artist: {
        type: String,
        required: true,
        max: 30,
    },
    album: {
        type: String,
        required: true,
        max: 30
    },
    year: {
        type: Number,
        min: 1900,
        max: 2020
    },
    comment: {
        type: String,
        max: 30
    },
    genre: {
        type: Number,
        max: 1
    },
    rating:{
        type: Number,
        max: 5
    }

});

module.exports = mongoose.model('Song', songSchema);