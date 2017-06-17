var geolib = require('geolib');

class UserLocation {
    constructor(userId, busRouteId, currentLocation) {
        this.userId = userId;
        this.busRouteId = busRouteId;
        this.currentLocation = currentLocation;
        this.previousLocation;
        this.travelledDistance = 0;
        this.lastRequestTimestamp;
    }

    update(newLocation) {
        this.previousLocation = this.currentLocation;
        this.currentLocation = newLocation;
        this.travelledDistance += this._calculateDistante(this.previousLocation, newLocation); 
    }

    _calculateDistante(prevLocation, newLocation) {
        return geolib.getDistance(prevLocation, newLocation);
    }
}

module.exports = UserLocation;