var request = require('request');

request('http://localhost:3000/ramales', function (error, response, body) {
	if (error) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code
	} else {
	  console.log('Los ramales que hay en la db de bondimagic son: \n', body);
	}
});
