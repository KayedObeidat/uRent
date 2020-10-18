const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const JetSki = require('../models/jetski')
const Boat = require('../models/boat')
const Car = require('../models/car')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')

router.post('/car', auth, async(req, res) => {
    const car = new Car({
        ...req.body,
        owner: req.user._id
    })
    try{
        await car.save()
        res.status(201).send(car)        
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/car', async(req, res) => {
    try{
        const cars = await Car.find({  })
        res.send(cars)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/car/:id', async(req, res) => {
    try{
        const car = await Car.findById(req.params.id)
        if(!car){
            return res.status(404).send()
        }
        res.send(car)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/car/update/:id', async(req, res) => {
    const updates = Object.keys(req.body)
        const allowedUpdates = ['specifications', 'pricePerHour']
            const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update)
            })
            if(!isValidOperation){
                res.status(400).send({ error: 'Invalid Updates' })
            }
            try{
                const car = await Car.findById(req.params.id)
                updates.forEach((update) => {
                    car[update] = req.body[update]
                })
                await car.save()
                if(!car){
                    res.status(404).send()
                }
                res.send(car)
            }catch(e){
                res.status(500).send()
            }
})

router.delete('/car/delete/:id', async(req, res) => {
    try{
        const car = await Car.findByIdAndDelete(req.params.id)
        if(!car){
            return res.status(404).send()
        }
        res.send(car)
    } catch(e){
        res.status(500).send()
    }
})

module.exports = router