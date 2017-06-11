class BusesProvider {

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

module.exports = BusesProvider;