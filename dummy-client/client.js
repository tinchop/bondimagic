var request = require('request');

setInterval(juanRequest, 2000);

function juanRequest() {
	var requestBody = {
		user: 'Juan',
		busRouteId: 10,
		location: {
			latitude: 12,
			longitude: 12
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
