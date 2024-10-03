import express from 'express'
import {promises as fs} from 'fs'
import pluralize from 'pluralize'

const app = express()

app.get('/', async (req, res) => {
    console.log("request to '/', sending back html")
    let fileContents = await fs.readFile("index.html")
    res.type("html")
    res.send(fileContents)
})

app.get('/style.css', async (req, res) => {
    console.log("request to '/style.css', sending back css content")
    let fileContents = await fs.readFile("style.css")
    res.type("css")
    res.send(fileContents)
})

app.get('/index.js', async (req, res) => {
    console.log("request to '/index.js', sending back js content")
    let fileContents = await fs.readFile("index.js")
    res.type("js")
    res.send(fileContents)
})

app.get('/api/pluralize', (req, res) => {
    let userWord = req.query.word
    let pluralWord = pluralize(userWord)
    res.type('txt')
    res.send(pluralWord)
})

app.listen(3000, () =>{
    console.log("Example app listening at http://localhost:3000")
})