const io = require('socket.io-client');

const socket = io("http://localhost:3000");

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

socket.on("x", (arg) => {
  console.log(arg); // world
});
