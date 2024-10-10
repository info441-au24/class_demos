import {promises as fs} from 'fs'
import express from 'express'
var router = express.Router()

router.get('/getPterosaurs', async (req, res) => {
    // load data file
    const pterosaurFile = await fs.readFile("data/pterosaur.json")

    // filter out data that doesn't have images
    const pterosaurJson = JSON.parse(pterosaurFile)
    const filteredPterosaurJson = pterosaurJson.filter(onePterosaur => {
        if(onePterosaur.img != ""){
            return true
        } else{
            return false
        }
    })

    // return data file
    res.json(filteredPterosaurJson)
})

export default router