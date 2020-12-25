'use strict';

const ioHook = require('iohook');

ioHook.on('mousemove', event => {
  //socket.emit("x", event); // { type: 'mousemove', x: 700, y: 400 }
//  global.socket.emit("x", "yo"); // { type: 'mousemove', x: 700, y: 400 }
  console.log(event);
});

// Register and start hook
ioHook.start();



