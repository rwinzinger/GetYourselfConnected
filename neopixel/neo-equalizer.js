var tessel = require('tessel');

var Neopixels = require('neopixels/');
var neopixels = new Neopixels();

var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['A']);

var numLEDs = 60

var getEqualizerLeds = function() {
  var animBuf = new Buffer(numLEDs * 3);

  var startGreenPercent  = 0.0;
  var startYellowPercent = 60.0;
  var startRedPercent    = 90.0

  var startGreen = numLEDs*startGreenPercent;
  var startYellow = numLEDs*startYellowPercent;
  var startRed = numLEDs*startRedPercent;

  // fill green
  for (idx=0; idx<40; idx++) {
    animBuf[idx*3+0] = 0x20; // green
    animBuf[idx*3+1] = 0x00; // red
    animBuf[idx*3+2] = 0x00; // blue
  }
  // fill yellow
  for (idx=40; idx<52; idx++) {
    animBuf[idx*3+0] = 0x20; // green
    animBuf[idx*3+1] = 0x20; // red
    animBuf[idx*3+2] = 0x00; // blue
  }
  // fill yellow
  for (idx=52; idx<60; idx++) {
    animBuf[idx*3+0] = 0x00; // green
    animBuf[idx*3+1] = 0x20; // red
    animBuf[idx*3+2] = 0x00; // blue
  }
  return animBuf;
}

// neopixels.animate(numLEDs, getEqualizerLeds());

var visualizeSoundLevel = function(level) {
  if (level > 100) {
  	level = 100;
  }
  if (level < 0) {
  	level = 0;
  }
  var levelLed = Math.floor(60.0/100.0*level);
  console.log(level+" -> "+levelLed);


  var buf = getEqualizerLeds();
  buf.fill(0x00, levelLed*3);
  neopixels.animate(numLEDs, buf);

}

ambient.on('ready', function () {
	console.log("ambient ready")
    // Get points of light and sound data.
    setInterval(function() {
      ambient.getSoundLevel(function(err, sdata) {
        if (err) throw err;
        // console.log("Sound Level:", sdata*100);
        visualizeSoundLevel(sdata*400-5);
      })
    }, 100); // The readings will happen every .5 seconds unless the trigger is hit
})
