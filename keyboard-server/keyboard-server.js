const ioHook = require('iohook');
const socket = require('socket.io');

const io = socket();

global.socket = null;



function initSocket(vars, cb) {
  return new Promise(function(resolve, reject) {

    vars.blah = "boo";

    io.on('connection', (socket) => {

      vars.socket = socket;

      console.log(global);

      socket.emit("hello", "world");

      socket.emit("greetings");

      socket.on('message', (data) => {
        console.log(data);
      });

    });

    io.listen(3000);


    vars.io = io;

    resolve(vars);

  });
}

function initIoHook(vars, cb) {
  return new Promise(function(resolve, reject) {

    console.log("do s!tufF");
    vars.blah2 = "boo";
    resolve(vars);

  });
}


console.log("started server!");


ioHook.on('mousemove', event => {
//  console.log("mousemoving");
  //socket.emit("x", event); // { type: 'mousemove', x: 700, y: 400 }
//  global.socket.emit("x", "yo"); // { type: 'mousemove', x: 700, y: 400 }
  console.log(event);
});

/*setTimeout(() => {
  global.socket.emit("x", "yo"); 
  console.log("yo");
}, 2000);*/

// Register and start hook
ioHook.start();


initSocket({})
  .then((res) => initIoHook(res))
  .then((vars) => {

    console.log(vars);

    vars.io.emit("x", "yo");

  });
