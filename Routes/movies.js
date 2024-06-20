const express = require('express');
const router = express.Router();
const {Movies, validate} = require("../model/movies");
const {Genre} = require("../model/genres");
const mongoose = require('mongoose')



router.get('/', async (req, res) => {
    const movies = await Movies.find().sort('name')
    res.send(movies);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre')

    const movies = new Movies({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    await movies.save();

    res.send(movies)


});

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const movies = await Movies.findByIdAndUpdate(
        req.params.id, 
        { title: req.body.title }, 
        { new: true} 
    );
    if (!movies) return res.status(404).send('movies with the given id is not found');
    res.send(movies);
});

router.delete('/:id', async(req, res) => {
    const movies = await Movies.findByIdAndDelete(req.params.id)
    if (!movies) return res.status(404).send('movies with the given id is not found');
    res.send(movies);
});

router.get('/:id', async(req, res) => {
    const movies = await Movies.findById(req.params.id)
    if (!movies) return res.status(404).send('movies with the given id is not found');
    res.send(movies);
});
module.exports = router;