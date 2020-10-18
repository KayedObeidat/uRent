const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const JetSki = require('../models/jetski')
const mongoose = require('mongoose')
const Boat = require('../models/boat')
const Car = require('../models/car')
const auth = require('../middleware/auth')

router.post('/boat', auth, async(req, res) => {
    const boat = new Boat({
        ...req.body,
        owner: req.user._id
    })
    try{
        await boat.save()
        res.status(201).send(boat)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/boat', async(req, res) => {
    try{
        const boats = await Boat.find({  })
        res.send(boats)
    } catch(e){
        res.status(500).send()
    }
})

router.get('/boat/:id', async(req, res) => {
    try{
        const boat = await Boat.findById(req.params.id)
        if(!boat){
            return res.send(404).send()
        }
        res.send(boat)
    } catch(e){
        res.status(500).send()
    }
})

router.patch('/boat/update/:id', async(req, res) => {
    const updates = Object.keys(req.body)
        const allowedUpdates = ['specifications', 'pricePerHour']
            const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update)
            })
            if(!isValidOperation){
                return res.status(400).send({ error: 'Invalid Updates' })
            }
            try{
                const boat = await Boat.findById(req.params.id)
                updates.forEach((update) => {
                    boat[update] = req.body[update]
                })
                await boat.save()
                if(!boat){
                    return res.status(404).send()
                }
                res.send(boat)
            }catch(e){
                res.status(400).send(e)
            }
})

router.delete('/boat/delete/:id', async(req, res) => {
    try{
        const boat = await Boat.findByIdAndDelete(req.params.id)
        if(!boat){
            return res.status(404).send()
        }
        res.send(boat)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router