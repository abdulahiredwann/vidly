const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../model/customers')


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customers = new Customer({ 
        name: req.body.name ,
        phone: req.body.phone,
        isGold: req.body.isGold
    
    })
    customers = await customers.save();

    res.send(customers);

});
router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customers = await Customer.findByIdAndUpdate(
        req.params.id, 
        { 
            name: req.body.name ,
            phone: req.body.phone,
            isGold:req.body.isGold,
            
        }, 
        { new: true} 
    );
    if (!customers) return res.status(404).send('Customer with the given id is not found');
    res.send(customers);

});

router.delete('/:id', async(req, res) => {

    const customers = await Customer.findByIdAndDelete(req.params.id)
    if (!customers) return res.status(404).send('Customer with the given id is not found');
    res.send(customers);


});


router.get('/:id', async(req, res) => {

    const customers = await Customer.findById(req.params.id)
    if (!customers) return res.status(404).send('Customer with the given id is not found');
    res.send(customers);
    

});

module.exports = router;