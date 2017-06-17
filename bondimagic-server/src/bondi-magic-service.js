class BondiMagicService {
    constructor(userLocationManager, busProvider) {
        this.userLocationManager = userLocationManager;
        this.busProvider = busProvider;
    }
    
    getNearbyBuses(user, location, busRouteId) {
        //TODO
        return this.busProvider.getBuses(busRouteId, location);
    }
}

module.exports = BondiMagicService;