import {promises as fs} from 'fs'
import express from 'express'
var router = express.Router()


router.post('/users', async (req, res) => {
    console.log(req.body)

    await fs.writeFile("data/userData.json",
        JSON.stringify(req.body)
    )
})

router.get('/getPterosaurs', async (req, res) => {
    // // load data file
    // const pterosaurFile = await fs.readFile("data/pterosaur.json")

    // // return data file
    // res.json(filteredPterosaurJson)
})

export default router