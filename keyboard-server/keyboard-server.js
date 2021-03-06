const ioHook = require('iohook');
const WebSocket = require('ws');
const ip = require('ip');


const PORT = 3000;

const wss = new WebSocket.Server({ port: 8080 });



function initSocket(vars, cb) {
  return new Promise(function(resolve, reject) {

    wss.on('connection', function connection(ws) {

      console.log(`Started server at: ${ip.address()}:${PORT}`);
      console.log(ip.address())


      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });

      ws.send('{ "hello": "world" }');

      vars.ws = ws;

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

    function sendEventAsJson(event) {
//      console.log(event);
      vars.ws.send(JSON.stringify(event)); // { type: 'mousemove', x: 700, y: 400 }
    }

//    ioHook.on('keydown', sendEventAsJson);
    ioHook.on('keyup', sendEventAsJson); 
    ioHook.on('mouseclick', sendEventAsJson);
//    ioHook.on('mousedown', sendEventAsJson);
//    ioHook.on('mouseup', sendEventAsJson);
    ioHook.on('mousemove', sendEventAsJson);
    ioHook.on('mousedrag', sendEventAsJson);
//    ioHook.on('mousewheel', sendEventAsJson);


});
