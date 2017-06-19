var request = require('request');
var colors = require('colors/safe');

//Lucas, Monk y María están arriba de un 59
//Comienzan en Av 9 de Julio y Marcelo T de Alvear -34.596735, -58.382103
console.log(colors.magenta.italic('Lucas, Monk y María comienzan a transmitir su ubicación desde Av. 9 de Julio y Marcelo T De Alvear. Están en un colectivo de ramal 59 yendo a Av. 9 de Julio y Chile.'));
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
console.log(colors.magenta.italic('Renfield está parado solo en Belgrano y Diagonal Sur.'));
var renfieldLocation = { latitude: -34.6128962, longitude: -58.3775573 };
var renfieldDelta = { latitude: 0, longitude: 0 };
setInterval(userRequest, 1500, 'Renfield', 59, renfieldLocation, renfieldDelta);

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
			if (!body) {
				console.log(colors.red('No se pudo contactar al servidor.'));
			} else if (body.length > 0) {
				console.log(colors.green.bold('\n' + body.length + ' colectivo' + ((body.length > 1) ? 's' : '') + ' encontrado' + ((body.length > 1) ? 's' : '') + ': ') + colors.green('(ramal 59)'));
				var busId = 1;
				body.forEach((bus) => {
					console.log(
						colors.green('Colectivo nro: ') + busId + colors.yellow(' | ') +
						colors.green('Ubicación: ') + bus.location.latitude + ',' + bus.location.longitude
					);
					busId++;
				});
			} else {
				console.log(colors.blue('Aún no se encontraron colectivos.'));
			}
		}
	});
}
