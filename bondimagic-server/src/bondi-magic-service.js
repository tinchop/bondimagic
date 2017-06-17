class BondiMagicService {
    constructor(userLocationManager, busProvider) {
        this.userLocationManager = userLocationManager;
        this.busProvider = busProvider;
    }
    
    getNearbyBuses(user, location, busRouteId) {
        this.userLocationManager.process(user, location, busRouteId);
        return this.busProvider.getBuses(busRouteId, location);
    }
}

module.exports = BondiMagicService;