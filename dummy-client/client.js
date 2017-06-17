var request = require('request');

//Lukas, Monk y María están arriba de un 152
var lucasLocation = {latitude: -34.6171174, longitude: -58.3690121};
var lucasDestination = {latitude: -34.6101212, longitude: -58.3694326}
var lucasDelta = {
	latitude: ((lucasLocation.latitude - lucasDestination.latitude) /100), 
	longitude: ((lucasLocation.longitude - lucasDestination.longitude) /100)
};

var monkLocation = {latitude: -34.6171174, longitude: -58.3690121};
var monkDestination = {latitude: -34.6101212, longitude: -58.3694326}
var monkDelta = {
	latitude: ((monkLocation.latitude - monkDestination.latitude) /100), 
	longitude: ((monkLocation.longitude - monkDestination.longitude) /100)
};

var mariaLocation = {latitude: -34.6171174, longitude: -58.3690121};
var mariaDestination = {latitude: -34.6101212, longitude: -58.3694326}
var mariaDelta = {
	latitude: ((mariaLocation.latitude - mariaDestination.latitude) /100), 
	longitude: ((mariaLocation.longitude - mariaDestination.longitude) /100)
};

setInterval(userRequest, 1500, 'Lucas', 152, lucasLocation, lucasDelta);
setInterval(userRequest, 1500, 'Monk', 152, monkLocation, monkDelta);
setInterval(userRequest, 1500, 'María', 152, mariaLocation, mariaDelta);

//Renfield está parado en Belgrano y Diagonal Sur
var renfieldLocation = {latitude: -34.6128962, longitude: -58.3775573};
var renfieldDelta = {latitude: 0, longitude: 0};

setInterval(userRequest, 1500, 'Renfield', 152, renfieldLocation, renfieldDelta);

function userRequest(user, busRouteId, location, delta) {

	location.latitude = location.latitude + delta.latitude;
	location.longitude = location.longitude + delta.longitude;
	var requestBody = {
		user: user,
		busRouteId: busRouteId,
		location: {
			latitude: location.latitude,
			longitude: location.longitude
		}
	};
	var options = {
		url: 'http://localhost:3000/nearbybuses',
		method: 'POST',
		json: true,
		body: requestBody
	};

	request(options, function (error, response, body) {
		console.log(body);
	});
}
