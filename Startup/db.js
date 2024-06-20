const winston = require('winston')
const mongoose = require('mongoose')


module.exports = function () {
    const db = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/vidly_test' : 'mongodb://localhost/vidly';
    mongoose.connect(db)
        .then(() => console.log(`Connected to ${db}...`))
        .catch(err => console.error('Could not connect to MongoDB...', err));

}