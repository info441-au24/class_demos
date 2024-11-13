import express from 'express';
import enableWs from 'express-ws';
const app = express();
enableWs(app);

let socketCounter = 1;
let allSockets = {};

app.ws('/socket', (ws, res) => {
  let mySocketNum = socketCounter;
  allSockets[mySocketNum] = {
    socket: ws,
    name: `Users${mySocketNum}`,
  };
  socketCounter++;

  ws.on('message', (chat) => {
    const message = JSON.parse(chat);
    try {
      if (message['action'] == 'updateName') {
        allSockets[mySocketNum].name = message.name;
      } else if (message['action'] == 'sendMessage') {
        const name = allSockets[mySocketNum].name;
        const currentMessage = message.message;
        for (const [socketNum, socketInfo] of Object.entries(allSockets)) {
          socketInfo.socket.send(name + ':' + currentMessage);
        }
      } else {
        throw new Error('it failed inside');
      }
    } catch {
      throw new Error('it failed');
    }
  });

  ws.on('close', () => {
    console.log(`user ${mySocketNum} disconnected`);
    delete allSockets[socketCounter];
  });
});

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html');
});

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000');
});
