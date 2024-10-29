import express from 'express'
let router = express.Router()

router.post("/", async (req, res) => {
    try{
        let username = req.body.username
        console.log("creating user " + username)
        
        let newUser = new req.models.User({
            username: username
        })
        await newUser.save()

        res.json({status: 'success'})
    } catch(err){
        console.log("error:", err)
        res.status(500).json({status: "error"})
    }
})

export default router