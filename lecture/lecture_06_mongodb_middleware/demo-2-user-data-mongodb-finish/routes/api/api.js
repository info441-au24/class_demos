import {promises as fs} from 'fs'
import express from 'express'
var router = express.Router()


router.post('/users', async (req, res) => {
    console.log(req.body)

    const newUser = new req.models.User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        favorite_ice_cream: req.body.favorite_ice_cream
    })

    await newUser.save()
    
    res.send("success")
})

router.get('/users', async (req, res) => {
    let allUsers = await req.models.User.find()
    res.json(allUsers)
})

export default router