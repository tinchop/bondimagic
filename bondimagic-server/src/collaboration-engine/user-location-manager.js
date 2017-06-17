const RouteSegment = require('./../buses/route-segment');
const BusRoute = require('./../buses/bus-route');
const UserLocation = require('./user-location');

class UserLocationManager {
    constructor() {
        this.userLocations = new Map();
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
        //desde paseo colon y eeuu hasta paseo colon y alsina
        let polygon = [
            //Av Santa Fe y Cerrito -34.595459, -58.382723
            { latitude: -34.595459, longitude: -58.382723 },
            //Av Santa Fe y Carlos Pellegrini -34.595351, -58.381499
            { latitude: -34.595351, longitude: -58.381499 },
            //Av San Juan y Bernardo de Irigoyen -34.622109, -58.379993
            { latitude: -34.622109, longitude: -58.379993 },
            //Av San Juan y Lima -34.622157, -58.381454
            { latitude: -34.622157, longitude: -58.381454 }
        ];
        let segment = new RouteSegment(polygon);
        let busRoute = new BusRoute();
        busRoute.addSegment(segment);

        return busRoute.contains(location);
    }
}

module.exports = UserLocationManager;