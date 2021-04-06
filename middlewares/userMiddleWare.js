const jwt = require('jsonwebtoken')
const UserMod = require('../models/user')
const secretkey = 'secretkey'
const blogMid = (req, res, next) => {
    const tok = req.cookies.id
    if (tok) {
        jwt.verify(tok, secretkey, async(err, dec) => {
            if (err) {
                res.json({ 'Message': "Bad Response Redirecting To Login Page" })
                res.redirect('/login')
                res.locals.user = null
            } else {
                const { email } = dec
                const user = await UserMod.findOne({ email })
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}
module.exports = blogMid