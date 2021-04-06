const preventMid = (req, res, next) => {
    if (req.cookies.id) {
        return res.redirect('/home?page=1')
    }
    next()
}
module.exports = preventMid