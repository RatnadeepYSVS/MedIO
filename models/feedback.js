const mongoose = require('mongoose')
const feedBackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        required: true,
        type: String
    },
    query: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    }
})
module.exports = mongoose.model('FeedBack', feedBackSchema)