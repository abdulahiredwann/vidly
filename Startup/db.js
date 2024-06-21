const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    const db = process.env.MONGODB_URI;
    mongoose.connect(db)
        .then(() => {
            winston.info(`Connected to ${db}...`);
            console.log(`Connected to ${db}...`);
        })
        .catch(err => {
            winston.error('Could not connect to MongoDB...', err);
            console.error('Could not connect to MongoDB...', err);
        });
}