const expect = require('chai').expect;
const RouteSegment = require('./route-segment');

describe('RouteSegment', function () {
    describe('#contains()', function () {
        it('should return true when segment contains the location', function () {
            let from = {lat: -1.25, long: 3.00};
            let to = {lat: 2.25, long: 3.00};
            let segment = new RouteSegment(from, to);
            let userLocation = {lat: 1.01, long: 3.00};
            expect(segment.contains(userLocation)).to.equal(true);
        });

        it('should return false when segment doesnt contains the location', function () {
            let from = {lat: -1.25, long: 3.00};
            let to = {lat: 2.25, long: 3.00};
            let segment = new RouteSegment(from, to);
            let userLocation = {lat: 1.01, long: 4.00};
            expect(segment.contains(userLocation)).to.equal(false);
        });
    });
});