var request = require('request');

//Lucas, Monk y María están arriba de un 59
//Comienzan en Av 9 de Julio y Marcelo T de Alvear -34.596735, -58.382103
var lucasLocation = { latitude: -34.596735, longitude: -58.382103 };
//Van hasta Av 9 de Julio y Chile -34.616462, -58.380931
var friendsDestination = { latitude: -34.616462, longitude: -58.380931 };

var lucasDelta = {
	latitude: ((lucasLocation.latitude - friendsDestination.latitude) / 100),
	longitude: ((lucasLocation.longitude - friendsDestination.longitude) / 100)
};

var monkLocation = { latitude: -34.596735, longitude: -58.382103 };
var mariaLocation = { latitude: -34.596735, longitude: -58.382103 };


setInterval(userRequest, 1500, 'Lucas', 59, lucasLocation, lucasDelta);
setInterval(userRequest, 1500, 'Monk', 59, monkLocation, lucasDelta);
setInterval(userRequest, 1500, 'María', 59, mariaLocation, lucasDelta);

//Renfield está parado solo en Belgrano y Diagonal Sur
var renfieldLocation = { latitude: -34.6128962, longitude: -58.3775573 };
var renfieldDelta = { latitude: 0, longitude: 0 };
setInterval(userRequest, 1500, 'Renfield', 59, renfieldLocation, renfieldDelta);

//Dracula, Juan y Pedro están arriba de otro 59
//Comienzan en Av 9 de Julio y Rivadavia -34.608392, -58.381339
var draculaLocation = { latitude: -34.608392, longitude: -58.381339 };
//Van hasta Av 9 de Julio y Chile también -34.616462, -58.380931

var draculaDelta = {
	latitude: ((draculaLocation.latitude - friendsDestination.latitude) / 50),
	longitude: ((draculaLocation.longitude - friendsDestination.longitude) / 50)
};

var juanLocation = { latitude: -34.608392, longitude: -58.381339 };
var pedroLocation = { latitude: -34.608392, longitude: -58.381339 };

setInterval(userRequest, 1500, 'Drácula', 59, draculaLocation, draculaDelta);
setInterval(userRequest, 1500, 'Juan', 59, juanLocation, draculaDelta);
setInterval(userRequest, 1500, 'Pedro', 59, pedroLocation, draculaDelta);

function userRequest(user, busRouteId, location, delta) {

	//Resto porque se desplazan de norte a sur, de oeste a este
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
		if (user == 'Renfield') {
			console.log(body);
		}
	});
}
