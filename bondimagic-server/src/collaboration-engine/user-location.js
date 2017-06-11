class UserLocation {

    constructor(userId, busRouteId) {
        this.userId = userId;
        this.busRouteId = busRouteId;
        this.currentLocation;
        this.previousLocation;
        this.travelledDistance;
        this.lastRequestTimestamp;
    }

}

module.exports = UserLocation;