const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const JetSki = require('../models/jetski')
const Boat = require('../models/boat')
const Car = require('../models/car')
const mongoose = require('mongoose')
const MotorCycle = require('../models/motorcycle')
const auth = require('../middleware/auth')

router.post('/motorcycle', auth, async(req, res) => {
    const motorcycle = new MotorCycle({
        ...req.body,
        owner: req.user._id
    })
    try{
        await motorcycle.save()
        res.status(201).send(motorcycle)
    }catch{
        res.status(500).send()
    }
})

router.get('/motorcycle', async(req, res) => {
    try{
        const motorcycles = await MotorCycle.find({  })
        res.send(motorcycles)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/motorcycle/:id', async(req, res) => {
    try{
        const motorcycle = await MotorCycle.findById(req.params.id)
        if(!motorcycle){
            return res.status(404).send()
        }
        res.send(motorcycle)
    }catch(e){
        res.send(500).send()
    }
})

router.patch('/motorcycle/update/:id', async(req, res) => {
    const updates = Object.keys(req.body)
        const allowedUpdates = ['specifications', 'pricePerHour', 'isHelmetIncluded']
            const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update)
            })
            if(!isValidOperation){
                res.status(400).send({ error: 'Invalid Updates' })
            }
            try{
                const motorcycle = await MotorCycle.findById(req.params.id)
                updates.forEach((update) => {
                    motorcycle[update] = req.body[update]
                })
                await motorcycle.save()
                if(!motorcycle){
                    res.status(404).send()
                }
                res.send(motorcycle)
            }catch(e){
                res.status(500).send()
            }
})

router.delete('/motorcycle/delete/:id', async(req, res) => {
    try{
        const motorcycle = await MotorCycle.findByIdAndDelete(req.params.id)
        if(!motorcycle){
            return res.status(404).send()
        }
        res.send(motorcycle)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router