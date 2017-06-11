const expect = require('chai').expect;
const service = require('../bondi-magic-service');

function moveUser() {
    console.log("user1 moviendose...");
}

describe('Detect bus location', function () {
    it('should detect a bus and return the location', function () {
        setInterval(moveUser, 100);
    });

});
