const mongoose = require('mongoose')
const Joi=require('joi');

const Customer = mongoose.model('customers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,

    },
    phone : {
        type:Number,
        required: true,
        minlength: 6,
        maxlength: 12
    },
    isGold: {
        type: Boolean,
        default: false,
    },

}))



function validatecustomers(Customers) {
    const schema = Joi.object({
        name: Joi.string().min(6).max(50).required(),
        phone: Joi.string().min(6).max(50).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(Customers);
}

exports.Customer = Customer
exports.validate = validatecustomers 


