import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';

declare var google: any;
var markers = [];

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  private requestNearbyBusesIntervalId: number;
  private userLocation = {
    latitude: -34.6128962, 
    longitude: -58.3775573
  };
  private userMarker: any;


  constructor(public navCtrl: NavController, public geolocation: Geolocation, public http: Http) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }
Marker
  ionViewDidLeave() {
    console.log('Leaving map view. Stop requestNearbyBuses()');
    clearInterval(this.requestNearbyBusesIntervalId);
  }

  private showNearbyBuses() {
    console.log('showNearbyBuses()');
    this.requestNearbyBusesIntervalId = setInterval(this.requestNearbyBuses, 5000, this);
    // var myLatLng = {lat: -25.363, lng: 131.044};
    // this.addMarker({});
  }

  private showUserLocation() {
    console.log('showUserLocation()');
    this.userMarker = new google.maps.Marker({
      map: this.map,
      position: this.toLatLngFormat(this.userLocation),
      label: 'Usuario'
    });
  }

  private toLatLngFormat(location):any {
    return {
      "lat": location.latitude,
      "lng": location.longitude
    };
  }

  private requestNearbyBuses(instance) {
    console.log('requestNearbyBuses()');
    let requestBody = {
      user: 'Manolo',
      busRouteId: 59,
      location: instance.userLocation
    };
    instance.http.post('http://localhost:3000/nearbybuses', requestBody).subscribe(data => {
      instance.clearMarkers();
      let buses = JSON.parse(data._body);
      console.log('buses', buses);
      for (let bus of buses) {
        console.log('bus', bus);
        let busLocation = bus['location'];
        let busId = bus['busRouteId'];
        busLocation.lat = busLocation.latitude;
        busLocation.lng = busLocation.longitude;
        instance.addMarker(busLocation, busId);

      }
    }, error => {
      console.log("Oooops!");
    });
  }

  loadMap() {
    console.log('loadMap()');
    this.geolocation.getCurrentPosition().then((position) => {

      //no muestra donde está el usuario, muestra centrado en el obelisco que es donde pasan nuestras líneas
      let latLng = new google.maps.LatLng(-34.603518, -58.381622);

      let mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.showNearbyBuses();
      this.showUserLocation();

    }, (err) => {
      console.log(err);
    });
  }

  clearMarkers() {
    for (let marker of markers) {
      marker.setMap(null);
    }
  }

  addMarker(location, linea) {
    console.log('addMarker()');
    let marker = new google.maps.Marker({
      map: this.map,
      icon: '/assets/markers/' + linea + '.jpg',
      position: location
    });
    markers.push(marker);

    let content = "<h4>Linea: " + linea + "</h4>";

    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
