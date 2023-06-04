const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

const getSubscriber = async (req, res, next) => {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({message : 'Cannot find Subsciber'});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({message : err.message});
    }

    res.subscriber = subscriber;
    next()
}

//get all
router.get('/', async (req, res) => {
    console.log('here');
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
})
// getting one
router.get('/:id', getSubscriber ,async (req, res) => {
    res.json(res.subscriber);
})

// creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name : req.body.name,
        subscribedToChannel : req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch(error) {
        res.status(400);
    }
})
// updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch(err) {
        res.status(400).json({message : err.message})
    }

})
// deleting one
router.delete('/:id', getSubscriber, async(req, res) => {
    
    try {
        await res.subscriber.deleteOne();
        res.status(200).json({message : "Subscriber Deleted"})
    } catch (err) {
        res.status(500).json({message : err.message})
    } 
})

module.exports = router;