const router = require('express').Router();
const Song = require('../model/Song');
const verify = require('./privateRoutes');



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
        rating: req.body.rating
    });
    try {
        const savedSong = await song.save();
        res.send({ song: song._id });
    } catch (err) {
        res.status(400).send(err)
    }
});