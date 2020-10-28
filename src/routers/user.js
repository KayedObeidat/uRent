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
// const passport = require('passport')

router.post('/users/signup', async(req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }catch(e){
        res.status(400).send(e)
    }
})


// router.post('/users/signup', async (req, res) => {
//     const user = new User(req.body)

//     try {
//         await user.save()
//         // const token = await user.generateAuthToken()
//         res.status(201).send(user)
//     } catch(e) {
//         res.status(400).send(e)
//     }
// })


// router.post('/users/login', passport.authenticate('local', {
//     successRedirect: '/jetski',
//     failureRedirect: '/users/login'
// }), function (req, res) {

// })

router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users', async (req, res) => {
    
    try {
        const users = await User.find({  })
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/property', async(req, res) => {
//     console.log(req.params.id)
//     try{
//         const user = await User.findById(req.params.id)
//     if(!user){
//         res.status(404).send()
//     }
//  //   const property = await user.populate('jetSkis').populate('cars').populate('boats').populate('motorCycles').populate('biCycles').execPopulate()
//     res.send(property)
//     } catch(e){
//         res.status(500).send(e)
//     }

// })

router.patch('/users/update/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
        const allowedUpdates = ['username', 'email', 'password', 'age']
            const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update)
            })

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid Update' })
    }
    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()
        if(!req.user) {
            return res.status(404).send()
        }
        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    } 
})

router.delete('/users/delete/me', auth, async(req, res) => {
        try {
            await req.user.remove()
            res.send(req.user)
        } catch (e) {
            res.status(500).send(e)
        }
    })

module.exports = router