var socketserver = require('./SocketServer');

socketserver.test();

socketserver.socket.emit("x", "yo");
