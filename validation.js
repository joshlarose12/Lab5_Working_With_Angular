//VALIDATION
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data)
}

//Login validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data)
}

//song validation
const songValidation = data => {
    const schema = Joi.object({
        title: Joi.string()
            .required()
            .max(30),
        artist: Joi.string()
            .required()
            .max(30),
        album: Joi.string()
            .required()
            .max(30),
        year: Joi.number()
            .min(1900)
            .max(2020),
        comment: Joi.string()
            .max(30),
        genre: Joi.number()
            .max(1),
        ratingAvg: Joi.number()
            .max(5)
    });
    return schema.validate(data);
}
const reviewValidation = data => {
    const schema = Joi.object({
        review: Joi.string()
            .required()
            .max(1000),
        username: Joi.string()
            .required()
            .max(255),
        rating: Joi.number()
            .required()
            .max(5)
            .min(0),
    });
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.songValidation = songValidation;
module.exports.reviewValidation = reviewValidation;