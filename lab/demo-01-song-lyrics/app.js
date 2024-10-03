const express = require('express');
const fs = require('fs').promises;

const app = express();

app.get('/', async (req, res) => {
  const files = await fs.readdir(process.cwd() + '/song_lyrics');
  console.log(files);

  const fileContents = await fs.readFile(
    process.cwd() + '/song_lyrics/' + files[0]
  );
  console.log(fileContents.toString());

  res.type('text').send(fileContents.toString());
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
