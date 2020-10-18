const mongoose = require('mongoose')
const validator = require('validator')

const jetSkiSchema = new mongoose.Schema({
    specifications: {
        type: String,
        trim: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    model: {
        type: Number,
        required: true,
        validate(value){
            if(value < 2017 ){
                throw new Error('JetSki model have to be greater than or equals to 2017')
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})



const JetSki = mongoose.model('JetSki', jetSkiSchema)


module.exports = JetSki