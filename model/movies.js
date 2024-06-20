const mongoose = require("mongoose")
const Joi = require("joi")
const {genreSchema} = require("./genres")

const Movies = mongoose.model("Movies", new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength:3,
        maxlength: 15,
        trim: true

    },
    genre:{
        type:genreSchema,
        required: true
    },

    numberInStock: {
        type:Number,
        required: true,
        min:0,
        max:255

    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min:0,
        max:255

    },


}))

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    });

    return schema.validate(movie);
}

exports.validate = validateMovie;
exports.Movies = Movies;
