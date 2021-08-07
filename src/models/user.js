const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating:{
        type: Number,
        default: 1000
    },
    races:{
        type: Number,
        default: 0
    },
    img: {
        type: String,
        default: "whiteshyguy.png",
        trim: true
    }
}) 

module.exports = User