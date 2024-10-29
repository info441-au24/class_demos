import mongoose from 'mongoose'

let models = {}

console.log("Trying to connect to mongodb")
await mongoose.connect("mongodb://localhost:27017/playlists")

console.log("successfully connected to mongodb")

const userSchema = new mongoose.Schema({
    username: String
})

models.User = mongoose.model("User", userSchema)

console.log("successfully created database models")

export default models