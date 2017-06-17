const RouteSegment = require('./../buses/route-segment');
const BusRoute = require('./../buses/bus-route');

class UserLocationManager {

    constructor () {
        this.userLocations;
    }

    process(user, location, busRouteId) {

    }

    locationWithinBusRoute(location, busRouteId) {
        //desde paseo colon y eeuu hasta paseo colon y alsina
        let polygon = [
            {latitude:-34.6183359, longitude:-58.3687782},
            {latitude:-34.6183006, longitude:-58.3693522},
            {latitude:-34.6100032, longitude:-58.369414},
            {latitude:-34.6100087, longitude:-58.3695783}
        ];
        let segment = new RouteSegment(polygon);
        let busRoute = new BusRoute();
        busRoute.addSegment(segment);

        return busRoute.contains(location);
    }
}

module.exports = UserLocationManager;