const express = require('express');
const fs = require('fs').promises;

const app = express();

app.get('/', async (req, res) => {
    const files = await fs.readdir(process.cwd() + '/song_lyrics');
    console.log(files)

    const fileContent = await fs.readFile(process.cwd() + '/song_lyrics/' + files[0]);
    console.log(fileContent.toString())

    res.type('text').send(fileContent.toString());

})


app.listen(3000, () => {
    console.log('http://localhost:3000');
})