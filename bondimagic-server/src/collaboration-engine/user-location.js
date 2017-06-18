var geolib = require('geolib');
var colors = require('colors/safe');

class UserLocation {
    constructor(userId, busRouteId, currentLocation) {
        this.userId = userId;
        this.busRouteId = busRouteId;
        this.currentLocation = currentLocation;
        this.previousLocation;
        this.travelledDistance = 0;
        this.lastRequestTimestamp = new Date();
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

        console.log(colors.magenta.bold(this.userId + ":"), colors.blue("Ramal=") + this.busRouteId, colors.blue("Distancia recorrida dentro de ruta (en metros)=") + this.travelledDistance, colors.blue("En ruta=") + (this.inRoute ? "Sí" : "No"));
    }

    _calculateDistance(prevLocation, newLocation) {
        return geolib.getDistance(prevLocation, newLocation);
    }

}

module.exports = UserLocation;