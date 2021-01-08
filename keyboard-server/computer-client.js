const WebSocket = require('ws');

const PORT = 8080;
const IP = "10.0.1.3"

console.log(`http://${IP}:${PORT}`);
const ws = new WebSocket(`ws://${IP}:${PORT}`);


ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(msg) {
  let data;
  try {
    data = JSON.parse(msg);
  } catch {
    data = msg;
  }
  console.log(data);
});
