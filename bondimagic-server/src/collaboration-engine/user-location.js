var geolib = require('geolib');

class UserLocation {
    constructor(userId, busRouteId, currentLocation) {
        this.userId = userId;
        this.busRouteId = busRouteId;
        this.currentLocation = currentLocation;
        this.previousLocation;
        this.travelledDistance = 0;
        this.lastRequestTimestamp;
        this.inRoute = false;
    }

    update(newLocation, inRoute) {
        this.previousLocation = this.currentLocation;
        this.currentLocation = newLocation;
        this.travelledDistance += this._calculateDistance(this.previousLocation, newLocation);
        this.lastRequestTimestamp = new Date();
        this.inRoute = inRoute;
        console.log(this.userId, ": distancia recorrida=", this.travelledDistance, " en ruta de ", this.busRouteId, ": ", (this.inRoute ? "Sí" : "No"));
    }

    _calculateDistance(prevLocation, newLocation) {
        return geolib.getDistance(prevLocation, newLocation);
    }

}

module.exports = UserLocation;