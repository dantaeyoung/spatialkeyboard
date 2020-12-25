const io = require('socket.io-client');

const PORT = 3000;
const IP = "10.0.1.3"

const socket = io(`http://${IP}:${PORT}`);

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx


  socket.emit("message", "hello friends!");


});

socket.on('message', (data) => {
  console.log(data);
});

socket.on("hello", (arg) => {
  console.log(arg); // world
});


///

socket.on("mousemove", (arg) => {
  console.log(arg); 
});
