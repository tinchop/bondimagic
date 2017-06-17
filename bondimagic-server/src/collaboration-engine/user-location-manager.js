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
            this._updateUserLocation(userLocation, location);
        } else {
            console.log("agrego nuevo user location.");
            this.userLocations.set(user, new UserLocation(user, busRouteId, location));
        }
    }

    _updateUserLocation(userLocation, newLocation) {
        console.log("ahora tengo que hacer update de user location");
        userLocation.update(newLocation);
    }

}

module.exports = UserLocationManager;