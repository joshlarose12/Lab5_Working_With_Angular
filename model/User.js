const mongoose = require('mongoose');

//schema for users

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        max:255
    },
    password: {
        type:String,
        required:true,
        max: 1024,
        min:6
    },
    date: {
        type: Date,
        default: Date.now
    },
    admin:{
        type:Boolean
    },
    deactivated:{
        type:Boolean
    }
});

module.exports = mongoose.model('User', userSchema);