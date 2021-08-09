const express = require('express')
const User = require('../models/user.js')

const router = new express.Router()

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:name', async (req, res) => {
    const name = req.params.name

    try {
        const user = await User.findOne({ name: name })
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.patch('/users/:name', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'rating', 'races', 'img']
    const isvalidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isvalidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const user = await User.findOneAndUpdate({ name: req.params.name }, req.body, {new: true})

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/:name', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ name: req.params.name })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router