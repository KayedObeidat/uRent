const mongoose = require('mongoose')
const validator = require('validator')

const boatSchema = new mongoose.Schema({
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
                throw new Error('Boat model have to be greater than or equals to 2017')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Boat = mongoose.model('Boat', boatSchema)

module.exports = Boat