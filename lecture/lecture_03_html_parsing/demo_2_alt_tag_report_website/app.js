import express from 'express'
import {promises as fs} from 'fs'
import parser from 'node-html-parser'
import fetch from 'node-fetch'

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

app.get('/api/auditurl', async (req, res) => {
    const userUrl = req.query.url

    // Fetch url, then audit img tags
    const response = await fetch(userUrl)
    const pageText = await response.text()

    const htmlPage = parser.parse(pageText)
    const imgTags = htmlPage.querySelectorAll("img")

    let htmlReturn = ""

    for(let i = 0; i < imgTags.length; i++){
        const imgTag = imgTags[i]

        htmlReturn += "<h3>Image " + i + " info:</h3>"
        htmlReturn += "alt text: " + imgTag.attributes.alt + "<br>"
        htmlReturn += "img src: " + imgTag.attributes.src + "<br>"
        htmlReturn += "<img src='"+ userUrl + imgTag.attributes.src +"' />"
    }

    res.type('html')
    res.send(htmlReturn)
})

app.get('/favicon.ico', async (req, res) => {
    console.log("request to '/favicon.ico', sending back png content")
    let fileContents = await fs.readFile("favicon.ico")
    res.type("png")
    res.send(fileContents)
})

app.listen(3000, () =>{
    console.log("Example app listening at http://localhost:3000")
})