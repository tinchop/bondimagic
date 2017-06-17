var express = require('express');
var app = express();
var geolib = require('geolib');
var bodyParser = require("body-parser");
const BondiMagicService = require('./bondi-magic-service');
const UserLocationManager = require('./collaboration-engine/user-location-manager');
const BusProvider = require('./collaboration-engine/bus-provider');

let userLocationManager = new UserLocationManager();
let busProvider = new BusProvider();
let bondiMagicService = new BondiMagicService(userLocationManager, busProvider);

app.use(bodyParser.json());

app.post('/nearbybuses', function (req, res) {
	var user = req.body['user'];
	var location = req.body['location'];
	var busRouteId = req.body['busRouteId'];
	console.log(user, ' consulta por el colectivo ', busRouteId, ' desde la ubicación ', location);
	var result = bondiMagicService.getNearbyBuses(user, location, busRouteId);
	res.send(result);
});

app.get('/', function (req, res) {
	res.send('This is the Bondimagic server, pal.');
});

app.listen(3000, function () {
	console.log('Bondimagic server listening on port 3000!');
});