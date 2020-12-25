const ioHook = require('iohook');
const socket = require('socket.io');
const ip = require('ip');


const io = socket();

const PORT = 3000;



function initSocket(vars, cb) {
  return new Promise(function(resolve, reject) {

    io.listen(PORT);
    console.log(`Started server at: ${ip.address()}:${PORT}`);
    console.log(ip.address())

    io.on('connection', (socket) => {


      console.log(global);

      socket.emit("hello", "world");

      socket.emit("greetings");

      socket.on('message', (data) => {
        console.log(data);
      });

      vars.socket = socket;
      resolve(vars);
    });

  });
}

function initIoHook(vars, cb) {
  return new Promise(function(resolve, reject) {

    ioHook.start();

    vars.ioHook = ioHook;

    resolve(vars);

  });
}






initSocket({})
  .then((res) => initIoHook(res))
  .then((vars) => {

    console.log(vars);


    ioHook.on('mousemove', event => {
    //  console.log("mousemoving");
      //socket.emit("x", event); // { type: 'mousemove', x: 700, y: 400 }
    //  global.socket.emit("x", "yo"); // { type: 'mousemove', x: 700, y: 400 }
      vars.socket.emit("mousemove", event); // { type: 'mousemove', x: 700, y: 400 }
      console.log(event);
    });




});
