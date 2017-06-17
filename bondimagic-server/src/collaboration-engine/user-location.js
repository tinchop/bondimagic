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
        this.lastRequestTimestamp = new Date();
        this.inRoute = inRoute;
        if (this.inRoute) {
            this.travelledDistance += this._calculateDistance(this.previousLocation, newLocation);
        } else {
            this.travelledDistance = 0;
        }
        console.log(this.userId, ":", "ramal=", this.busRouteId, "dist recorrida=", this.travelledDistance, "en ruta =", (this.inRoute ? "Sí" : "No"));
    }

    _calculateDistance(prevLocation, newLocation) {
        return geolib.getDistance(prevLocation, newLocation);
    }

}

module.exports = UserLocation;