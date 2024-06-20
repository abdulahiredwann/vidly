const express = require('express');
const router = express.Router();
const {User, validate} = require('../model/User')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')


router.get('/', async (req, res) => {
    const users = await User.find().sort('name')
    const filteredUsers = users.map(users => _.pick(users, ['name', 'email']));
    res.send(filteredUsers);
});

router.get('/me',auth, async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})

router.post('/', async (req, res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('User alredy registerd')

    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    user = await user.save()

    const token = user.generateAuthToken()

    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email'])
)
})



module.exports = router;
