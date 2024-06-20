
const Joi = require('joi')
module.exports = function(){
    Joi.obejectId = require('joi-objectid')(Joi)
}