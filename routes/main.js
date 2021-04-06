const express = require('express')
const authMid = require('../middlewares/blogMiddleWare')
const userMid = require('../middlewares/userMiddleWare')
const blockMid = require('../middlewares/preventLoginRegister')
const userModel = require('../models/user')
const blogModel = require('../models/blog')
const feedBackModel = require('../models/feedback')
const router = express.Router()
router.get('/', blockMid, (req, res) => {
    blogModel.find().limit(3).sort({ 'tagline': -1 }).exec((e, blogs) => {
        res.render('blogs', { blogs })
    })
})
router.get('/feedback', (req, res) => {
    res.render('feedback')
})
router.post('/feedback', async(req, res) => {
    const { name, email, phone, query, city } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
        const review = await feedBackModel.create({ name, email, phone, query, city })
        return res.status(201).json({ "message": "Thanks For The Feedback.", review })
    }
    res.status(403).json({ "message": "Please Provide The Email That You Have Registered Your MedIO Account." })
})
router.get('/home', authMid, async(req, res) => {
    const page = parseInt(req.query.page)
    const start = (page - 1) * 6
    const end = page * 6
    const blogs = {}
    const docs = await blogModel.find()
    if (end < docs.length) {
        blogs.after = {
            page: page + 1
        }
    }
    if (start > 0) {
        blogs.before = {
            page: page - 1
        }
    }
    const Blogs = await blogModel.find().limit(6).skip(start).exec()
    res.render('home', { blogs, Blogs })
})
router.get('/blog', authMid, (req, res) => {
    res.render('blog')
})
router.post('/blog', authMid, async(req, res) => {
    const { tagline, blog } = req.body
    const { user } = res.locals
    const blogger = user.name
    const Blog = await blogModel.create({ tagline, blog, blogger })
    res.status(201).json({ Blog })
})
router.get('/blogs/:id', authMid, async(req, res) => {
    const _id = req.params.id
    const blog = await blogModel.findById({ _id })
    res.render('viewblog', { blog })
})
router.get('/editblog/:id', authMid, async(req, res) => {
    const _id = req.params.id
    const doc = await blogModel.findById({ _id })
    const { user } = res.locals
    if (user.name != doc.blogger) {
        return res.redirect('/home?page=1')
    }
    res.render('editblog', { doc })
})
router.put('/edit/:id', authMid, async(req, res) => {
    let Blog = await blogModel.findById(req.params.id)
    try {
        const { user } = res.locals
        const { blogger } = Blog
        console.log(blogger)
        if (blogger != user.name) {
            return res.redirect('/')
        }
        const { tagline, blog } = req.body
        const story = { tagline, blog }
        Blog = await blogModel.findOneAndUpdate({ _id: req.params.id }, story, { new: true, runValidators: true })
        res.redirect('/home?page=1')
    } catch (e) {
        res.redirect('/home?page=1')
    }
})
router.get('/removeblog/:id', authMid, async(req, res) => {
    const _id = req.params.id
    const doc = await blogModel.findById({ _id })
    const { user } = res.locals
    if (user.name != doc.blogger) {
        return res.redirect('/home?page=1')
    }
    res.render('removeblog', { doc })
})
router.delete('/delete/:id', authMid, async(req, res) => {
    let Blog = await blogModel.findById(req.params.id)
    try {
        const { user } = res.locals
        const { blogger } = Blog
        console.log(blogger)
        if (blogger != user.name) {
            return res.redirect('/home?page=1')
        }
        await Blog.remove({ _id: req.params.id })
        res.redirect('/home?page=1')
    } catch (e) {
        res.redirect('/home?page=1')
    }

})
router.get('/users/:name', authMid, async(req, res) => {
    const name = req.params.name
    const blogs = await blogModel.find({ blogger: name })
    const user = await userModel.findOne({ name })
    const email = user.email
    const revert = { name, blogs, email }
    res.render('user', { revert })
})
module.exports = router