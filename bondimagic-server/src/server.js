var express = require('express');
var app = express();
var mongoose = require('mongoose');
var geolib = require('geolib');

mongoose.connect('mongodb://localhost:27017/bondimagic');

//armo la estructura de la collection 'ramal' con mongoose:
var Ramal = mongoose.model('ramal', { codigo: String });

//me fijo si la collection ramal está vacía y si lo está guardo uno nuevo
Ramal.find({}, function (err, result) {
	if (err) throw err;
	if (result.length <= 0) {
		var unRamal = new Ramal({ codigo: '126' });
		unRamal.save(function (saveErr) {
		  if (saveErr) {
		    console.log(saveErr);
		  } else {
		    console.log('Ramal guardado!');
		  }
		});
	}
});

app.get('/', function (req, res) {
  res.send('This is the Bondimagic server, pal.');
});

app.get('/enviaje', function(req, res){
	//acá va la parte difícil, jóvenes!!
	var enViaje = Math.random() >= 0.5;
	res.send(enViaje);
});

app.get('/ramales', function(req, res){
  	Ramal.find({}, function (err, result) {
		res.send(result);
    	});
});

app.listen(3000, function () {
  console.log('Bondimagic server listening on port 3000!');
});


app.get('/distance_test', function(req, res){

 var lat1 = '-34.6279826';//-34.6279826,-58.433789
 var lon1 = '-58.433789';
 var lat2 = '-34.6325845';//-34.6325845,-58.4576792
 var lon2 = '-58.4576792';

 var locationA = {latitude: lat1, longitude: lon1};
 var locationB = {latitude: lat2, longitude: lon2};
 var distancia = {distancia: geolib.getDistance(locationA, locationB)};
 res.send(distancia);
});

