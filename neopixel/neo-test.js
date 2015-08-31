var Neopixels = require('neopixels/');
var neopixels = new Neopixels();

var numLEDs = 60
var idx = 0
var step = 1;

neopixels.on('end', function() {
  // console.log("animation complete")
  if (idx < 0 || idx > 59) {
    // step *= -1;
    idx = 0;
  }
  idx += step;

  var animBuf = new Buffer(numLEDs * 3);
  animBuf.fill(0x00);
  
  animBuf[idx*3+0] = 0xff; // green
  animBuf[idx*3+1] = 0xff; // red
  animBuf[idx*3+2] = 0x00; // blue

  animBuf[3*numLEDs-(idx*3+0)-1] = 0xff; // green
  animBuf[3*numLEDs-(idx*3+1)-1] = 0x00; // red
  animBuf[3*numLEDs-(idx*3+2)-1] = 0xff; // blue

  neopixels.animate(numLEDs, animBuf);
  // neopixels.animate(numLEDs, setLed(numLEDs, idx, 0xff, 0xff, 0x00));
});


// Make another buffer to store animation for off buffer
var offAnimation = new Buffer(numLEDs * 3);
// Fill it with zero (R,G, and B are all off)
offAnimation.fill(0x00);
neopixels.animate(numLEDs, offAnimation);
/*
for (i=0; i<numLEDs; i++) {
  offAnimation[i*3+0] = 0x10; // green
  offAnimation[i*3+1] = 0x10; // red
  offAnimation[i*3+2] = 0x00; // blue
}
*/

/*
for (i=0; i<numLEDs; i++) {
  console.log("-> "+i)
  neopixels.animate(numLEDs, setLed(numLEDs, i, 0x20, 0x00, 0x00));
}
*/

function setLed(numLeds, idx, r, g, b) {
  // console.log("setting "+idx+" to ("+r+"/"+g+"/"+b+")")
  var animBuf = new Buffer(numLeds * 3);
  animBuf.fill(0x00);

  animBuf[idx*3+0] = g; // green
  animBuf[idx*3+1] = r; // red
  animBuf[idx*3+2] = b; // blue

  return animBuf;
}