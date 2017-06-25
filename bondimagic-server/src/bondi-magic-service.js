class BondiMagicService {
    constructor(userLocationManager, busProvider) {
        this.userLocationManager = userLocationManager;
        this.busProvider = busProvider;
    }
    
    getNearbyBuses(user, location, busRouteId) {
        this.userLocationManager.process(user, location, busRouteId);
        return this.busProvider.getBuses(busRouteId, location);
    }

    getRutes() {
        return [
            {"routeId": 59, "description": "Linea 59. Ramal Z"},
            {"routeId": 8, "description": "Linea 8. Ramal X"}
        ];
    }
}

module.exports = BondiMagicService;