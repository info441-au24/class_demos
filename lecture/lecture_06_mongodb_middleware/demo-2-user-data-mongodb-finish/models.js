import mongoose from 'mongoose'

let models = {}

console.log("connecting to mongodb")

//TODO: put your connection string below
await mongoose.connect('mongodb://localhost:27017/userDemo')

//mongodb+srv://websharerUser:pa55w0rd@cluster0.4pad9.mongodb.net/userDemo?retryWrites=true&w=majority&appName=Cluster0
//            password here:  ^^^^^^^^      Database name here:   ^^^^^^^^

console.log("successfully connected to mongodb!")

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    favorite_ice_cream: String
})

models.User = mongoose.model('User', userSchema)

console.log("mongoose models created")

export default models