const mongoose = require('mongoose');

//schema for policy

const policySchema = new mongoose.Schema({
    policy: {
        type:String,
        required:true,
        max:12000
    }
});

module.exports = mongoose.model('Policy', policySchema);