const expect = require('chai').expect;
const RouteSegment = require('./route-segment');

describe('RouteSegment', function () {
    describe('#contains()', function () {
        it('should return true when segment contains the location', function () {

            let polygon = [
                {latitude: -34.6091424, longitude:-58.3919628},
                {latitude:-34.6091634, longitude:-58.3921174},
                {latitude:-34.609356, longitude:-58.3948649},
                {latitude:-34.6093952, longitude:-58.3948622}
            ];
            let segment = new RouteSegment(polygon);
            
            let userLocation = {latitude: -34.609266, longitude: -58.3933941};
            expect(segment.contains(userLocation)).to.equal(true);
        });

        it('should return false when segment does not contain the location', function () {

            let polygon = [
                {latitude: -34.6091424, longitude:-58.3919628},
                {latitude:-34.6091634, longitude:-58.3921174},
                {latitude:-34.609356, longitude:-58.3948649},
                {latitude:-34.6093952, longitude:-58.3948622}
            ];
            let segment = new RouteSegment(polygon);
            
            let userLocation = {latitude: -34.6092067, longitude: -58.3934014};
            expect(segment.contains(userLocation)).to.equal(false);
        });

    });
});