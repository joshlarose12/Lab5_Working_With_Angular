const router = require('express').Router();
const Song = require('../model/Song');
const Review = require('../model/Review');
const Policy = require('../model/Policy');
const mongoose = require('mongoose');

const verify = require('./privateRoutes');
const { songValidation, reviewValidation } = require('../validation');


//create a song
router.post('/songs/create', verify, async (req, res) => {
    console.log("attempted to create a song");

    const { error } = songValidation(req.body)
    if (error != null) return res.status(400).send(error.details[0].message);

    //check if song alerady exists
    const songExist = await Song.findOne({ title: req.body.title });
    if (songExist) return res.status(400).send("Song already exists");

    //create song
    const song = new Song({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        comment: req.body.comment,
        genre: req.body.genre,
        ratingAvg: 0,
        totalRev: 0,
        hidden: false
    });
    try {
        const savedSong = await song.save();
        res.send({ song: song._id });
    } catch (err) {
        res.status(400).send(err);
    }
});
//create a review
router.post('/review/add', verify, async (req, res) => {
    const { error } = reviewValidation(req.body)
    if (error != null) return res.status(400).send(error.details[0].message);

    //create review
    const review = new Review({
        review: req.body.review,
        username: req.body.username,
        rating: req.body.rating,
        song: req.body.song
    });
    try {
        const savedReview = await review.save();
        res.send({ review: review._id });
    } catch (err) {
        res.status(400).send(err)
    }

    //attempting to update review
    const song = await Song.findOne({ title: req.body.song });
    var total = song.totalRev + 1;
    console.log(song);
    var avg = (song.ratingAvg + req.body.rating) / total;
    console.log(avg);
    const update = {totalRev:total,ratingAvg:avg}

    Song.findByIdAndUpdate(song._id,update);
    // .update({ _id: song._id }, {
    //     $set: {

    //         "totalRev": total,
    //         "ratingAvg": avg
    //     }
    // });

});
router.post('/policy', async (req, res) => {
    //create review
    const policy = new Policy({
        policy: req.body.policy,   
    });
    try {
        const savedPolicy = await policy.save();
        res.send({ policy: policy._id });
    } catch (err) {
        res.status(400).send(err);
    }
});



module.exports = router;