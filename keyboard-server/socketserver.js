const socket = require("socket.io");

class SocketServer {
  constructor() {
    socket;

    const io = socket();

    this.io = socket;

    io.on("connection", socket => {
      this.socket = socket;

      socket.emit("hello", "world");

      socket.emit("greetings");

      socket.on("message", data => {
        console.log(data);
      });
    });
    io.listen(3000);
  }

  test() {
    console.log("yeah ew'ere owrking");
  }
}

module.exports = new SocketServer();
