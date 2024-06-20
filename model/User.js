const mongoose = require('mongoose')
const Joi = require("joi")
const jwt = require('jsonwebtoken')

const userSchema =  new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlenght: 3,
        maxlenght:50
    },
    email: {
        type:String,
        unique: true,
        minlenght:5,
        maxlenght:255,
        required: true
    },
    password: {
        type:String,
        required:true,
        minlenght:6,
        maxlenght:1024

    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin:this.isAdmin}, process.env.jwtPrivateKey)
    return token
}
const User = mongoose.model("User",userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email(),
        password: Joi.string().min(5).max(1024).required()
    });
    return schema.validate(user);
}
exports.validate = validateUser
exports.User = User