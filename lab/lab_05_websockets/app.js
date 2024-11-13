import express from 'express'
import enableWs from 'express-ws'

const app = express()
enableWs(app)

// track websocket connections
let socketCounter = 1
let allSockets = []

app.ws('/chatSocket', (ws, res) => {
    // "ws" now has the connection info
    let mySocketNum = socketCounter
    socketCounter++
    console.log(`user ${mySocketNum} connected via websocket`)
    allSockets.push(ws)

    ws.on('message', chat => {
        console.log(`msg (user ${mySocketNum}): ${chat}`)

        allSockets.forEach(socket => {
            socket.send(mySocketNum + ": " + chat)
        })
    })

    ws.on('close', () => {
        console.log(`user ${mySocketNum} disconnected`)
        console.log("I should probably delete them from the array or something")
    })
})

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})