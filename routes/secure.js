const router = require('express').Router();
const Song = require('../model/Song');
const Review = require('../model/Review');

const verify = require('./privateRoutes');
const {songValidation, reviewValidation} = require('../validation');



router.post('/songs/create',verify, async (req, res) => {
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
        ratingAvg: req.body.rating
    });
    try {
        const savedSong = await song.save();
        res.send({ song: song._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/review/add',verify, async(req,res)=>{
    const { error } = reviewValidation(req.body)
    if (error != null) return res.status(400).send(error.details[0].message);

    //create review
    const review = new Review({
        review: req.body.review,
        username: req.body.username,
        rating: req.body.rating,
    });
    try {
        const savedReview = await review.save();
        res.send({ review: review._id });
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;