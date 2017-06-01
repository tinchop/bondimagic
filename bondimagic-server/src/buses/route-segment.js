class RouteSegment {
    // recibe locations
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    contains(location) {
        let containsLat = (this.from.lat <= location.lat) && (location.lat <= this.to.lat);
        let containsLong = (this.from.long <= location.long) && (location.long <= this.to.long);
        return containsLat && containsLong;
    }
}

module.exports = RouteSegment;