const RouteSegment = require('./route-segment');
const BusRoute = require('./bus-route');

class BusRouteService {
    constructor() {
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

        this.routes = new Map();
        this.routes.set(59, busRoute);
    }

    getRoute(busRouteId) {
        return this.routes.get(busRouteId);
    }

}

module.exports = BusRouteService;