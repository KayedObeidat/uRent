const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const JetSki = require('../models/jetski')
const Boat = require('../models/boat')
const Car = require('../models/car')
const mongoose = require('mongoose')
const MotorCycle = require('../models/motorcycle')
const BiCycle = require('../models/bicycle')
const auth = require('../middleware/auth')

router.post('/bicycle', auth, async(req, res) => {
    const bicycle = new BiCycle({
        ...req.body,
        owner: req.user._id
    })
    try{
        await bicycle.save()
        res.status(201).send(bicycle)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/bicycle', async(req, res) => {
    try{
        const bicycles = await BiCycle.find({  })
        res.send(bicycles) 
    }catch(e){
        res.status(500).send()
    }
})

router.get('/bicycle/:id', async(req, res) => {
    try{
        const bicycle = await BiCycle.findById(req.params.id)
        if(!bicycle){
            return res.status(404).send()
        }
        res.send(bicycle)
    }catch(e){
        res.status(500).send()
    }   
})

router.patch('/bicycle/update/:id', async(req, res) => {
    const updates = Object.keys(req.body)
        const allowedUpdates = ['specifications', 'pricePerHour', 'isHelmetIncluded']
            const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update)
            })
            if(!isValidOperation){
                res.status(400).send({ error: 'Invalid Updates' })
            }
            try{
                const bicycle = await BiCycle.findById(req.params.id)
                updates.forEach((update) => {
                    bicycle[update] = req.body[update]
                })
                await bicycle.save()
                if(!bicycle){
                    return res.status(404).send()
                }
                res.send(bicycle)
            }catch(e){
                res.status(500).send(e)
            }
})

router.delete('/bicycle/delete/:id', async(req, res) => {
    try{
        const bicycle = await BiCycle.findByIdAndDelete(req.params.id)
        if(!bicycle){
            return res.status(404).send()
        }
        res.send(bicycle)
    }catch(e){  
        res.status(500).send(e)
    }
})

module.exports = router