var geocluster = require("geocluster");
const Bus = require('./../buses/bus');
const Location = require('./location');
const MIN_USERS_THRESHOLD = 3;


class BusLocationDetector {
    constructor() {
        this.minUsersThreshold = MIN_USERS_THRESHOLD;
    }

    detectLocations(userLocations) {
        let buses = [];
        let usersByBusRoute = this._groupByBusRoute(userLocations);
        usersByBusRoute.forEach((userLocations, busRouteId, map) => {
            let locations = [];
            userLocations.forEach((userLocation) => {
                locations.push([userLocation.currentLocation.latitude, userLocation.currentLocation.longitude]);
            });
            let clusteredLocations = geocluster(locations);
            clusteredLocations.forEach((cluster) => {
                if (cluster.elements.length >= this.minUsersThreshold) {
                    buses.push(new Bus(busRouteId, new Location(cluster.centroid[0], cluster.centroid[1])));
                }
            });

        });
        return buses;
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
                result.set(busRouteId, [userLocation]);
            }
        });

        return result;
    }
}

module.exports = BusLocationDetector;