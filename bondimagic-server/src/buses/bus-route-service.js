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

        this.routes.set(8, this._buildBusRoute8());
    }

    getRoute(busRouteId) {
        return this.routes.get(busRouteId);
    }

    _buildBusRoute8 () {
        // Desde Rivadavia y Cerrito, Hasta Rivadavia y Paraná
        let polygon1 = [
            { latitude: -34.60838053, longitude: -58.38200748 },
            { latitude: -34.60847104, longitude: -58.38200882 },
            { latitude: -34.60892139, longitude: -58.3875154 },
            { latitude: -34.60884412, longitude: -58.38754222 }
        ];
        // desde Rivadavia y Paraná, Hasta Rivadavia y av. Entre Rios
        let polygon2 = [
            { latitude: -34.60885737, longitude: -58.3876951 },
            { latitude: -34.60893463, longitude: -58.38766292 },
            { latitude: -34.60929889, longitude: -58.39188471 },
            { latitude: -34.60923707, longitude: -58.39189745 }
        ];
        // desde Rivadavia y av. Entre Rios, Hasta Rivadavia y Callao (pequeña curva)
        let polygon3 = [
            { latitude: -34.60927791, longitude: -58.39191791 },
            { latitude: -34.60928012, longitude: -58.3919521 },
            { latitude: -34.60914656, longitude: -58.39196686 },
            { latitude: -34.60914436, longitude: -58.39192864 }
        ];
        // desde Rivadavia y Callao, Hasta Rivadavia y av. Boedo
        let polygon4 = [
            { latitude: -34.60913553, longitude: -58.39199536 },
            { latitude: -34.60919403, longitude: -58.39198597 },
            { latitude: -34.61104285, longitude: -58.41840908 },
            { latitude: -34.61095897, longitude: -58.4184359 }
        ];

        let busRoute = new BusRoute();
        for (var polygon in [polygon1, polygon2, polygon3, polygon4]) {
            let segment = new RouteSegment(polygon);
            busRoute.addSegment(segment);
        }
        return busRoute;
    }

}

module.exports = BusRouteService;