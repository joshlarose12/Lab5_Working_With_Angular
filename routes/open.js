const router = require('express').Router();
const User = require('../model/User');
const Song = require('../model/Song');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, songValidation } = require('../validation');


router.post('/register', async (req, res) => {

    //validate information
    const { error } = registerValidation(req.body)
    if (error != null) return res.status(400).send(error.details[0].message);

    //Check if user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPasswprd = await bcrypt.hash(req.body.password, salt);

    //create user
    const user = new User({
        email: req.body.email,
        password: hashedPasswprd
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
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET,{expiresIn:'30s'});
    res.header('auth-token', token).send({ token: token });

    res.send('Logged in!!');

});

router.get('/songs', (req, res) => {
    Song.find(function (err, songs) {
        if (err) return next(err);

        res.send(songs);
    });
});

// router.get('/search', async (req, res) => {
//     let search = req.query.search;

//     Song.find({
//         $or: [{ title: search },
//         { title: search },
//         { artist: search },
//         { album: search }]
//     }})
// });

module.exports = router;