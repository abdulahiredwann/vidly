const Joi = require('joi')
const mongoose = require('mongoose')


const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required:true,
                minlenght: 5,
                maxlenght: 50,

            },
            isGold: {
                type: Boolean,
                default: false
            },

            phone : {
                type: String,
                required: true,
                minlenght: 5,
                maxlenght:50

            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlenght:5,
                maxlenght:255
            },
            dailyRentalRate: {
                type:Number,
                required: true,
                min:0,
                max:255,
            }

        }),
        required: true
    },

    dateOut: {
        type:Date,
        required: true,
        default: Date.now()
    },
    dateReturned: {
        type:Date
    },

    rentalFee: {
        type: Number,
        min:0
    }

}));

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.obejectId().required(),
        movieId: Joi.obejectId().required(),
    });

    return schema.validate(rental);
}

exports.validate = validateRental;
exports.Rental = Rental;
