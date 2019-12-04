const router = require('express').Router();
const User = require('../model/User');
const Song = require('../model/Song');
const Review = require('../model/Review')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../validation');
const stringSimilarity = require('string-similarity');

router.post('/register', async (req, res) => {

    //validate information
    const { error } = registerValidation(req.body)
    if (error != null) return res.status(400).send(error.details[0].message);

    //Check if user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create user
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        admin: false 
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/login', async (req, res) => {
    console.log("attemted login")
    //validate information
    const { error } = registerValidation(req.body)
    if (error != null) return res.status(400).send(error.details[0].message);

    //Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email is incorrect");

    //Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    //Create and assign web token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '5m' });
    res.header('auth-token', token).send({ token: token, admin:user.admin });

    //res.send('Logged in!!');

});

router.get('/songs', (req, res) => {
    Song.find(function (err, songs) {
        if (err) return next(err);

        res.send(songs);
    });
});

router.get('/search', async (req, res) => {

    Song.find(function (err, songs) {
        var array = new Array(songs.length);
        if (err) return next(err);

        for (x = 0; x < songs.length; x++) {
            if ((songs[x].title != undefined && stringSimilarity.compareTwoStrings(req.query.search, songs[x].title) >= 0.4) ||
                songs[x].album != undefined && stringSimilarity.compareTwoStrings(req.query.search, songs[x].album) >= 0.4 ||
                songs[x].artist != undefined && stringSimilarity.compareTwoStrings(req.query.search, songs[x].artist) >= 0.4 ||
                songs[x].comment != undefined && stringSimilarity.compareTwoStrings(req.query.search, songs[x].comment) >= 0.4 ||
                songs[x].year != undefined && stringSimilarity.compareTwoStrings(req.query.search, String(songs[x].year)) >= 0.4) {
                array[x] = songs[x];
            }
            array.filter(function (el) {
                return el != null;
            });
        }
        
        res.send(array);
    });
});

router.get("/review", async (req, res) => {
    console.log("query" + req.query.song);
    Review.find({ song: req.query.song }, function (err, review) {
        if (err) return next(err);

        res.send(review);
    })
})

module.exports = router;