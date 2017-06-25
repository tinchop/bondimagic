var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var colors = require('colors/safe');
var cors = require('cors');
const BondiMagicService = require('./bondi-magic-service');
const engine = require('./collaboration-engine/engine');

let bondiMagicService = new BondiMagicService(engine.userLocationManager, engine.busProvider);
engine.start();

app.use(cors());
app.use(bodyParser.json());

app.post('/nearbybuses', function (req, res) {
	var user = req.body['user'];
	var location = req.body['location'];
	var busRouteId = req.body['busRouteId'];
	var result = bondiMagicService.getNearbyBuses(user, location, busRouteId);
	res.json(result);
});

app.get('/bus-routes', (req, res) => {
	res.json(bondiMagicService.getRutes());
});

app.get('/', function (req, res) {
	res.send('This is the Bondimagic server, pal.');
});

app.listen(3000, function () {
	console.log(colors.green.bold('Bondimagic server listening on port 3000!'));
});