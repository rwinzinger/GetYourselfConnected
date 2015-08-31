var tessel = require('tessel');
var climatelib = require('climate-si7020');

var climate = climatelib.use(tessel.port['A']);

climate.on('ready', function () {
  setInterval(function() {
	// console.log("tick")
	climate.readTemperature('c', function (err, temp) {
		console.log(">> "+temp.toFixed(3))
	})
  }, 1000);
})

















/*
var http = require("http")
var tessel = require('tessel');
var climatelib = require('climate-si7020');

var climate = climatelib.use(tessel.port['A']);

climate.on('ready', function () {
  setInterval(function() {
	console.log("tick")
	climate.readTemperature('c', function (err, temp) {
		console.log(">> "+temp.toFixed(3))
	})
  }, 1000);
})
*/


/*

client = mqtt.connect("mqtt://evnevuat:G4yO7QTrmogs@m20.cloudmqtt.com:19709", {
	clientId : "18722"
});

*/