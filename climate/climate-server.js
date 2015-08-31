var tessel = require('tessel');
var climatelib = require('climate-si7020');
var http = require('http'); 

var climate = climatelib.use(tessel.port['A']);

climate.on('ready', function () {
  console.log("climate-module initialized");
  http.createServer(function (req, res) {
  	console.log("incoming request: "+req.url)
  	if (req.url.indexOf("temp") > -1) {
  	  climate.readTemperature('c', function (err, temp) {
	  	console.log(">> "+temp.toFixed(3))
		res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("TEMP: "+temp.toFixed(3));
	  })
    } else {
    	res.writeHead(404);
    	res.end("no sensor");
    }
  }).listen(8080, function() {
  	console.log("server up & running");
  });
})