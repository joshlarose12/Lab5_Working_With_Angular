const router = require('express').Router();
const verify = require('./privateRoutes');
//test route
router.get('/',verify, (req,res) =>{
    res.json({
        posts: {
            title: 'my first post',
            description:'random data'
        }
    });
});

module.exports = router;