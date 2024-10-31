import express from 'express'
let router = express.Router()

router.get("/", async(req, res) => {
    let userId = req.query.userId

    let userPlaylists = await req.models.Playlist.find({user: userId})

    res.json(userPlaylists)
})

router.post("/", async (req, res) => {
    let title = req.body.title
    let songs = req.body.songs
    let userId = req.body.userId

    let newPlaylist = new req.models.Playlist({
        title: title,
        songs: songs,
        user: userId
    })

    await newPlaylist.save()

    res.json({status: "success"})
})

export default router
