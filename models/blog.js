const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    tagline: {
        type: String,
        required: true,
    },
    blog: {
        type: String,
        required: true,
        unique: true
    },
    blogger: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    }
})
module.exports = mongoose.model('Blog', blogSchema)