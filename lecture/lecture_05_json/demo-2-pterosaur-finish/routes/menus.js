import menusRouter from './menus-desserts.js'
import express from 'express'
var router = express.Router()

router.get('/', (req, res) => {
    res.send("this is the menu")
})

router.use('/desserts', menusRouter)

export default router