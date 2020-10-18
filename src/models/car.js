const mongoose = require('mongoose')
const validator = require('validator')

const carSchema = new mongoose.Schema({
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Car = mongoose.model('Car', carSchema)

module.exports = Car