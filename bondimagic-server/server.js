var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('This is the Bondimagic server, pal.');
});

app.get('/enviaje', function(req, res){
	var enViaje = Math.random() >= 0.5;
	res.send(enViaje);
});

app.listen(3000, function () {
  console.log('Bondimagic server listening on port 3000!');
});
