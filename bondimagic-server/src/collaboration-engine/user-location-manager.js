const UserLocation = require('./user-location');
const BusRouteService = require('./../buses/bus-route-service');

class UserLocationManager {
    constructor() {
        this.userLocations = new Map();
        this.busRouteService = new BusRouteService();
    }

    process(user, location, busRouteId) {
        let userLocation = this.userLocations.get(user);
        if (userLocation) {
            this._updateUserLocation(userLocation, location, busRouteId);
        } else {
            console.log("Agrego nuevo UserLocation para ", user);
            this.userLocations.set(user, new UserLocation(user, busRouteId, location));
        }
    }

    _updateUserLocation(userLocation, newLocation, busRouteId) {
        userLocation.update(newLocation, this._locationWithinBusRoute(newLocation, busRouteId));
    }

    _locationWithinBusRoute(location, busRouteId) {
        let busRoute = this.busRouteService.getRoute(busRouteId);
        return busRoute.contains(location);
    }

    getUserLocations() {
        let result = [];
        this.userLocations.forEach((userLocation, userId, map) => {
            if (userLocation.inRoute) {
                result.push(userLocation);
            }
        });
        return result;
    }
}

module.exports = UserLocationManager;