const DEFAULT_UMBRAL = 2;


class BusLocationDetector {
    constructor() {
        this.umbral = DEFAULT_UMBRAL;
    }

    detectLocations(userLocations) {
        let groupByBusRoute = this._groupByBusRoute(userLocations);
        let detectedBus = [];
        return detectedBus;
    }

    _groupByBusRoute(userLocations) {
        let result = new Map();
        userLocations.forEach((userLocation) => {
            let busRouteId = userLocation.busRouteId;
            let users = result.get(userLocation.busRouteId);
            if (users) {
                users.push(userLocation);
                result.set(busRouteId, users);
            } else {
                result.set(busRouteId, []);
            }
        });

        return result;
    }
}

module.exports = BusLocationDetector;