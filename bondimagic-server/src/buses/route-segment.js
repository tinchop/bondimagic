var geolib = require('geolib');

class RouteSegment {
    // recibe locations
    constructor(polygon) {
        this.polygon = polygon;
    }

    contains(location) {
        return geolib.isPointInside(location, this.polygon);
    }
}

module.exports = RouteSegment;