const jwt = require('jsonwebtoken')
const secretkey = 'secretkey'
const blogMid = (req, res, next) => {
    const tok = req.cookies.id
    if (tok) {
        jwt.verify(tok, secretkey, (err, dec) => {
            if (err) {
                res.json({ 'Message': "Bad Response Redirecting To Login Page" })
                res.redirect('/login')
            }
            next()
        })
    } else {
        res.redirect('/login')
    }
}
module.exports = blogMid