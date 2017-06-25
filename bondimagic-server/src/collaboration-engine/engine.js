const UserLocationManager = require('./user-location-manager');
const BusProvider = require('./bus-provider');
const BusLocationDetector = require('./bus-location-detector');

let userLocationManager = new UserLocationManager();
let busProvider = new BusProvider();
let busLocationDetector = new BusLocationDetector();

/**ESTO ES EL ENGINE*/
const BUS_DETECTION_INTERVAL = 500;
let DETECT_BUSES_INTERVAL_ID;

function start() {
    console.log('Iniciando engine colaborativo.');
    function detectBuses() {
        userLocationManager.purgeUserLocations();
        let userLocations = userLocationManager.getUserLocations();
        let buses = busLocationDetector.detectLocations(userLocations);
        busProvider.setBuses(buses);
    }

    DETECT_BUSES_INTERVAL_ID = setInterval(detectBuses, BUS_DETECTION_INTERVAL);
}

exports.start = start;
exports.userLocationManager = userLocationManager;
exports.busProvider = busProvider;
/***/