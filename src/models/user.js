const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JetSki = require('./jetski')
const Boat = require('./boat')
const MotorCycle = require('./motorcycle')
const BiCycle = require('./bicycle')
const Car = require('./car')
const Bicycle = require('./bicycle')
// const passportlocalmongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('You have to enter an email')
            }

        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')) {
                throw new Error('Your password can not have the string password')
            }
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 18) {
                throw new Error('You have to be +18')
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.virtual('jetSkis', {
    ref: 'JetSki',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('cars', {
    ref: 'Car',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('boats', {
    ref: 'Boat',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('motorCycles', {
    ref: 'MotorCycle',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('biCycles', {
    ref: 'BiCycle',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, 'secret')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) {
        throw new Error('Unable to Login')
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if(!isMatched){
        throw new Error('Invalid Login')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {  //to hash only the unhashed passwords
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await JetSki.deleteMany({ owner: user._id })
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Boat.deleteMany({ owner: user._id })
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await MotorCycle.deleteMany({ owner: user._id })
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await BiCycle.deleteMany({ owner: user._id })
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Car.deleteMany({ owner: user._id })
    next()
})


// userSchema.plugin(passportlocalmongoose)

const User = mongoose.model('User', userSchema)

module.exports = User