var express = require('express');
var app = express();
var geolib = require('geolib');
var bodyParser = require("body-parser");
const BondiMagicService = require('./bondi-magic-service');

let bondiMagicService = new BondiMagicService();

app.use(bodyParser.json());

app.post('/nearbybuses', function (req, res) {
	console.log(req.body);
	var user = req.body['user'];
	var location = req.body['location'];
	var busRouteId = req.body['busRouteId'];
	var result = bondiMagicService.getNearbyBuses(user, location, busRouteId);
	res.send(result);
});

app.get('/', function (req, res) {
	res.send('This is the Bondimagic server, pal.');
});

app.listen(3000, function () {
	console.log('Bondimagic server listening on port 3000!');
});