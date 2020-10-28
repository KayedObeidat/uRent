const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const JetSki = require('../../src/models/jetSki')
const boat = require('../../src/models/boat')
const Boat = require('../../src/models/boat')
const Car = require('../../src/models/car')
const MotorCycle = require('../../src/models/motorcycle')
const BiCycle = require('../../src/models/bicycle')
const Bicycle = require('../../src/models/bicycle')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    username: 'wajeehobeidat',
    email: 'wajeehobeidat@yahoo.com',
    password: 'wajeehobeidat',
    age: 20,
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    username: 'kayed',
    email: 'kayed@yahoo.com',
    password: 'kayedobeidat',
    age: 20,
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const jetSkiOne = {
    _id: new mongoose.Types.ObjectId(),
    specifications: '2000cc great engine',
    model: 2018,
    pricePerHour: 20,
    owner: userOne._id
}

const jetSkiTwo = {
    _id: new mongoose.Types.ObjectId(),
    specifications: '2000cc great engine',
    model: 2019,
    pricePerHour: 20,
    owner: userOne._id
}

const jetSkiThree = {
    _id: new mongoose.Types.ObjectId(),
    specifications: '2500cc great engine',
    model: 2019,
    pricePerHour: 25,
    owner: userTwo._id
}

const boatOne = {
    _id: new mongoose.Types.ObjectId(),
    specifications: 'Fast boat , two seats, 3000cc engine',
    model: 2018,
    pricePerHour: 20,
    owner: userOne._id
}

const boatTwo = {
    _id: new mongoose.Types.ObjectId(),
    specifications: 'legend ride',
    model: 2020,
    pricePerHour: 70,
    owner: userOne._id
}

const boatThree = {
    _id: new mongoose.Types.ObjectId(),
    specifications: 'four seats , grete ride',
    model: 2019,
    pricePerHour: 45,
    owner: userOne._id
}

const carOne = {
    _id: new mongoose.Types.ObjectId(),
    specifications: '3500cc engine, porsche panamera',
    model: 2020,
    pricePerHour: 100,
    owner: userOne._id
}

const carTwo = {
    _id: new mongoose.Types.ObjectId(),
    specifications: '2000cc, kia optima',
    model: 2017,
    pricePerHour: 20,
    owner: userTwo._id
}

const carThree = {
    _id: new mongoose.Types.ObjectId(),
    specifications: '5000cc , F150',
    model : 2020,
    pricePerHour: 80,
    owner: userTwo._id
}

const motorCycleOne = {
    _id: new mongoose.Types.ObjectId(),
    specifications: '1600cc, Kawasaki ninja',
    model: 2020,
    pricePerHour: 65,
    isHelmetIncluded: true,
    owner: userOne._id
}

const motorCycleTwo = {
    _id: new mongoose.Types.ObjectId(),
    specifications: '1000cc,Suzuki',
    model: 2020,
    pricePerHour: 40,
    isHelmetIncluded: true,
    owner: userTwo._id
}

const motorCycleThree = {
    _id: new mongoose.Types.ObjectId(),
    specifications: '200cc, KTM',
    model: 2020,
    pricePerHour: 20,
    isHelmetIncluded: true,
    owner: userTwo._id
}

const biCycleOne = {
    _id: new mongoose.Types.ObjectId(),
    specifications: 'Nice ride',
    model: 2020,
    isHelmetIncluded: true,
    pricePerHour: 15,
    owner:userTwo._id
}

const biCycleTwo = {
    _id: new mongoose.Types.ObjectId(),
    specifications:'Great ride',
    model: 2020,
    pricePerHour: 30,
    isHelmetIncluded: true,
    owner: userOne._id
}

const setupDatabase = async() => {
    await User.deleteMany()
    await JetSki.deleteMany()
    await Boat.deleteMany()
    await Car.deleteMany()
    await MotorCycle.deleteMany()
    await BiCycle.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new JetSki(jetSkiOne).save()
    await new JetSki(jetSkiTwo).save()
    await new JetSki(jetSkiThree).save()
    await new Boat(boatOne).save()
    await new Boat(boatTwo).save()
    await new Boat(boatThree).save()
    await new Car(carOne).save()
    await new Car(carTwo).save()
    await new Car(carThree).save()
    await new MotorCycle(motorCycleOne).save()
    await new MotorCycle(motorCycleTwo).save()
    await new MotorCycle(motorCycleThree).save()
    await new BiCycle(biCycleOne).save()
    await new BiCycle(biCycleTwo).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    jetSkiOne,
    jetSkiTwo,
    jetSkiThree,
    boatOne,
    boatTwo,
    boatThree,
    carOne,
    carTwo,
    carThree,
    motorCycleOne,
    motorCycleTwo,
    motorCycleThree,
    biCycleOne,
    biCycleTwo,
    setupDatabase
}