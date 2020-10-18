const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const JetSki = require('../models/jetski')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')


router.post('/JetSki', auth, async (req, res) => {
    const jetSki = new JetSki({
        ...req.body,
        owner: req.user._id
    })
    try {
        await jetSki.save()
        res.status(201).send(jetSki)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/JetSki', async (req, res) => {

    try {
        const jetSkis = await JetSki.find({  })
        res.send(jetSkis)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/JetSki/:id', async (req, res) => {
    const _id = req.params.id

        try {
            const jetSki = await JetSki.findById(_id)
            if(!jetSki) {
                return res.status(404).send()
            }
            res.send(jetSki)
        } catch (e) {
            res.send(500).send()
        }
})

router.patch('/JetSki/update/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
        const allowedUpdates = ['specifications', 'pricePerHour']
            const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update)
            })
            if(!isValidOperation) {
                res.status(400).send({ error: 'Invalid Updates' })
            }

    try {
        const jetSki = await JetSki.findOne({ _id: req.params.id, owner: req.user._id })           
            
        if(!jetSki){
            return res.status(404).send()
        }
        
        updates.forEach((update) => {
            jetSki[update] = req.body[update] 
        })
        await jetSki.save()
        res.send(jetSki)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/JetSki/delete/:id', async(req, res) => {
    try {
        const jetSki = await JetSki.findByIdAndDelete(req.params.id)
        if(!jetSki) {
            return res.status(404).send()
        }
        res.send(jetSki)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router