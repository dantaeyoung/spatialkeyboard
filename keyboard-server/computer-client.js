const WebSocket = require('ws');
var robot = require("robotjs");

robot.setMouseDelay(2);

const keyNames = {
    0: '§',
    1: 'escape',
    2: '1',
    3: '2',
    4: '3',
    5: '4',
    6: '5',
    7: '6',
    8: '7',
    9: '8',
    10: '9',
    11: '0',
    12: '-',
    13: '=',
    14: 'backspace',
    15: 'tab',
    16: 'q',
    17: 'w',
    18: 'e',
    19: 'r',
    20: 't',
    21: 'y',
    22: 'u',
    23: 'i',
    24: 'o',
    25: 'p',
    26: '[',
    27: ']',
    28: 'enter',
    29: 'control',
    30: 'a',
    31: 's',
    32: 'd',
    33: 'f',
    34: 'g',
    35: 'h',
    36: 'j',
    37: 'k',
    38: 'l',
    39: ';',
    40: '\'',
    41: '`',
    42: 'shift',
    43: '\\',
    44: 'z',
    45: 'x',
    46: 'c',
    47: 'v',
    48: 'b',
    49: 'n',
    50: 'm',
    51: ',',
    52: '.',
    53: '/',
    54: 'right_shift',
    56: 'alt', // macos 'Left ⌥'
    57: 'space',
    58: 'CapsLock',
    59: 'f1',
    60: 'f2',
    61: 'f3',
    62: 'f4',
    63: 'f5',
    64: 'f6',
    65: 'f7',
    66: 'f8',
    67: 'f9',
    68: 'f10',
    87: 'f11',
    88: 'f12',
    61010: 'Insert',
    61011: 'Delete',
    60999: 'Home',
    61007: 'End',
    61001: 'Page Up',
    61009: 'Page Down',
    3639: 'Print Screen',
    3653: 'Pause Break',
    3637: 'Num /',
    55: 'Num *',
    3612: 'Num Enter',
    3655: 'Num Home',
    3657: 'Num Page Up',
    3663: 'Num End',
    3665: 'Num Page Down',
    57420: 'Num Center 5',
    3677: 'Context Menu',
    61008: 'Arrow Down',
    61005: 'Arrow Right',
    61003: 'Arrow Left',
    61000: 'Arrow Up',
    57380: 'Media Stop',
    57360: 'Media Previous',
    57378: 'Media Play',
    57369: 'Media Next',
    57390: 'Volume Down',
    57392: 'Volume Up',
    57376: 'Volume Mute',
    3613: 'Right Ctrl',
    3640: 'Right Alt', // macos 'Right ⌥'
    3675: 'Left Win', // macos 'Left ⌘'
    3676: 'Right Win', // macos 'Right ⌘'
    57419: '←',
    57416: '↑',
    57424: '↓',
    57421: '→',
  }


var prevData;
var isDragging = false;

const PORT = 8080;
const IP = "10.0.1.3"

console.log(`http://${IP}:${PORT}`);
const ws = new WebSocket(`ws://${IP}:${PORT}`);


ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(msg) {
  let data, t;
  try {
    data = JSON.parse(msg);
    t = data['type'];


 } catch {
    console.log("Wrong message format:", msg);
  }


    if(t == 'keydown') { handle_keydown(data); }
    if(t == 'keypress') { handle_keypress(data); }
    if(t =='keyup') { handle_keyup(data); }
    if(t =='mouseclick') { handle_mouseclick(data); }
    if(t =='mousedown') { handle_mousedown(data); }
    if(t =='mouseup') { handle_mouseup(data); }
    if(t =='mousemove') { handle_mousemove(data); }
    if(t =='mousedrag') { handle_mousedrag(data); }
    if(t =='mousewheel') { handle_mousewheel(data); } 


  prevData = data;

});

function handle_keydown(data)  {
}
function handle_keypress(data)  {
}
function handle_keyup(data)  {
  /*
{
  shiftKey: false,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  keycode: 30,
  rawcode: 0,
  type: 'keyup'
} */

  var modifiers = [];
  if(data.shiftKey) { modifiers.push("shift") }
  if(data.altKey) { modifiers.push("alt") }
  if(data.metaKey) { modifiers.push("win") }
  if(data.ctrlKey) { modifiers.push("control") }

  robot.keyTap(keyNames[data.keycode])


}
function handle_mouseclick(data)  { 
  var opts = { button: "left", double: false };
  if(data.button == 2) { opts.button = "right"; }
  if(data.clicks == 2) { opts.double = true; }
  robot.mouseClick(opts.button, opts.clicks);
}
function handle_mousedown(data)  {
  console.log("mousedown");
}
function handle_mouseup(data)  { 
  console.log("mouseup");
}
function handle_mousemove(data) {

  if(prevData.type == "mousedrag") { finishDrag(data); }

  robot.moveMouse(data.x, data.y);
}

function handle_mousedrag(data)  {
  if(prevData.type != "mousedrag") {  startDrag(data); }
   else {
    // in the middle of dragging
  }
  robot.moveMouse(data.x, data.y);
}

function handle_mousewheel(data)  {
}


function startDrag(data) {
  robot.mouseToggle("down");
}

function finishDrag(data) {
  robot.mouseToggle("up");
}
