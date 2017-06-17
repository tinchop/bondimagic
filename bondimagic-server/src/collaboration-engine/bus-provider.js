class BusProvider {

    constructor() {
        this.buses = [];
    }

    getBuses(busRouteId, location) {
        //TODO: devolver el filtrado. No todos.
        return this.buses;
    }

    addBus(bus) {
        this.buses.push(bus);
    }

    setBuses(buses) {
        this.buses = buses;
    }

    updateBus(busRouteId) {
        
        var newLocation = 0; //TODO: Falta tener la ubicacion nueva
        var index = this.buses.indexOf(busRouteId);
        if (index > -1) {
            let busToUpdate = this.buses[index];
            busToUpdate.location = newLocation;
        }
    }

    removeBus(busRouteId) {
        var index = this.buses.indexOf(busRouteId);
        if (index > -1) {
            this.buses.splice(index, 1);
        }
    }
}

module.exports = BusProvider;