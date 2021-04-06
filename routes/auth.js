const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const preventMid = require('../middlewares/preventLoginRegister')
const jwt = require('jsonwebtoken')
const router = express.Router()
const secretkey = 'secretkey'
const app = express()
router.get('/login', preventMid, (req, res) => {
    res.render('Login')
})
router.get('/register', preventMid, (req, res) => {
    res.render('register')
})
router.post('/login', async(req, res) => {
    let { email, passcode } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ "message": "No User with that Email" })
    const perfect = await bcrypt.compare(passcode, user.passcode)
    if (!perfect) {
        res.status(403).json({
            "message": "Wrong passcode"
        })
    } else {
        const cust = { email, passcode }
        const tok = jwt.sign(cust, secretkey)
        res.cookie('id', tok, { maxAge: 3 * 24 * 60 * 60 * 100000 })
        res.status(201).json({ tok, "mess": "LogIn Successful" })
    }
})
router.post('/register', async(req, res) => {
    let { name, email, phone, passcode } = req.body
    passcode = await bcrypt.hash(passcode, 8)
    const existed = await User.findOne({ email })
    if (existed) {
        return res.status(403).json({ "message": "user exists" })
    }
    const user = await User.create({ name, email, phone, passcode })
    console.log("user created")
    const userr = { email, passcode }
    const tok = jwt.sign(userr, secretkey)
    res.cookie('id', tok, { maxAge: 3 * 24 * 60 * 60 * 100000 })
    res.status(201).json({ "tok": tok, "mess": "SignUp Successful" })
})
router.get('/logout', (req, res) => {
    res.cookie('id', '', { maxAge: 1 }).redirect('/login')
})
module.exports = router