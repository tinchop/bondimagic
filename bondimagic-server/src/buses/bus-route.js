class BusRoute {
    constructor() {
        this.segments = [];
    }

    addSegment(segment) {
        // TODO: checkear que no sea un segmento repetido.
        this.segments.push(segment);
    }

    contains(location) {
        return this.segments.some((segment) => segment.contains(location));
    }
}

module.exports = BusRoute;
