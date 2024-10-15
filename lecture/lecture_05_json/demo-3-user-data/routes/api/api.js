import {promises as fs} from 'fs'
import express from 'express'
var router = express.Router()


router.post('/users', async (req, res) => {
    console.log(req.body)

    await fs.writeFile("data/userData.json",
        JSON.stringify(req.body)
    )
})

router.get('/users', async (req, res) => {
    // load data file
    const userFile = await fs.readFile("data/userData.json")

    const userJson = JSON.parse(userFile)

    // return data file
    res.json(userJson)
})

export default router