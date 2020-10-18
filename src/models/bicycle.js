const mongoose = require('mongoose')
const validatore = require('validator')

const bicycleSchema = new mongoose.Schema({
    specifications: {
        type: String,
        trim: true,
    },
    pricePerHour: {
        type: Number,
        default: 10
    },
    model: {
        type: Number,
        required: true,
        validate(value){
            if(value < 2017 ){
                throw new Error('Car model have to be greater than or equals to 2017')
            }
        }
    },
    isHelmetIncluded: {
        type: Boolean,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})


const Bicycle = mongoose.model('BiCycle', bicycleSchema)

module.exports = Bicycle