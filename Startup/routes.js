const genres = require('../Routes/genres');
const home = require('../Routes/home');
const customers = require('../Routes/customers')
const movie = require('../Routes/movies')
const rental = require('../Routes/rental')
const users = require('../Routes/Users')
const auth = require('../Routes/auth')
const express = require('express'); 

const error = require('../middleware/error')


module.exports = function (app) {

    app.use(express.json());
    app.use('/', home);
    app.use('/api/genres', genres);
    app.use('/api/customers', customers)
    app.use('/api/movie', movie)
    app.use('/api/users', users)
    app.use('/api/rental', rental)
    app.use('/api/auth', auth)

    app.use(error)

}