var colors = require('colors/safe');
const UserLocation = require('./user-location');
const BusRouteService = require('./../buses/bus-route-service');

const MIN_DISTANCE_THRESHOLD = 80;
const MAX_TIME_OFFLINE_THRESHOLD = 10000;

class UserLocationManager {
    constructor() {
        this.userLocations = new Map();
        this.busRouteService = new BusRouteService();
        this.minDistanceThreshold = MIN_DISTANCE_THRESHOLD;
        this.maxTimeOfflineThreshold = MAX_TIME_OFFLINE_THRESHOLD;
    }

    process(user, location, busRouteId) {
        let userLocation = this.userLocations.get(user);
        if (userLocation) {
            this._updateUserLocation(userLocation, location, busRouteId);
        } else {
            console.log(colors.blue.bold("Nuevo usuario compartiendo su ubicación:"), colors.magenta(user));
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
            if (userLocation.inRoute && userLocation.travelledDistance >= this.minDistanceThreshold) {
                result.push(userLocation);
            }
        });
        return result;
    }

    purgeUserLocations() {
        let toBePurged = [];
        this.userLocations.forEach((userLocation, userId, map) => {
            let now = new Date();
            let timeDifference = Math.abs(now.getTime() - userLocation.lastRequestTimestamp.getTime());
            if (timeDifference >= this.maxTimeOfflineThreshold) {
                toBePurged.push(userId);
            }
        });
        toBePurged.forEach((userId) => {
            this.userLocations.delete(userId);
            console.log(colors.yellow.bold("Usuario purgado!:"), colors.magenta(userId));
        });
    }
}

module.exports = UserLocationManager;