const mongoose = require('mongoose')
const expo = () => {
    const uri = 'mongodb+srv://GOKUKONAN:test@cluster0.nhmpo.mongodb.net/USERS?retryWrites=true&w=majority'
    mongoose.connect(uri, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }).then(() => console.log('DataBase Connected')).catch(e => console.log(`Database Error ${e}`))
}
module.exports = expo