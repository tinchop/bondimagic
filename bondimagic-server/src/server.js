var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const BondiMagicService = require('./bondi-magic-service');
const UserLocationManager = require('./collaboration-engine/user-location-manager');
const BusProvider = require('./collaboration-engine/bus-provider');
const BusLocationDetector = require('././collaboration-engine/bus-location-detector');

let userLocationManager = new UserLocationManager();
let busProvider = new BusProvider();
let bondiMagicService = new BondiMagicService(userLocationManager, busProvider);
let busLocationDetector = new BusLocationDetector();

/**ESTO ES EL ENGINE*/
function detectBuses() {
	let userLocations = userLocationManager.getUserLocations();
	let buses = busLocationDetector.detectLocations(userLocations);
	busProvider.setBuses(buses);
}

setInterval(detectBuses, 100);
/***/

app.use(bodyParser.json());

app.post('/nearbybuses', function (req, res) {
	var user = req.body['user'];
	var location = req.body['location'];
	var busRouteId = req.body['busRouteId'];
	var result = bondiMagicService.getNearbyBuses(user, location, busRouteId);
	res.json(result);
});

app.get('/', function (req, res) {
	res.send('This is the Bondimagic server, pal.');
});

app.listen(3000, function () {
	console.log('Bondimagic server listening on port 3000!');
});