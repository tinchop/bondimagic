const RouteSegment = require('./../buses/route-segment');
const BusRoute = require('./../buses/bus-route');

class UserLocationManager {

    constructor () {
        this.userLocations;
    }

    process(user, location, busRouteId) {

    }

    locationWithinBusRoute(location, busRouteId) {
        //this is a mockup BusRoute, this should be retrieved from db in the future
        //in the meantime it could be moved to a preliminary mockup service
        let polygon = [
            {latitude:-34.6091424, longitude:-58.3919628},
            {latitude:-34.6091634, longitude:-58.3921174},
            {latitude:-34.609356, longitude:-58.3948649},
            {latitude:-34.6093952, longitude:-58.3948622}
        ];
        let segment = new RouteSegment(polygon);
        let busRoute = new BusRoute();
        busRoute.addSegment(segment);

        return busRoute.contains(location);
    }
}

module.exports = UserLocationManager;