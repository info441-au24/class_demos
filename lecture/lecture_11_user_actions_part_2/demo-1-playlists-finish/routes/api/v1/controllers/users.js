import express from 'express'
let router = express.Router()

router.get("/", async (req, res) => {
    try{
        let allusers = await req.models.User.find()
        res.json(allusers)
    } catch(err){
        console.log("error:", err)
        res.status(500).json({status: "error"})
    }
})

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

router.delete("/", async (req, res) => {
    let userId = req.body.userId

    // delete playlists for the user, then delete the user
    await req.models.Playlist.deleteMany({user: userId})    
    await req.models.User.deleteOne({_id: userId})

    res.json({status: "success"})
})

router.post('/bands', async(req, res) => {
    let userId = req.body.userId
    let band = req.body.band

    // find the right user
    let user = await req.models.User.findById(userId)

    // update with the new band (if it wasn't already there)
    if(!user.favorite_bands.includes(band)){
        user.favorite_bands.push(band)
    }

    // save
    await user.save()
    res.json({status: "success"})
    //TODO: error handling
})

export default router