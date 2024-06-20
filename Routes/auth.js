const express = require('express');
const router = express.Router();
const {User} = require('../model/User')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')



// router.get('/', async (req, res) => {
//     const users = await User.find().sort('name')
//     const filteredUsers = users.map(users => _.pick(users, ['name', 'email']));
//     res.send(filteredUsers);
// });

router.post('/', async (req, res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid email or password')


    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or Password')
    
    
    const token = user.generateAuthToken()
    res.send(token)
    

    

})


function validate(req) {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(5).max(1024).required()
    });
    return schema.validate(req);
}


module.exports = router;
