var request = require('request');

//Lukas, Monk y María están arriba de un 152
//Comienzan en Av 9 de Julio y Marcelo T de Alvear -34.596735, -58.382103
var lucasLocation = {latitude: -34.596735, longitude: -58.382103};
//Van hasta Av 9 de Julio y Chile -34.616462, -58.380931
var friendsDestination = {latitude: -34.616462, longitude: -58.380931};

var lucasDelta = {
	latitude: ((lucasLocation.latitude - friendsDestination.latitude) /100), 
	longitude: ((lucasLocation.longitude - friendsDestination.longitude) /100)
};

var monkLocation = {latitude: -34.596735, longitude: -58.382103};
var monkDestination = {latitude: -34.616462, longitude: -58.380931};
var monkDelta = {
	latitude: ((monkLocation.latitude - friendsDestination.latitude) /100), 
	longitude: ((monkLocation.longitude - friendsDestination.longitude) /100)
};

var mariaLocation = {latitude: -34.596735, longitude: -58.382103};
var mariaDelta = {
	latitude: ((mariaLocation.latitude - friendsDestination.latitude) /100), 
	longitude: ((mariaLocation.longitude - friendsDestination.longitude) /100)
};

setInterval(userRequest, 1500, 'Lucas', 59, lucasLocation, lucasDelta);
setInterval(userRequest, 1500, 'Monk', 59, monkLocation, monkDelta);
setInterval(userRequest, 1500, 'María', 59, mariaLocation, mariaDelta);

//Renfield está parado en Belgrano y Diagonal Sur
var renfieldLocation = {latitude: -34.6128962, longitude: -58.3775573};
var renfieldDelta = {latitude: 0, longitude: 0};

setInterval(userRequest, 1500, 'Renfield', 59, renfieldLocation, renfieldDelta);

function userRequest(user, busRouteId, location, delta) {

	//Resto desplazo de norte a sur, de oeste a este
	location.latitude = location.latitude - delta.latitude;
	location.longitude = location.longitude - delta.longitude;
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
