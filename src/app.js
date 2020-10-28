const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const JetSki = require('./models/jetski')
const Boat = require('./models/boat')
const Car = require('./models/car')
const MotorCycle = require('./models/motorcycle')
const BiCycle = require('./models/bicycle')
const mongodb = require('mongodb')
const userRouter = require('./routers/user')
const jetSkiRouter = require('./routers/jetSki')
const boatRouter = require('./routers/boat')
const carRouter = require('./routers/car')
const motorCycleRouter = require('./routers/motorCycle')
const biCycleRouter = require('./routers/bicycle')
// const passport = require('passport')
// const passportlocalmongoose = require('passport-local-mongoose')

const app = express()

app.use(express.json())

const router = new express.Router()

app.use(userRouter)
app.use(jetSkiRouter)
app.use(carRouter)
app.use(boatRouter)
app.use(motorCycleRouter)
app.use(biCycleRouter)
// app.use(passport.initialize())
// app.use(passport.session())


// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// const LocalStrategy = require('passport-local').Strategy
// passport.use(new LocalStrategy(User.auth))

// const main = async() => {
//     const user = await User.findById('5f8ef15c713d304adcc039a8')
//     await user.populate('jetSkis').populate('cars').populate('boats').populate('motorCycles').populate('biCycles').execPopulate()
//     // await user.populate('cars').execPopulate()
//     // await user.populate('boats').execPopulate()
//     // await user.populate('motorCycles').execPopulate()
//     // await user.populate('biCycles').execPopulate()
//     console.log(user.jetSkis, user.cars, user.boats, user.motorCycles, user.biCycles)
//     // console.log(user.cars)
//     // console.log(user.boats)
//     // console.log(user.motorCycles)
//     // console.log(user.biCycles)
// }

// main()

module.exports = app