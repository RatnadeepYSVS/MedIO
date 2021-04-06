const express = require('express')
const router = express.Router()
const authMid = require('../middlewares/userMiddleWare')
const pubkey = "pk_test_51HwsTfAj69kHZnU43iWXcpYgO9c5DEkfofvLYpZyyLELvOoZVvZ33K2Hu8pRsuazkADh72ZMRNIOrJilYPQkAqgw00ZQgT23z5"
const sec_key = "sk_test_51HwsTfAj69kHZnU4e2DfYovCNW0fVEXiUPifxCJh54tGgNJ4wD5eDxfjSCWez1lHa1DHgK0kADLqKDfKtcFM8Lbb00Noq09DyM"
const stripe = require('stripe')(sec_key)
router.get('/donations', authMid, (req, res, next) => {
    res.render('contributions', { pubkey })
})
router.post('/donations', authMid, async(req, res) => {
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Ratnadeep YSVS',
        address: {
            line1: '3rd left cross road mangapuram colony',
            postal_code: '500040',
            city: 'Hyderabad',
            state: 'Telangana',
            country: 'India',
        }
    })
    const charge = await stripe.charges.create({
        amount: 500,
        description: 'User Donation',
        currency: 'INR',
        customer: customer.id
    })
    const { user } = res.locals
    res.render('success', { user })
});
router.get('/success', authMid, (req, res) => {
    res.render('success')
})
module.exports = router